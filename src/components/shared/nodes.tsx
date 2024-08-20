/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from 'react';
import CustomNode from './custom-node';
import { FileUp, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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
                {fileName ? <p>Uploaded file:</p> : <p>Upload your file here:</p>}
                {fileName ? (
                    <div className='flex mt-2 flex-row gap-1 min-w-64'>
                        <FileUp className='self-center flex-0' size={12} />
                        <p className=" self-center grow font-bold">{fileName?.["name"]}</p>
                        <Trash2 className='self-center flex-0 ml-2 cursor-pointer' color='red' size={16} onClick={() => setFileName(null)} />
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

const ExampleData = (props: any) => {
    // const [input, setInput] = useState("");
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

const MemoizedFileUpload = memo(FileUpload);
const MemoizedGoogleSheet = memo(GoogleSheet);
const MemoizedExampleData = memo(ExampleData);

export {
    MemoizedFileUpload as FileUpload,
    MemoizedGoogleSheet as GoogleSheet,
    MemoizedExampleData as ExampleData
};
