/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import CustomNode from "../custom-node";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Papa from 'papaparse';
import { useReactFlow } from "@xyflow/react";
import toast from "react-hot-toast";
import { useLogsStore } from "@/lib/store";

const GoogleSheet = ({ id, data, ...props }: any) => {
    const [input, setInput] = useState(data?.url || "");
    const [parsing, setParsing] = useState(false);
    const { updateNodeData } = useReactFlow();
    const { update } = useLogsStore();
    const handleLoad = () => {
        try {
            const sheet_id = input;
            if (sheet_id) {
                setParsing(true)
                Papa.parse(`https://docs.google.com/spreadsheets/d/e/${sheet_id}/pub?output=csv`, {
                    worker: true,
                    download: true,
                    complete: (result) => {
                        setParsing(false)
                        console.log(result)
                        updateNodeData(id, { dataset: result?.data || [], url: sheet_id })
                    },
                    error: (err) => {
                        toast.error(err?.message || "Error while parsing.");
                    },
                    header: true,
                });
            } else {
                toast.error("Please add URL.")
            }
        } catch (err) {
            update(err)
            console.error(err)
        }
    };

    return (
        <CustomNode title="Google sheets" enableTarget={false} input={parsing ? "Parsing..." : "Dataset : " + data?.dataset.length || 0} id={id} {...props}>
            <div className='grid place-content-center '>
                <p>Google sheet downloadable ID:</p>
                <Input
                    type='text'
                    value={input}
                    onChange={e => { e.preventDefault(); setInput(e.target.value) }}
                    className='my-2 min-w-64 border-2 border-primary'
                />
                <Button className='w-fit' onClick={handleLoad} disabled={parsing}>{parsing ? "Loading..." : "Load"}</Button>
            </div>
        </CustomNode >
    );
}

export default memo(GoogleSheet)