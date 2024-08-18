/* eslint-disable @typescript-eslint/no-explicit-any */
import BlocksList from "@/components/ui/blocks-list";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { addEdge, Background, Controls, MiniMap, Position, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { ChevronLeft } from "lucide-react";
import { useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
};

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 150 },
        data: { label: 'default style 1' },
        ...nodeDefaults,
    },
    {
        id: '2',
        position: { x: 250, y: 0 },
        data: { label: 'default style 2' },
        ...nodeDefaults,
    },
    {
        id: '3',
        position: { x: 250, y: 150 },
        data: { label: 'default style 3' },
        ...nodeDefaults,
    },
    {
        id: '4',
        position: { x: 250, y: 300 },
        data: { label: 'default style 4' },
        ...nodeDefaults,
    },
];

const initialEdges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
    },
  ];

function Editor() {
    const { workflowID } = useParams();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const showBack = searchParams.get('back');

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((els) => addEdge(params, els)),
        [],
    );

    const handleCardClick = (value: any) => {
        console.log(value)
    }


    return (
        <div className="h-screen w-full bg-muted/40">
            <ResizablePanelGroup direction="vertical">
                <div className="absolute p-6 flex flex-row justify-between w-full z-10">
                    <div className="flex flex-row gap-2">
                        {showBack && <Button variant={"secondary"} size={"icon"} onClick={() => navigate("/dashboard")}><ChevronLeft /></Button>}
                        <Label className="hidden md:block self-center mx-2">
                            {workflowID === "new" ? "Workflow" : workflowID}
                        </Label>
                        <BlocksList onAction={handleCardClick} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        {workflowID === "new" && <Button variant={"secondary"} >Save</Button>}
                        {workflowID !== "new" && <Button variant={"outline"} >Update</Button>}
                        {/* {workflowID !== "new" && <Button variant={"destructive"} >Delete</Button>} */}
                    </div>
                </div>
                <ResizablePanel className="w-full" defaultSize={70}>
                    <ReactFlow
                        colorMode='dark'
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                    >
                        <Background />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel>
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={75} >
                            <p className="text-xs font-medium px-2 py-1 text-muted-foreground">OUTPUT</p>
                            <Separator />
                            <div className="h-full bg-card">

                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel>
                            <p className="text-xs font-medium px-2 py-1 text-muted-foreground">LOGS</p>
                            <Separator />
                            <div className="h-full bg-card">

                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default Editor;