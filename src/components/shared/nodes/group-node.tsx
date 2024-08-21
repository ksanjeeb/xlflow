/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import CustomNode from "../custom-node";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const GroupNode = (props: any) => {
    const [dataset] = useState([  {
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
      },]);



    return (
        <CustomNode title="Group"  {...props}>
            {dataset.length > 0 ? <>
            <Label>Column name:</Label>
            <Select>
                <SelectTrigger className="w-[260px] my-1 border-primary">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    {dataset.length > 0 && Object.keys(dataset[0])?.map((el: string, i: number) => (
                        <SelectItem key={i} value={el}>{el}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            </>: <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}
        </CustomNode>
    );
}

export default memo(GroupNode);