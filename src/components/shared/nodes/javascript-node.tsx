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
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';

interface JavascriptNodeProps {
  id: string;
  [key: string]: any;
}

const createWorker = createWorkerFactory(() => import('../../../lib/worker'));


const JavascriptNode = ({ id,data, ...props }: JavascriptNodeProps) => {
  const fixedCodeTop = 'async function(dataset) {\n';
  const fixedCodeBottom = '\n}';
  const [editableCode, setEditableCode] = useState<string>('  // Your JavaScript code here \nreturn null;');
  const fullCode = `${fixedCodeTop}${editableCode}${fixedCodeBottom}`;
  const worker = useWorker(createWorker);

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
  }, [nodeData]);


  const handleRunButton = useCallback(async () => {
    (async ()=>{
      const filteredData = await worker.handleExecute(nodeData?.data?.dataset, fullCode);
      console.log(filteredData)
      updateNodeData(id, { dataset: filteredData });
    })()
  },[]);

  return (
    <CustomNode title="Javascript" id={id} input={`IN : ${nodeData?.data?.dataset?.length || 0}`} output={`OP : ${data?.dataset?.length || 0}`} {...props}>
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