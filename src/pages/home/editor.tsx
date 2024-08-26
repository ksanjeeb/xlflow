/* eslint-disable @typescript-eslint/no-explicit-any */
import flowService from "@/appwrite/db";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useLogsStore } from "@/lib/store";
import { addEdge, Background, Controls, MiniMap, Position, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
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
    const [openDialog, setOpenDialog] = useState({type:"save", value:false})

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
            position: { x: 100, y: 150 },
            type: "fileUpload",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'google_sheet',
            position: { x: 150, y: 200 },
            type: "googleSheet",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'filter_node',
            position: { x: 200, y: 250 },
            type: "filterNode",
            data: { dataset: [], filter: [] },
            ...nodeBoth,
        },
        {
            id: 'merge_by_key_node',
            position: { x: 250, y: 300 },
            type: "mergeNode",
            data: { dataset1: [], dataset2: [] },
            ...nodeBoth,
        },
        {
            id: 'group_node',
            position: { x: 300, y: 350 },
            type: "groupNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'slice_node',
            position: { x: 350, y: 400 },
            type: "sliceNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'sort_node',
            position: { x: 400, y: 450 },
            type: "sortNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'js_node',
            position: { x: 450, y: 500 },
            type: "javascriptNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'bar_chart_node',
            position: { x: 500, y: 550 },
            type: "barChart",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'stats_node',
            position: { x: 550, y: 600 },
            type: "statsNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'textarea_node',
            position: { x: 600, y: 650 },
            type: "textareaNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
        {
            id: 'export_node',
            position: { x: 650, y: 700 },
            type: "exportNode",
            data: { dataset: [] },
            ...nodeBoth,
        },
    ];



    const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [meta, setMeta] = useState({ name: "", description: "" })
    const { logs, update, reset } = useLogsStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);


    const fetchFlow = async (_id: string) => {
        setLoading(true);
        try {
            const res = await flowService.getFlow(_id);
            setNodes(JSON.parse(res?.nodes || '[]'));
            setMeta({ name: res?.name || '', description: res?.description || '' });
            setEdges(JSON.parse(res?.edges || '[]'));
        } catch (err) {
            console.error(err);
            toast.error("Error: " + (err instanceof Error ? err.message : 'An unknown error occurred'));
            update(err);
        } finally {
            setLoading(false);
        }
    };


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
            update(err)
            console.error(err)
        }
    }


    const onNodeClick = (_event: any, node: any) => {
        const table: any = node?.data?.dataset;
        setTableData(table)
    }


    useEffect(() => {
        if (workflowID && workflowID !== "new") fetchFlow(workflowID);
        else setMeta({ name: "New Workflow", description: "" })
    }, []);

    const payloadParsing = () => {
        return {
            ...meta,
            nodes: JSON.stringify(nodes.map(node => {
                const { type } = node;
                if (type !== 'exampleData' && type !== 'googleSheet' && type !== 'fileUpload') {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            dataset: []
                        }
                    };
                }
                return node;
            })),
            edges: JSON.stringify(edges)
        };
    }

    const handleSaveWorkflow = async () => {
        try {
            setSaving(true);
            const flowData = payloadParsing();
            await toast.promise(flowService.createFlow(flowData),
                {
                    loading: 'Saving...',
                    success: () => `Successfully saved.🔥`,
                    error: (err) => `This just happened: ${err.toString()}`,
                },
            )
            setOpenDialog({...openDialog, value:false})
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateWorkflow = async () => {
        try {
            setSaving(true)
            if (!workflowID || workflowID === "new") return;
            const flowData = payloadParsing();
            await toast.promise(flowService.updateFlow(workflowID as string, flowData),
                {
                    loading: 'Updating...',
                    success: () => `Successfully updated.🔥`,
                    error: (err) => `This just happened: ${err.toString()}`,
                },
            )
            setOpenDialog({...openDialog, value:false})
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            {loading && <Loader gradient={true} />}
            <div className="h-screen w-full bg-muted/40">
                <ResizablePanelGroup direction="vertical">
                    <div className="absolute p-6 flex flex-row justify-between w-full z-10">
                        <div className="flex flex-row gap-2">
                            {showBack && <Button variant={"secondary"} size={"icon"} onClick={() => navigate("/dashboard")}><ChevronLeft /></Button>}
                            <Label className="hidden md:block self-center mx-2">
                                {meta?.name}
                            </Label>
                            <BlocksList onAction={handleCardClick} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            {workflowID === "new" && <Button variant={"secondary"} onClick={()=>setOpenDialog({type:"save", value:true})} disabled={saving}>
                                {saving ? "Saving..." : "Save"}{saving && <Loader2 className="animate-spin ml-2" size={16} />}
                            </Button>}
                            {workflowID !== "new" && workflowID !== "demo" && nodes?.length > 0 && edges.length > 0 && <Button variant={"outline"} onClick={()=>setOpenDialog({type:"update", value:true})} disabled={saving}>
                                {saving ? "Updating..." : "Update"} {saving && <Loader2 className="animate-spin ml-2" size={16} />}
                            </Button>}
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
                            onPaneClick={() => setTableData([])}
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
                                <div className="text-xs font-medium px-2 py-1 text-muted-foreground flex flex-row">OUTPUT <span onClick={() => setTableData([])} className="self-center cursor-pointer hover:text-red-500"><RotateCcw size={12} className="ml-2" /></span></div>
                                <Separator />
                                <div className="h-full bg-card">
                                    <CustomTable data={tableData} />
                                </div>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel>
                                <p className="text-xs font-medium px-2 py-1 text-muted-foreground flex flex-row">LOGS<span onClick={() => reset()} className="self-center cursor-pointer hover:text-red-500"><RotateCcw size={12} className="ml-2" /></span></p>
                                <Separator />
                                <div className="h-full bg-card  flex flex-row gap-2 overflow-auto">
                                    {
                                        logs && logs?.map((el: any, index: number) => (<div className="w-full" key={index}><p key={index} className={`text-muted-foreground p-2 text-xs w-full`}>{el}</p><Separator /></div>))
                                    }
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

            <Dialog onOpenChange={(e)=> setOpenDialog({...openDialog, value:e})} open={openDialog.value}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{openDialog?.type === "save"? "Save ":"Update "}Workflow</DialogTitle>
                        <DialogDescription>
                            Make changes to your workflow details here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value={meta?.name} className="col-span-3" onChange={(e:any)=> setMeta({...meta, name:e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Textarea id="description" value={meta?.description} className="col-span-3" onChange={(e:any)=> setMeta({...meta, description:e.target.value})}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={()=> openDialog?.type === "save"? handleSaveWorkflow():handleUpdateWorkflow()}>{saving ? "Saving..." : "Save changes"} {saving && <Loader2 className="animate-spin ml-2" size={16} />}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Editor;