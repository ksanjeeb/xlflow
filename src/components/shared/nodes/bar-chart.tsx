/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomNode from "../custom-node";
import { Label } from "@/components/ui/label";
import { memo, useState } from "react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

function BarchartNode(props: any) {
    const [inputData, setInputData] = useState({ x_axis: "", y_axis: "" })
    const [dataset] = useState([
        {
            "country": "Afghanistan",
            "population": "Many",
            "life expectancy": 58.7,
            "income": 1870
        },
        {
            "country": "Albania",
            "population": 2930000,
            "life expectancy": 78,
            "income": 12400
        },
        {
            "country": "Algeria",
            "population": 42000000,
            "life expectancy": 77.9,
            "income": 13700
        },
        {
            "country": "Andorra",
            "population": 77000,
            "life expectancy": null,
            "income": 51500
        }
    ]);


    const chartConfig = {
        views: {
            label: "Label",
        },
    } satisfies ChartConfig



    return (
        <CustomNode title="Example Data"  {...props}>
            {dataset.length > 0 ? <div className="max-w-[600px]">
                <div className="mt-2">
                    <Label>x-axis</Label>
                    <Select onValueChange={(e: any) => setInputData({ ...inputData, x_axis: e })} value={inputData.x_axis}>
                        <SelectTrigger className="w-[420px] my-1 border-primary">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            {dataset.length > 0 && Object.keys(dataset[0])?.map((el: string, i: number) => (
                                <SelectItem key={i} value={el}>{el}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-2">
                    <Label>y-axis</Label>
                    <Select onValueChange={(e: any) => setInputData({ ...inputData, y_axis: e })} value={inputData.y_axis}>
                        <SelectTrigger className="w-[420px] my-1 border-primary">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            {dataset.length > 0 && Object.keys(dataset[0])?.map((el: string, i: number) => (
                                <SelectItem key={i} value={el}>{el}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-4">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={dataset}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey={inputData.x_axis}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                    />
                                }
                            />
                            <Bar dataKey={inputData.y_axis} fill={`white`} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset.</p>}
        </CustomNode >
    );
}

export default memo(BarchartNode);