/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useEffect, useState } from "react";
import CustomNode from "../custom-node";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MergeByColumnKey = (props: any) => {
    const [dataset1] = useState([]);
    const [dataset2] = useState([]);
    const [mergeColumn, setMergeColumn] = useState<{ list: string[], column_key: string }>({ list: [], column_key: "" });

    const getKeyTypes = useCallback((data: any[]) => {
        const types = new Map<string, string>();
        for (const key of Object.keys(data[0])) {
            types.set(key, typeof data[0][key]);
        }
        return types;
    }, []);

    useEffect(() => {
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
    }, [dataset1, dataset2, getKeyTypes, mergeColumn.list]);

    return (
        <CustomNode title="Merge by column" enableSecondTarget={true} {...props}>
            <Select>
                <SelectTrigger className="w-[260px] my-1 border-primary">
                    <SelectValue placeholder="Please connect two source(same column)" />
                </SelectTrigger>
                <SelectContent>
                    {mergeColumn.list?.map((el: string, i: number) => (
                        <SelectItem key={i} value={el}>{el}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </CustomNode>
    );
}

export default memo(MergeByColumnKey);