/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea } from "@/components/ui/textarea";
import { useReactFlow } from "@xyflow/react";
import { memo,  useRef, useEffect, useCallback } from "react";

function TextAreaNode({id,data,...props}:any) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { updateNodeData } = useReactFlow();

  const handleChange=useCallback((value:string)=>{
    updateNodeData(id, { text: value });
  },[])

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [data?.text]);



  return (
    <div {...props}>
      <Textarea
        value={data?.text}
        rows={1}
        ref={textAreaRef}
        onChange={(e: any) => handleChange(e.target.value)}
        placeholder="Type your content here."
        className="border-transparent min-w-64 resize-none overflow-hidden"
      />
    </div>
  );
}

export default memo(TextAreaNode);
