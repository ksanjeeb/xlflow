import { Button } from "@/components/ui/button";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { ChevronLeft } from "lucide-react";
import { useParams } from "react-router-dom";

function Editor() {
    const { workflowID } = useParams();
    console.log(workflowID)


    return (
        <div className="h-screen w-full bg-muted/40">
            <div className="absolute p-6 flex flex-row justify-between w-full z-10">
                <div className="flex flex-row gap-2">
                    <Button variant={"outline"} size={"icon"}><ChevronLeft /></Button>
                    <Button variant={"outline"} >{workflowID}</Button>
                </div>
                <div className="flex flex-row gap-2">
                    {workflowID === "new" ? <Button variant={"default"} >Save</Button> : <Button variant={"outline"} >Update</Button>}
                </div>
            </div>
            <div className="h-[600px] w-full">
                <ReactFlow colorMode='dark'>
                    <Background />
                    <Controls />
                </ReactFlow>

            </div>
            <div className="flex flex-row">
                <div>
                    Logs

                </div>
                <div>
                    Output

                </div>

            </div>
        </div>
    );
}

export default Editor;