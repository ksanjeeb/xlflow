import { memo, useCallback, useState } from "react";
import CustomNode from "../custom-node";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReactFlow } from "@xyflow/react";
import CountriesIndicator from "../../../json/countries_indicators.json";
import UFOSighting from "../../../json/ufo_sighting.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ExampleData = ({ id, ...props }: any) => {
    const [example, setExample] = useState("");
    const { updateNodeData } = useReactFlow();

    const onChange = useCallback((evt: string) => {
        let temp: any;
        if (evt === "countries_indicators") {
            temp = CountriesIndicator;
        } else if (evt === "ufo_sighting") {
            temp = UFOSighting;
        } else {
            return;
        }
        setExample(evt);
        if (temp) {
            updateNodeData(id, { dataset: temp });
        }
    }, []);

    return (
        <CustomNode title="Example Data" enableTarget={false} id={id} {...props}>
            <Select onValueChange={(e) => onChange(e)} value={example}>
                <SelectTrigger className="w-[260px] my-1 border-primary">
                    <SelectValue placeholder="Select dataset" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="countries_indicators">Country Indicators</SelectItem>
                    <SelectItem value="ufo_sighting">UFO Sighting</SelectItem>
                </SelectContent>
            </Select>
        </CustomNode >
    );
}

export default memo(ExampleData);