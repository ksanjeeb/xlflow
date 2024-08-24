/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from "react";
import CustomNode from "../custom-node";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react";

const handleStatsCalculation = (data: any[], columnName: string) => {
    if (!columnName) {
        return { min: 0, max: 0, average: 0, median: 0, sum: 0 };
    }

    const columnData = data.map((row: any) => Number(row[columnName])).filter((value) => !isNaN(value));

    if (columnData.length === 0) {
        return { min: 0, max: 0, average: 0, median: 0, sum: 0 };
    }

    const sum = columnData.reduce((a, b) => a + b, 0);
    const min = Math.min(...columnData);
    const max = Math.max(...columnData);
    const average = sum / columnData.length;
    const sortedData = columnData.sort((a, b) => a - b);
    const median = sortedData.length % 2 === 0
        ? (sortedData[sortedData.length / 2 - 1] + sortedData[sortedData.length / 2]) / 2
        : sortedData[Math.floor(sortedData.length / 2)];

    return { min, max, average, median, sum };
};

const formatNumber = (num: number) => {
    if (num % 1 !== 0) {
        return num.toFixed(2);
    }
    return num.toString();
};

const StatsNode = ({ id, data, props }: any) => {
    const [inputData, setInputData] = useState({ column_name: "" });
    const [calculation, setCalculation] = useState({ min: 0, max: 0, average: 0, median: 0, sum: 0 });
    const { updateNodeData } = useReactFlow();

    const connectionsTarget = useHandleConnections({
        type: "target",
        id: `target_${id}`,
    });
    const nodeData: any = useNodesData(connectionsTarget?.[0]?.source);

    useEffect(() => {
        const data: any = nodeData?.data?.dataset || [];
        updateNodeData(id, { dataset: data });

        const calculation = handleStatsCalculation(data, inputData.column_name);
        setCalculation(calculation);
    }, [nodeData, inputData, updateNodeData, id]);

    return (
        <CustomNode title="Stats" id={id} input={`IN : ${nodeData?.data?.dataset?.length || 0}`} output={`OP : ${data?.dataset?.length || 0}`} {...props}>
            {nodeData?.data?.dataset?.length > 0 ? (
                <div className="">
                    <Label>Column name:</Label>
                    <Select
                        onValueChange={(e: any) => setInputData({ ...inputData, column_name: e })}
                        value={inputData.column_name}
                    >
                        <SelectTrigger className="w-[260px] my-1 border-primary">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(nodeData.data.dataset[0] || {}).map((el: string, i: number) => {
                                const isNumeric = nodeData.data.dataset.every((row: any) => !isNaN(Number(row[el])));
                                return isNumeric ? <SelectItem key={i} value={el}>{el}</SelectItem> : null;
                            })}
                        </SelectContent>
                    </Select>
                    <div className="mt-6 flex flex-row justify-between">
                        <p className="font-medium">Min</p>
                        <p className="font-semibold">{formatNumber(calculation.min)}</p>
                    </div>
                    <div className="mt-2 flex flex-row justify-between">
                        <p className="font-medium">Max</p>
                        <p className="font-semibold">{formatNumber(calculation.max)}</p>
                    </div>
                    <div className="mt-2 flex flex-row justify-between">
                        <p className="font-medium">Average</p>
                        <p className="font-semibold">{formatNumber(calculation.average)}</p>
                    </div>
                    <div className="mt-2 flex flex-row justify-between">
                        <p className="font-medium">Median</p>
                        <p className="font-semibold">{formatNumber(calculation.median)}</p>
                    </div>
                    <div className="mt-2 flex flex-row justify-between">
                        <p className="font-medium">Sum</p>
                        <p className="font-semibold">{formatNumber(calculation.sum)}</p>
                    </div>
                </div>
            ) : (
                <p className='my-2 min-w-64 text-muted-foreground'>Please attach a valid dataset</p>
            )}
        </CustomNode>
    );
};

export default memo(StatsNode);
