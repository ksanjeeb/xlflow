/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import CustomNode from "../custom-node";
import { Button } from "@/components/ui/button";

const ExportNode = (props: any) => {
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
        <CustomNode title="File" enableSource={false} {...props}>
            {dataset.length > 0 ? <>
                <div className='mt-4 flex flex-col gap-1'>
                   <Button >Download csv</Button>
                   <Button >Download json</Button>
                </div>
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}
        </CustomNode>
    );
}

export default memo(ExportNode);