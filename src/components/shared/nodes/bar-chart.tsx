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
        },
        {
            "country": "Angola",
            "population": 30800000,
            "life expectancy": 65.2,
            "income": 5850
        },
        {
            "country": "Antigua and Barbuda",
            "population": 103000,
            "life expectancy": 77.6,
            "income": 21000
        },
        {
            "country": "Argentina",
            "population": 44700000,
            "life expectancy": 77,
            "income": 18900
        },
        {
            "country": "Armenia",
            "population": 2930000,
            "life expectancy": 76,
            "income": 8660
        },
        {
            "country": "Australia",
            "population": 24800000,
            "life expectancy": 82.9,
            "income": 45800
        },
        {
            "country": "Austria",
            "population": 8750000,
            "life expectancy": 81.8,
            "income": 44600
        },
        {
            "country": "Azerbaijan",
            "population": 9920000,
            "life expectancy": 72.3,
            "income": 16600
        },
        {
            "country": "Bahamas",
            "population": 399000,
            "life expectancy": 74.1,
            "income": 21900
        },
        {
            "country": "Bahrain",
            "population": 1570000,
            "life expectancy": 77.2,
            "income": 44300
        },
        {
            "country": "Bangladesh",
            "population": 166000000,
            "life expectancy": 73.4,
            "income": 3720
        },
        {
            "country": "Barbados",
            "population": 286000,
            "life expectancy": 76.8,
            "income": 16000
        },
        {
            "country": "Belarus",
            "population": 9450000,
            "life expectancy": 73.8,
            "income": 17200
        },
        {
            "country": "Belgium",
            "population": 11500000,
            "life expectancy": 81.2,
            "income": 42800
        },
        {
            "country": "Belize",
            "population": 382000,
            "life expectancy": 72.5,
            "income": 7710
        },
        {
            "country": "Benin",
            "population": 11500000,
            "life expectancy": 65,
            "income": 2170
        },
        {
            "country": "Bhutan",
            "population": 817000,
            "life expectancy": 74.8,
            "income": 9930
        },
        {
            "country": "Bolivia",
            "population": 11200000,
            "life expectancy": 74,
            "income": 6980
        },
        {
            "country": "Bosnia and Herzegovina",
            "population": 3500000,
            "life expectancy": 77.9,
            "income": 12100
        },
        {
            "country": "Botswana",
            "population": 2330000,
            "life expectancy": 66.9,
            "income": 16500
        },
        {
            "country": "Brazil",
            "population": 211000000,
            "life expectancy": 75.7,
            "income": 14300
        },
        {
            "country": "Brunei",
            "population": 434000,
            "life expectancy": 77.4,
            "income": 76900
        },
        {
            "country": "Bulgaria",
            "population": 7040000,
            "life expectancy": 75.3,
            "income": 18900
        },
        {
            "country": "Burkina Faso",
            "population": 19800000,
            "life expectancy": 61.6,
            "income": 1710
        },
        {
            "country": "Burundi",
            "population": 11200000,
            "life expectancy": 61.1,
            "income": 691
        },
        {
            "country": "Cambodia",
            "population": 16200000,
            "life expectancy": 69.3,
            "income": 3830
        },
        {
            "country": "Cameroon",
            "population": 24700000,
            "life expectancy": 61.2,
            "income": 3170
        },
        {
            "country": "Canada",
            "population": 37000000,
            "life expectancy": 82.2,
            "income": 43800
        },
        {
            "country": "Cape Verde",
            "population": 553000,
            "life expectancy": 74.1,
            "income": 6420
        },
        {
            "country": "Central African Republic",
            "population": 4740000,
            "life expectancy": 51.6,
            "income": 689
        },
        {
            "country": "Chad",
            "population": 15400000,
            "life expectancy": 60.5,
            "income": 1860
        },
        {
            "country": "Chile",
            "population": 18200000,
            "life expectancy": 80.7,
            "income": 23400
        },
        {
            "country": "China",
            "population": 1420000000,
            "life expectancy": 76.9,
            "income": 16000
        },
        {
            "country": "Colombia",
            "population": 49500000,
            "life expectancy": 78.6,
            "income": 13700
        },
        {
            "country": "Comoros",
            "population": 832000,
            "life expectancy": 68,
            "income": 1440
        },
        {
            "country": "Congo, Dem. Rep.",
            "population": 84000000,
            "life expectancy": 62.4,
            "income": 751
        },
        {
            "country": "Congo, Rep.",
            "population": 5400000,
            "life expectancy": 63.9,
            "income": 5620
        },
        {
            "country": "Costa Rica",
            "population": 4950000,
            "life expectancy": 81.4,
            "income": 16200
        },
        {
            "country": "Cote d'Ivoire",
            "population": 24900000,
            "life expectancy": 61.2,
            "income": 3760
        },
        {
            "country": "Croatia",
            "population": 4160000,
            "life expectancy": 77.7,
            "income": 22600
        },
        {
            "country": "Cuba",
            "population": 11500000,
            "life expectancy": 79.3,
            "income": 20000
        },
        {
            "country": "Cyprus",
            "population": 1190000,
            "life expectancy": 80.8,
            "income": 32200
        },
        {
            "country": "Czech Republic",
            "population": 10600000,
            "life expectancy": 79.4,
            "income": 32300
        },
        {
            "country": "Denmark",
            "population": 5750000,
            "life expectancy": 81.1,
            "income": 46600
        },
        {
            "country": "Djibouti",
            "population": 971000,
            "life expectancy": 67.1,
            "income": 3540
        },
        {
            "country": "Dominica",
            "population": 74300,
            "life expectancy": null,
            "income": 10600
        },
        {
            "country": "Dominican Republic",
            "population": 10900000,
            "life expectancy": 76.1,
            "income": 15200
        },
        {
            "country": "Ecuador",
            "population": 16900000,
            "life expectancy": 78.3,
            "income": 10200
        },
        {
            "country": "Egypt",
            "population": 99400000,
            "life expectancy": 72.6,
            "income": 10800
        },
        {
            "country": "El Salvador",
            "population": 6410000,
            "life expectancy": 75.8,
            "income": 8290
        },
        {
            "country": "Equatorial Guinea",
            "population": 1310000,
            "life expectancy": 66.1,
            "income": 20500
        },
        {
            "country": "Eritrea",
            "population": 5190000,
            "life expectancy": 64.6,
            "income": 1250
        },
        {
            "country": "Estonia",
            "population": 1310000,
            "life expectancy": 77.7,
            "income": 29500
        },
        {
            "country": "Ethiopia",
            "population": 108000000,
            "life expectancy": 66.4,
            "income": 1800
        },
        {
            "country": "Fiji",
            "population": 912000,
            "life expectancy": 65.8,
            "income": 9420
        },
        {
            "country": "Finland",
            "population": 5540000,
            "life expectancy": 82.1,
            "income": 40300
        },
        {
            "country": "France",
            "population": 65200000,
            "life expectancy": 82.6,
            "income": 39000
        },
        {
            "country": "Gabon",
            "population": 2070000,
            "life expectancy": 67.3,
            "income": 17500
        },
        {
            "country": "Gambia",
            "population": 2160000,
            "life expectancy": 67.8,
            "income": 1570
        },
        {
            "country": "Georgia",
            "population": 3910000,
            "life expectancy": 74.3,
            "income": 10100
        },
        {
            "country": "Germany",
            "population": 82300000,
            "life expectancy": 81.3,
            "income": 45200
        },
        {
            "country": "Ghana",
            "population": 29500000,
            "life expectancy": 66.6,
            "income": 4380
        },
        {
            "country": "Greece",
            "population": 11100000,
            "life expectancy": 81.3,
            "income": 25500
        },
        {
            "country": "Grenada",
            "population": 108000,
            "life expectancy": 71.9,
            "income": 13500
        },
        {
            "country": "Guatemala",
            "population": 17200000,
            "life expectancy": 73.2,
            "income": 7530
        },
        {
            "country": "Guinea",
            "population": 13100000,
            "life expectancy": 61.9,
            "income": 1280
        },
        {
            "country": "Guinea-Bissau",
            "population": 1910000,
            "life expectancy": 59.7,
            "income": 1550
        },
        {
            "country": "Guyana",
            "population": 782000,
            "life expectancy": 68.2,
            "income": 7740
        },
        {
            "country": "Haiti",
            "population": 11100000,
            "life expectancy": 64.5,
            "income": 1710
        },
        {
            "country": "Holy See",
            "population": 801,
            "life expectancy": 64.5,
            "income": 1710
        },
        {
            "country": "Honduras",
            "population": 9420000,
            "life expectancy": 73.1,
            "income": 4590
        },
        {
            "country": "Hungary",
            "population": 9690000,
            "life expectancy": 75.9,
            "income": 26900
        },
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
                        <SelectTrigger className="w-[260px] my-1 border-primary">
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
                        <SelectTrigger className="w-[260px] my-1 border-primary">
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