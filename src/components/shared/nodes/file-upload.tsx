/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import CustomNode from "../custom-node";
import { FileUp, Trash2 } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import Papa from 'papaparse';

const FileUpload = ({ id, data, ...props }: any) => {
    const { updateNodeData } = useReactFlow();
    const [parsing , setParsing] = useState(false);

    const handleFileChange = (event: any) => {
        try {
            const file = event.target.files[0];
            const fileType = file.name.split('.').pop().toLowerCase();
            if (fileType !== 'csv') {
                alert('Please upload a CSV file.');
                return;
            }
            if (file) {
                setParsing(true)
                Papa.parse(file, {
                    worker:true,
                    complete: (result) => {
                        setParsing(false)
                        updateNodeData(id, { dataset: result.data, fileName: file.name })
                    },
                    header: true,
                });
            }
        } catch (err) {
            console.error(err)
        }
    };


    return (
        <CustomNode title="File" enableTarget={false} id={id} input={parsing ? "Parsing...":"Dataset : " + data?.dataset.length || 0} {...props}>
            <div className='grid place-content-center'>
                {data?.fileName ? <p>Uploaded file:</p> : <p>Upload your file here:</p>}
                {data?.fileName ? (
                    <div className='flex mt-2 flex-row gap-1 min-w-64'>
                        <FileUp className='self-center flex-0' size={12} />
                        <p className=" self-center grow font-bold">{data?.fileName}</p>
                        <Trash2 className='self-center flex-0 ml-2 cursor-pointer' color='red' size={16} onClick={() => updateNodeData(id, { dataset: [], fileName: "" })} />
                    </div>
                ) : <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className='mt-2'
                    disabled ={parsing}
                />}
            </div>
        </CustomNode>
    );
}

export default memo(FileUpload);