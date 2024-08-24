/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import CustomNode from "../custom-node";
import { FileUp, Trash2 } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import Papa from 'papaparse';

const FileUpload = ({ id, data, ...props }: any) => {
    const { updateNodeData } = useReactFlow();

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType !== 'csv') {
            alert('Please upload a CSV file.');
            return;
        }
        if (file) {
            Papa.parse(file, {
                worker: true,
                step: function (results) {
                    updateNodeData(id, { dataset: results.data , fileName:file.name});
                }
            });
        }
    };


    return (
        <CustomNode title="File" enableTarget={false} id={id} {...props}>
            <div className='grid place-content-center'>
                {data?.fileName ? <p>Uploaded file:</p> : <p>Upload your file here:</p>}
                {data?.fileName ? (
                    <div className='flex mt-2 flex-row gap-1 min-w-64'>
                        <FileUp className='self-center flex-0' size={12} />
                        <p className=" self-center grow font-bold">{data?.fileName}</p>
                        <Trash2 className='self-center flex-0 ml-2 cursor-pointer' color='red' size={16} onClick={() => { setFileName(""); updateNodeData(id, { dataset:[], fileName:""}); }} />
                    </div>
                ) : <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className='mt-2'
                />}
            </div>
        </CustomNode>
    );
}

export default memo(FileUpload);