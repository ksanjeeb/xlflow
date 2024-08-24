/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useEffect, useState } from "react";
import CustomNode from "../custom-node";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react";

type JsonObject = { [key: string]: any };


function mergeByColumn(dataset1: JsonObject[], dataset2: JsonObject[], key: string): any {
    try {
        const mergedMap: { [key: string]: JsonObject } = {};
        for (const item of dataset1) {
            if (item.hasOwnProperty(key)) {
                mergedMap[item[key]] = { ...item };
            } else {
                mergedMap[item[key]] = item;
            }
        }

        for (const item of dataset2) {
            if (item.hasOwnProperty(key)) {
                if (mergedMap[item[key]]) {
                    mergedMap[item[key]] = { ...mergedMap[item[key]], ...item };
                } else {
                    mergedMap[item[key]] = item;
                }
            } else {
                mergedMap[item[key]] = item;
            }
        }

        return Object.values(mergedMap);
    } catch (err) {
        console.error(err)
    }
}

const MergeByColumnKey = ({ id, data, ...props }: any) => {
    const [mergeColumn, setMergeColumn] = useState<{ list: string[], column_key: string }>({ list: [], column_key: "" });
    const { updateNodeData } = useReactFlow();

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
            if (commonKeys.length !== mergeColumn.list.length || !commonKeys.every((key, i) => key === mergeColumn.list[i])) {
                setMergeColumn((prev: any) => ({ ...prev, list: commonKeys }));
            }
        }
    }, [nodeData1, nodeData2]);


    useEffect(() => {
        const dataset1: any = nodeData1?.data?.dataset || [];
        const dataset2: any = nodeData2?.data?.dataset || [];
        if (mergeColumn?.column_key && dataset1 && dataset2) {
            const filteredData = mergeByColumn(dataset1, dataset2, mergeColumn?.column_key);
            console.log(filteredData)
            updateNodeData(id, { dataset: filteredData });
        }
    }, [mergeColumn]);

    return (
        <CustomNode title="Merge by column" enableSecondTarget={true} id={id} input={`IN1 : ${nodeData1?.data?.dataset?.length || 0} & IN2 : ${nodeData2?.data?.dataset?.length || 0}`} output={`OP : ${data?.dataset?.length || 0}`} {...props}>
            {nodeData1?.data?.dataset?.length > 0 && nodeData2?.data?.dataset?.length > 0 ? <>
                <Label>Similar Column name:</Label>
                <Select onValueChange={(e: any) => setMergeColumn((prev: any) => ({ ...prev, column_key: e }))} value={mergeColumn.column_key}>
                    <SelectTrigger className="w-[260px] my-1 border-primary">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        {mergeColumn?.list?.map((el: string, i: number) => (
                            <SelectItem key={i} value={el}>{el}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach 2 valid dataset</p>}
        </CustomNode>
    );
}

export default memo(MergeByColumnKey);