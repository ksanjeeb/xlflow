import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { ChevronLeft, Plus } from "lucide-react";
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
                        <Label className="hidden md:block self-center mx-2">
                            {workflowID === "new" ? "Workflow" : workflowID}
                        </Label>                        
                        <Button variant={"default"} className="md:ml-4"> <Plus size={16} className="mr-2" /> Block</Button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        {workflowID === "new" && <Button variant={"secondary"} >Save</Button>}
                        {workflowID !== "new" && <Button variant={"outline"} >Update</Button>}
                        {/* {workflowID !== "new" && <Button variant={"destructive"} >Delete</Button>} */}
                    </div>
                </div>
                <ResizablePanel className="w-full" defaultSize={70}>
                    <ReactFlow colorMode='dark'>
                        <Background />
                        <Controls />
                    </ReactFlow>
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel>
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={75} >
                            <p className="text-xs font-medium px-2 py-1 text-muted-foreground">OUTPUT</p>
                            <Separator />
                            <div className="h-full bg-muted/10">

                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel>
                            <p className="text-xs font-medium px-2 py-1 text-muted-foreground">LOGS</p>
                            <Separator />
                            <div className="h-full bg-muted/10">

                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>

        </div>
    );
}

export default Editor;