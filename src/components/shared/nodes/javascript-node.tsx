/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from 'react';
import CustomNode from '../custom-node';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { Button } from '@/components/ui/button';


function JavascriptNode({ ...props }: any) {
  const [dataset] = useState([{
    "country": "Afghanistan",
    "population": "Many",
    "life expectancy": 58.7,
    "income": 1870
  },
  {
    "country": "Albania",
    "population": 2930000,
    "life expectancy": 78,
    "income": 12400
  },]);


  const fixedCodeTop = "async function(dataset) {\n";
  const fixedCodeBottom = "\n}";
  const [editableCode, setEditableCode] = useState<string>("  // Your JavaScript code here \nreturn null;");

  const fullCode = `${fixedCodeTop}${editableCode}${fixedCodeBottom}`;
  return (
    <CustomNode title="Javascript" {...props}>
      {dataset.length > 0 ? <>
        <Editor
          value={fullCode}
          onValueChange={(code) => {
            const editablePart = code.substring(fixedCodeTop.length, code.length - fixedCodeBottom.length);
            setEditableCode(editablePart);
          }}
          highlight={(code) => highlight(code, languages.js, "javascript")}
          padding={10}
          className='min-w-64 border-transparent'
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        <Button className='w-full h-fit mt-4 px-[5px] py-[4px]'>Run</Button>
      </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}

    </CustomNode>
  );
}

export default memo(JavascriptNode);