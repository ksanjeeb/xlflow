/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import CustomNode from "../custom-node";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GoogleSheet = (props: any) => {
    const [input, setInput] = useState("");
    return (
        <CustomNode title="Google sheets" enableTarget={false} {...props}>
            <div className='grid place-content-center '>
                <p>Google sheet id:</p>
                <Input
                    type='text'
                    value={input}
                    onChange={e => { e.preventDefault(); setInput(e.target.value) }}
                    className='my-2 min-w-64 border-2 border-primary'
                />
                <Button className='w-fit'>Load</Button>
            </div>
        </CustomNode >
    );
}

export default memo(GoogleSheet)