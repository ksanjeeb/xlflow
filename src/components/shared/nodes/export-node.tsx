/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from "react";
import CustomNode from "../custom-node";
import { Button } from "@/components/ui/button";
import { useHandleConnections, useNodesData } from "@xyflow/react";
import Papa from 'papaparse';

const ExportNode = ({ id, ...props }: any) => {
    const [dataset, setDataset] = useState<any>([]);

    const connectionsTarget = useHandleConnections({ type: 'target', id: `target_${id}` });
    const nodeData = useNodesData(connectionsTarget?.[0]?.source);

    useEffect(() => {
        const data: any = nodeData?.data?.dataset || [];
        setDataset(data);
    }, [nodeData]);

    function downloadCSV(array: any[]) {
        if (!array || array.length === 0) {
            console.error('No data to download');
            return;
        }
    
        const csv = Papa.unparse(array);
        const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        let csvURL: string | null = null;
    
        if ((navigator as any).msSaveBlob) {
            (navigator as any).msSaveBlob(csvData, 'data.csv');
        } else {
            csvURL = window.URL.createObjectURL(csvData);
            const tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', 'data.csv');
            tempLink.click();
        }
    }

    function downloadJSON(array: any[]) {
        if (!array || array.length === 0) {
            console.error('No data to download');
            return;
        }

        const jsonString = JSON.stringify(array, null, 2);
        const jsonData = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
        let jsonURL: string | null = null;

        if ((navigator as any).msSaveBlob) {
            (navigator as any).msSaveBlob(jsonData, 'data.json');
        } else {
            jsonURL = window.URL.createObjectURL(jsonData);
            const tempLink = document.createElement('a');
            tempLink.href = jsonURL;
            tempLink.setAttribute('download', 'data.json');
            tempLink.click();
        }
    }

    return (
        <CustomNode title="File" enableSource={false} id={id} {...props}>
            {dataset.length > 0 ? <>
                <div className='mt-4 flex flex-col gap-1'>
                    <Button onClick={() => downloadCSV(dataset)}>Download csv</Button>
                    <Button onClick={() => downloadJSON(dataset)}>Download json</Button>
                </div>
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}
        </CustomNode>
    );
}

export default memo(ExportNode);