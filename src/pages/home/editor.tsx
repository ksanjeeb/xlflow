import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function Editor() {
    const { workflowID } = useParams();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const showBack = searchParams.get('back');


    return (
        <div className="h-screen w-full bg-muted/40">
            <ResizablePanelGroup direction="vertical">
                <div className="absolute p-6 flex flex-row justify-between w-full z-10">
                    <div className="flex flex-row gap-2">
                        {showBack && <Button variant={"secondary"} size={"icon"} onClick={() => navigate("/dashboard")}><ChevronLeft /></Button>}
                        <Button variant={"secondary"} className="cursor-default">{workflowID}</Button>
                    </div>
                    <div className="flex flex-row gap-2">
                        {workflowID === "new" && <Button variant={"secondary"} >Save</Button>}
                        {workflowID !== "new" && <Button variant={"outline"} >Update</Button>}
                        {workflowID !== "new" && <Button variant={"destructive"} >Delete</Button>}
                    </div>
                </div>
                <ResizablePanel className="h-[800px] w-full">
                    <ReactFlow colorMode='dark'>
                        <Background />
                        <Controls />
                    </ReactFlow>

                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel className="flex flex-row w-full">
                    <div>
                        Output

                    </div>
                    <div>
                        Logs

                    </div>


                </ResizablePanel>
            </ResizablePanelGroup>

        </div>
    );
}

export default Editor;