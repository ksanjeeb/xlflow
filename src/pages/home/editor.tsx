/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomTable from "@/components/shared/custom-table";
import barChart from "@/components/shared/nodes/bar-chart";
import exampleData from "@/components/shared/nodes/example-data";
import exportNode from "@/components/shared/nodes/export-node";
import fileUpload from "@/components/shared/nodes/file-upload";
import filterNode from "@/components/shared/nodes/filter-node";
import googleSheet from "@/components/shared/nodes/google-sheet";
import groupNode from "@/components/shared/nodes/group-node";
import javascriptNode from "@/components/shared/nodes/javascript-node";
import mergeNode from "@/components/shared/nodes/merge-node";
import sliceNode from "@/components/shared/nodes/slice-node";
import sortNode from "@/components/shared/nodes/sort-node";
import statsNode from "@/components/shared/nodes/stats-node";
import textareaNode from "@/components/shared/nodes/textarea-node";
import BlocksList from "@/components/ui/blocks-list";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { addEdge, Background, Controls, MiniMap, Position, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { ChevronLeft } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const nodeBoth = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
};

const nodeTypes = {
    fileUpload,
    googleSheet,
    exampleData,
    filterNode,
    mergeNode,
    groupNode,
    sliceNode,
    sortNode,
    javascriptNode,
    barChart,
    statsNode,
    textareaNode,
    exportNode
};





function Editor() {
    const { workflowID } = useParams();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const showBack = searchParams.get('back');

    const [tableData, setTableData] = useState([]);

    const availableNodes = [
        {
            id: 'example_data',
            position: { x: 50, y: 100 },
            data: { dataset: [] },
            type: "exampleData",
            ...nodeBoth,
        },
        {
            id: 'file_upload',
            position: { x: 50, y: 250 },
            type: "fileUpload",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'google_sheet',
            position: { x: 50, y: 400 },
            type: "googleSheet",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'filter_node',
            position: { x: 500, y: 80 },
            type: "filterNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'merge_by_key_node',
            position: { x: 500, y: 240 },
            type: "mergeNode",
            data: { dataset1: [], dataset2: [] },
            ...nodeBoth,
        },
        {
            id: 'group_node',
            position: { x: 500, y: 400 },
            type: "groupNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'slice_node',
            position: { x: 500, y: 560 },
            type: "sliceNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'sort_node',
            position: { x: 1000, y: 80 },
            type: "sortNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'js_node',
            position: { x: 1000, y: 340 },
            type: "javascriptNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'bar_chart_node',
            position: { x: 1000, y: 580 },
            type: "barChart",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'stats_node',
            position: { x: 1400, y: 80 },
            type: "statsNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'textarea_node',
            position: { x: 1800, y: 280 },
            type: "textareaNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'export_node',
            position: { x: 1800, y: 80 },
            type: "exportNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
    ];


    const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    const onConnect = useCallback(
        (params: any) => {
            setEdges((prevEdges) => {
                const filteredEdges = prevEdges.filter(
                    (edge: any) =>
                        !(edge.target === params.target && edge.targetHandle === params.targetHandle)
                );
                const newEdges = addEdge(params, filteredEdges);

                return newEdges as never[];
            });
        },
        [],
    );

    const handleCardClick = (value: any) => {
        try {
            const filterNode: any = availableNodes.find((each: any) => each.id === value.key)
            if (filterNode.id) {
                const nodeToAdd = { ...filterNode, id: uuidv4() };
                setNodes([...nodes, nodeToAdd]);
            }
        } catch (err) {
            console.error(err)
        }
    }


    const onNodeClick = (event: any, node: any) => {
        const table: any = node?.data?.dataset;
        setTableData(table)
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
                        // fitView
                        nodeTypes={nodeTypes}
                        connectionLineStyle={{ strokeWidth: 3 }}
                        onNodeClick={onNodeClick}
                        onPaneClick={()=> setTableData([])}
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
                                <CustomTable data={tableData} />
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