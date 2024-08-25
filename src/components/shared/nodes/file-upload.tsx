/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import CustomNode from "../custom-node";
import { FileUp, Trash2 } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import Papa from 'papaparse';
import toast from "react-hot-toast";

const FileUpload = ({ id, data, ...props }: any) => {
    const { updateNodeData } = useReactFlow();
    const [parsing, setParsing] = useState(false);

    const handleFileChange = (event: any) => {
        try {
            const file = event.target.files[0];
            const fileType = file.name.split('.').pop().toLowerCase();
            if (fileType !== 'csv' && fileType !== 'json') {
                toast.error('Please upload a CSV or JSON file.');
                return;
            }
            if (file) {
                setParsing(true);
                if (fileType === "csv") {
                    Papa.parse(file, {
                        worker: true,
                        complete: (result) => {
                            setParsing(false);
                            updateNodeData(id, { dataset: result.data, fileName: file.name });
                        },
                        error: (err) => {
                            setParsing(false);
                            console.error("Parsing error:", err);
                        },
                        header: true,
                    });
                } else if (fileType === "json") {
                    const reader = new FileReader();
                    reader.onload = (event:any) => {
                        try {
                            const jsonData = JSON.parse(event.target.result);
                            setParsing(false);
                            updateNodeData(id, { dataset: jsonData, fileName: file.name });
                        } catch (error) {
                            setParsing(false);
                            console.error("JSON parsing error:", error);
                        }
                    };
                    reader.readAsText(file);
                } else {
                    setParsing(false);
                    console.error("Unsupported file type:", fileType);
                }
            }
        } catch (err) {
            update(err)
console.error(err)
        }
    };


    return (
        <CustomNode title="File" enableTarget={false} id={id} input={parsing ? "Parsing..." : "Dataset : " + data?.dataset.length || 0} {...props}>
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
                    accept=".csv, .json"
                    onChange={handleFileChange}
                    className="mt-2"
                    disabled={parsing}
                />}
            </div>
        </CustomNode>
    );
}

export default memo(FileUpload);