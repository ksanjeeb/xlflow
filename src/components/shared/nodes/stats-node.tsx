/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from "react";
import CustomNode from "../custom-node";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const StatsNode = (props: any) => {
    const [dataset] = useState([
        { "country": "Afghanistan", "population": 30000000, "life expectancy": 58.7, "income": 1870 },
        { "country": "Albania", "population": 2930000, "life expectancy": 78, "income": 12400 },
        // Add more data rows as needed...
    ]);

    const [inputData, setInputData] = useState({ column_name: "" });
    const [calculation, setCalculation] = useState({ min: 0, max: 0, average: 0, median: 0, sum: 0 });

    useEffect(() => {
        if (inputData.column_name && dataset.length > 0) {
            const columnData = dataset.map((row:any) => Number(row[inputData.column_name])).filter((value) => !isNaN(value));

            if (columnData.length > 0) {
                const sum = columnData.reduce((a, b) => a + b, 0);
                const min = Math.min(...columnData);
                const max = Math.max(...columnData);
                const average = sum / columnData.length;
                const sortedData = columnData.sort((a, b) => a - b);
                const median = sortedData.length % 2 === 0
                    ? (sortedData[sortedData.length / 2 - 1] + sortedData[sortedData.length / 2]) / 2
                    : sortedData[Math.floor(sortedData.length / 2)];

                setCalculation({ min, max, average, median, sum });
            } else {
                setCalculation({ min: 0, max: 0, average: 0, median: 0, sum: 0 });
            }
        }
    }, [inputData.column_name, dataset]);

    return (
        <CustomNode title="Group"  {...props}>
            {dataset.length > 0 ? <>
                <Label>Column name:</Label>
                <Select onValueChange={(e: any) => setInputData({ ...inputData, column_name: e })} value={inputData.column_name}>
                    <SelectTrigger className="w-[260px] my-1 border-primary">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(dataset[0])?.map((el: string, i: number) => (
                            <SelectItem key={i} value={el}>{el}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="mt-6 flex flex-row justify-between">
                    <p className="font-medium">Min</p>
                    <p className="font-semibold">{calculation.min}</p>
                </div>
                <div className="mt-2 flex flex-row justify-between">
                    <p className="font-medium">Max</p>
                    <p className="font-semibold">{calculation.max}</p>
                </div>
                <div className="mt-2 flex flex-row justify-between">
                    <p className="font-medium">Average</p>
                    <p className="font-semibold">{calculation.average}</p>
                </div>
                <div className="mt-2 flex flex-row justify-between">
                    <p className="font-medium">Median</p>
                    <p className="font-semibold">{calculation.median}</p>
                </div>
                <div className="mt-2 flex flex-row justify-between">
                    <p className="font-medium">Sum</p>
                    <p className="font-semibold">{calculation.sum}</p>
                </div>
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}
        </CustomNode>
    );
}

export default memo(StatsNode);
