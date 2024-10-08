/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useEffect } from "react";
import CustomNode from "../custom-node";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

const createWorker = createWorkerFactory(() => import('../../../lib/worker'));




const MergeByColumnKey = ({ id, data, ...props }: any) => {
    const { updateNodeData } = useReactFlow();
    const worker = useWorker(createWorker);

    const connectionsTarget1 = useHandleConnections({ type: 'target', id: `target_${id}` });
    const connectionsTarget2 = useHandleConnections({ type: 'target', id: `target_2_${id}` });
    const nodeData1: any = useNodesData(connectionsTarget1?.[0]?.source);
    const nodeData2: any = useNodesData(connectionsTarget2?.[0]?.source);

    const getKeyTypes = useCallback((data: any[]) => {
        const types = new Map<string, string>();
        for (const key of Object.keys(data[0])) {
            types.set(key, typeof data[0][key]);
        }
        return types;
    }, []);

    useEffect(() => {
        const dataset1: any = nodeData1?.data?.dataset || [];
        const dataset2: any = nodeData2?.data?.dataset || [];

        if (dataset1.length > 0 && dataset2.length > 0) {
            const types1 = getKeyTypes(dataset1);
            const types2 = getKeyTypes(dataset2);
            const commonKeys = Array.from(types1.keys()).filter(key =>
                types2.has(key) && types1.get(key) === types2.get(key)
            );
            if (commonKeys.length !== data?.merge_column?.list?.length || !commonKeys.every((key, i) => key === data?.merge_column?.list[i])) {
                updateNodeData(id, { merge_column: {...data?.merge_column ,  list: commonKeys } });
            }
        }
    }, [nodeData1, nodeData2]);


    useEffect(() => {
        const dataset1: any = nodeData1?.data?.dataset || [];
        const dataset2: any = nodeData2?.data?.dataset || [];
        if (data?.merge_column?.column_key && dataset1 && dataset2) {
            (async ()=>{
                const modifiedData = await worker.mergeByColumn(dataset1, dataset2, data?.merge_column?.column_key);
                updateNodeData(id, { dataset: modifiedData });
            })()
        }
    }, [data?.merge_column]);

    const handleColumnChange=useCallback((merged:any)=>{
        updateNodeData(id, { merge_column: merged });
    },[])

    return (
        <CustomNode title="Merge by column" enableSecondTarget={true} id={id} input={`IN1 : ${nodeData1?.data?.dataset?.length || 0} & IN2 : ${nodeData2?.data?.dataset?.length || 0}`} output={`OP : ${data?.dataset?.length || 0}`} {...props}>
            {nodeData1?.data?.dataset?.length > 0 && nodeData2?.data?.dataset?.length > 0 ? <>
                <Label>Similar Column name:</Label>
                <Select onValueChange={(e)=>handleColumnChange({...data?.merge_column ,  column_key: e })} value={data?.merge_column?.column_key}>
                    <SelectTrigger className="w-[260px] my-1 border-primary">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        {data?.merge_column?.list?.map((el: string, i: number) => (
                            <SelectItem key={i} value={el}>{el}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach 2 valid dataset</p>}
        </CustomNode>
    );
}

export default memo(MergeByColumnKey);