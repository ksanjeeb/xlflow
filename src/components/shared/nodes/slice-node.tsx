/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import CustomNode from "../custom-node";
import { memo, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

const createWorker = createWorkerFactory(() => import('../../../lib/worker'));


function SliceNode({ id, data, ...props }: any) {
    const [sliceIndex, setSliceIndex] = useState({ from: "", to: "" });
    const { updateNodeData } = useReactFlow();
    const worker = useWorker(createWorker);

    const connectionsTarget = useHandleConnections({
        type: "target",
        id: `target_${id}`,
    });
    const nodeData: any = useNodesData(connectionsTarget?.[0]?.source);


    useEffect(() => {
        (async ()=>{
            const data: any = nodeData?.data?.dataset || [];
            const modifiedData = await worker.handleSlice(data, sliceIndex)
            updateNodeData(id, { dataset: modifiedData });
        })()

    }, [sliceIndex, nodeData]);


    return (
        <CustomNode title="Slice" input={`IN : ${nodeData?.data?.dataset?.length || 0}`} output={`OP : ${data?.dataset?.length || 0}`} id={id} {...props}>
            {nodeData?.data?.dataset?.length > 0 ? <>
                <div className='mt-1 no-drag'>
                    <Label>From index:</Label>
                    <Input
                        type='text'
                        value={sliceIndex.from}
                        onChange={e => { setSliceIndex({ ...sliceIndex, from: e.target.value }) }}
                        className='my-2 min-w-64 border-2 border-primary'
                    />
                </div>

                <div className='mt-1'>
                    <Label>To index:</Label>
                    <Input
                        type='text'
                        value={sliceIndex.to}
                        onChange={e => { setSliceIndex({ ...sliceIndex, to: e.target.value }) }}
                        className='my-2 min-w-64 border-2 border-primary'
                    />
                </div>
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}
        </CustomNode >
    );
}

export default memo(SliceNode);