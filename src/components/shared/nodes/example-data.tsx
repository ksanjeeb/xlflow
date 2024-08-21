import { memo } from "react";
import CustomNode from "../custom-node";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ExampleData = (props: any) => {
    return (
        <CustomNode title="Example Data" enableTarget={false} {...props}>
            <Select>
                <SelectTrigger className="w-[260px] my-1 border-primary">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
        </CustomNode >
    );
}

export default memo(ExampleData);