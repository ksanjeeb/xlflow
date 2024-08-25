/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from 'react';
import CustomNode from '../custom-node';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHandleConnections, useNodesData, useReactFlow } from '@xyflow/react';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';

const createWorker = createWorkerFactory(() => import('../../../lib/worker'));


function SortNode({ id,data, ...props }: any) {
    const [sort, setSort] = useState({ column_name: "", order: "" })
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
            const modifiedData = await worker.handleSort(data, sort);
            updateNodeData(id, { dataset: modifiedData });
        })()
    }, [sort, nodeData]);


    return (
        <CustomNode id={id} title="Sort" input={`IN : ${nodeData?.data?.dataset?.length || 0}`} output={`OP : ${data?.dataset?.length || 0}`} {...props}>
            {nodeData?.data?.dataset?.length > 0 ? <>
                <div className='mt-2'>
                    <Label>Column name:</Label>
                    <Select onValueChange={(e) => setSort({ ...sort, column_name: e })} value={sort.column_name}>
                        <SelectTrigger className="w-[260px] my-1 border-primary">
                            <SelectValue placeholder="Please select column" />
                        </SelectTrigger>
                        <SelectContent>
                            {nodeData?.data?.dataset?.length > 0 && Object.keys(nodeData?.data?.dataset?.[0])?.map((el: string, i: number) => (
                                <SelectItem key={i} value={el}>{el}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='mt-2'>
                    <Label>Order:</Label>
                    <Select onValueChange={(e) => setSort({ ...sort, order: e })} value={sort.order}>
                        <SelectTrigger className="w-[260px] my-1 border-primary">
                            <SelectValue placeholder="Select order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">Ascending</SelectItem>
                            <SelectItem value="desc">Descending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}

        </CustomNode>
    );
}

export default memo(SortNode);