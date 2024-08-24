/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useEffect, useState } from 'react';
import CustomNode from '../custom-node';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { Button } from '@/components/ui/button';
import { useHandleConnections, useNodesData, useReactFlow } from '@xyflow/react';
import toast from 'react-hot-toast';

interface JavascriptNodeProps {
  id: string;
  [key: string]: any;
}

const handleExecute = async (dataset: any, fullCode: any) => {
  try {
    const dynamicFunction = new Function('return ' + fullCode)();
    return await dynamicFunction(dataset);
  } catch (error) {
    toast.error('Function execution error:' + error)
    console.error('Function creation error:', error);
  }
};

const JavascriptNode = ({ id, ...props }: JavascriptNodeProps) => {
  const fixedCodeTop = 'async function(dataset) {\n';
  const fixedCodeBottom = '\n}';
  const [editableCode, setEditableCode] = useState<string>('  // Your JavaScript code here \nreturn null;');
  const fullCode = `${fixedCodeTop}${editableCode}${fixedCodeBottom}`;

  const { updateNodeData } = useReactFlow();

  const connectionsTarget = useHandleConnections({
    type: 'target',
    id: `target_${id}`,
  });
  const nodeData: any = useNodesData(connectionsTarget?.[0]?.source);

  useEffect(() => {
    if (nodeData?.data?.dataset) {
      updateNodeData(id, { dataset: nodeData.data.dataset });
    }
  }, [nodeData?.data.dataset]);


  const handleRunButton = useCallback(async () => {
    const filteredData = await handleExecute(nodeData.data.dataset, fullCode);
    console.log(filteredData)
    updateNodeData(id, { dataset: filteredData });
  },[]);

  return (
    <CustomNode title="Javascript" id={id} {...props}>
      {nodeData?.data?.dataset?.length > 0 ? (
        <>
          <Editor
            value={fullCode}
            onValueChange={(code) => {
              const editablePart = code.substring(fixedCodeTop.length, code.length - fixedCodeBottom.length);
              setEditableCode(editablePart);
            }}
            highlight={(code) => highlight(code, languages.js, 'javascript')}
            padding={10}
            className="min-w-64 border-transparent"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
          <Button className="w-full h-fit mt-4 px-[5px] py-[4px]" onClick={() => handleRunButton()}>
             Run
          </Button>
        </>
      ) : (
        <p className="my-2 min-w-64 text-muted-foreground">Please attach valid dataset</p>
      )}
    </CustomNode>
  );
};

export default memo(JavascriptNode);