/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea } from "@/components/ui/textarea";
import { memo, useState, useRef, useEffect } from "react";

function TextAreaNode() {
  const [inputData, setInputData] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputData]);

  return (
    <div>
      <Textarea
        value={inputData}
        rows={1}
        ref={textAreaRef}
        onChange={(e: any) => setInputData(e.target.value)}
        placeholder="Type your content here."
        className="border-transparent min-w-64 resize-none overflow-hidden"
      />
    </div>
  );
}

export default memo(TextAreaNode);
