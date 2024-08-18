/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from 'react';
import CustomNode from './custom-node';
import {  FileUp, Trash2 } from 'lucide-react';

const FileUpload = (props: any) => {
    const [fileName, setFileName] = useState(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file);
        }
    };

    return (
        <CustomNode title="File" enableTarget={false} {...props}>
            <div className='grid place-content-center'>
                {fileName ? <p>Uploaded file:</p>:<p>Upload your file here:</p>}
                {fileName ? (
                    <div className='flex mt-2 flex-row gap-1 min-w-64'>
                        <FileUp className='self-center flex-0' size={12}/>
                        <p className=" self-center grow font-bold">{fileName?.["name"]}</p>
                        <Trash2 className='self-center flex-0 ml-2 cursor-pointer' color='red' size={16} onClick={()=>setFileName(null)}/>
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

const GoogleSheet = (props: any) => {
    return (
        <CustomNode {...props}>

        </CustomNode >
    );
}

const MemoizedFileUpload = memo(FileUpload);
const MemoizedGoogleSheet = memo(GoogleSheet);

export {
    MemoizedFileUpload as FileUpload,
    MemoizedGoogleSheet as GoogleSheet
};
