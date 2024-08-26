/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomNode from "../custom-node";
import { Label } from "@/components/ui/label";
import { memo, useEffect } from "react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react";

function BarchartNode({ id, data, ...props }: any) {
    // const [inputData, setInputData] = useState({ x_axis: "", y_axis: "" })
    const { updateNodeData } = useReactFlow();


    const chartConfig = {
        views: {
            label: "Label",
        },
    } satisfies ChartConfig

    const connectionsTarget = useHandleConnections({ type: 'target', id: `target_${id}` });
    const nodeData = useNodesData(connectionsTarget?.[0]?.source);

    useEffect(() => {
        const data: any = nodeData?.data?.dataset || [];
        updateNodeData(id, { dataset: data, config: { x_axis: "", y_axis: "" } });

    }, [nodeData]);

    const handleChange = (value: any) => {
        updateNodeData(id, { config: value });

}

return (
    <CustomNode title="Example Data" id={id}  {...props}>
        {data?.dataset?.length > 0 ? <div className="max-w-[600px]">
            <div className="mt-2">
                <Label>x-axis</Label>
                <Select onValueChange={(e: any) => handleChange({ ...data?.config, x_axis: e })} value={data?.config?.x_axis}>
                    <SelectTrigger className="w-[420px] my-1 border-primary">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        {data?.dataset?.length > 0 && Object.keys(data?.dataset?.[0])?.map((el: string, i: number) => (
                            <SelectItem key={i} value={el}>{el}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mt-2">
                <Label>y-axis</Label>
                <Select onValueChange={(e: any) => handleChange({ ...data?.config, y_axis: e })} value={data?.config?.y_axis}>
                    <SelectTrigger className="w-[420px] my-1 border-primary">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        {data?.dataset?.length > 0 && Object.keys(data?.dataset?.[0])?.map((el: string, i: number) => (
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
                        data={data?.dataset.slice(0, 1000)}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={data?.config?.x_axis}
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
                        <Bar dataKey={data?.config?.y_axis} fill={`white`} />
                    </BarChart>
                </ChartContainer>
                <p className="text-xs text-muted-foreground mt-2">*current chart supports only thousand records</p>
            </div>
        </div> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset.</p>}
    </CustomNode >
);
}

export default memo(BarchartNode);