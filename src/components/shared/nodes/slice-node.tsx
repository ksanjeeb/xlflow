/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import CustomNode from "../custom-node";
import { memo, useState } from "react";
import { Label } from "@/components/ui/label";

function SliceNode(props: any) {
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
    const [sliceIndex, setSliceIndex] = useState({ to: 0, from: 0 });
    return (
        <CustomNode title="Slice" {...props}>
            {dataset.length > 0 ? <>
            <div className='mt-1'>
                <Label>From index:</Label>
                <Input
                    type='number'
                    value={sliceIndex.from}
                    onChange={e => { setSliceIndex({...sliceIndex, from:Number(e.target.value)}) }}
                    className='my-2 min-w-64 border-2 border-primary'
                />
            </div>

            <div className='mt-1'>
                <Label>To index:</Label>
                <Input
                    type='number'
                    value={sliceIndex.to}
                    onChange={e => { setSliceIndex({...sliceIndex, to:Number(e.target.value)}) }}
                    className='my-2 min-w-64 border-2 border-primary'
                />
            </div>
            </>: <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}
        </CustomNode >
    );
}

export default memo(SliceNode);