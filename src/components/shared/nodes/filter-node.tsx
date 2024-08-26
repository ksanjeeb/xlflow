/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useCallback } from 'react';
import CustomNode from '../custom-node';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { useHandleConnections, useNodesData, useReactFlow } from '@xyflow/react';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';

type FilterState = {
    filter_column: string;
    filter_list: string[];
    type: string;
    filter_key: string;
    filter_value: string;
};

const text_type = [
    "text_is_exactly",
    "text_is_not_exactly",
    "text_includes",
    "text_does_not_include",
    "data_is_not_empty_or_null",
    "data_matches_regex",
];

const num_types = [
    "number_equals",
    "number_is_greater_than",
    "number_is_greater_than_or_equals",
    "number_is_less_than",
    "number_is_less_than_or_equals",
    "data_is_not_empty_or_null",
    "data_matches_regex",
];

// const applyFilter = (
//     data: any[],
//     filterKey: string,
//     filterValue: string | number,
//     filterColumn: string
// ): any[] => {
//     if (!filterKey || !filterValue || !filterColumn) return data;

//     switch (filterKey) {
//         case "text_is_exactly":
//             return data.filter(item => item[filterColumn] == filterValue);
//         case "text_is_not_exactly":
//             return data.filter(item => item[filterColumn] != filterValue);
//         case "text_includes":
//             return data.filter(item => item[filterColumn]?.includes(filterValue));
//         case "text_does_not_include":
//             return data.filter(item => !item[filterColumn]?.includes(filterValue));
//         case "data_is_not_empty_or_null":
//             return data.filter(item => item[filterColumn] != null && item[filterColumn] !== '');
//         case "data_matches_regex":
//             // eslint-disable-next-line no-case-declarations
//             const regex = new RegExp(filterValue as string);
//             return data.filter(item => regex.test(item[filterColumn]));
//         case "number_equals":
//             return data.filter(item => item[filterColumn] == Number(filterValue));
//         case "number_is_greater_than":
//             return data.filter(item => item[filterColumn] > Number(filterValue));
//         case "number_is_greater_than_or_equals":
//             return data.filter(item => item[filterColumn] >= Number(filterValue));
//         case "number_is_less_than":
//             return data.filter(item => item[filterColumn] < Number(filterValue));
//         case "number_is_less_than_or_equals":
//             return data.filter(item => item[filterColumn] <= Number(filterValue));
//         default:
//             return data;
//     }
// };

const createWorker = createWorkerFactory(() => import('../../../lib/worker'));


const initialFilter: FilterState = {
    filter_column: "",
    filter_list: [],
    type: "",
    filter_key: "",
    filter_value: "",
}


const FilterNode = ({ id, data, ...props }: { id: string;[key: string]: any }) => {
    const { updateNodeData } = useReactFlow();

    const connectionsTarget = useHandleConnections({ type: 'target', id: `target_${id}` });
    const nodeData: any = useNodesData(connectionsTarget?.[0]?.source);
    const worker = useWorker(createWorker);


    useEffect(() => {
        const data: any = nodeData?.data?.dataset || [];
        updateNodeData(id, { dataset: data, filter: initialFilter });
    }, [nodeData.data.dataset]);

    useEffect(() => {
        (async () => {
            const data_filtered = await worker.applyFilter(nodeData?.data?.dataset, nodeData?.data?.filter_key, nodeData?.data?.filter_value, nodeData?.data?.filter_column);
            updateNodeData(id, { dataset: data_filtered });
        })();
    }, [nodeData.data.filter]);

    const handleColumnChange = useCallback((value: string) => {
        const columnValue = nodeData?.data?.dataset?.[0]?.[value];
        const isNumber = typeof columnValue === "number";
        const filter = {
            filter_column: value,
            filter_list: isNumber ? num_types : text_type,
            type: isNumber ? "number" : "text",
            filter_key: "",
            filter_value: "",
        };
        updateNodeData(id, { filter });

    }, [nodeData?.data?.dataset]);

    const handleFilterChange = (key: string, value: any) => {
        const filter = { ...nodeData?.data?.filter }
        if (key === "condition") {
            filter.filter_key = value;
            filter.filter_value = ""
        } else if(key==="value"){
            filter.filter_value = value
        }
        updateNodeData(id, { filter });
    }

    return (
        <CustomNode title="Filter" id={id} input={`IN : ${nodeData?.data?.dataset?.length}`} output={`OP : ${data?.dataset?.length}`} {...props}>
            {nodeData?.id ? (
                <>
                    <div className='mt-2'>
                        <Label>Column name:</Label>
                        <Select onValueChange={handleColumnChange} value={nodeData?.data?.filter.filter_column}>
                            <SelectTrigger className="w-[260px] my-1 border-primary">
                                <SelectValue placeholder="Please select column" />
                            </SelectTrigger>
                            <SelectContent>
                                {nodeData?.data?.dataset?.length > 0 && Object.keys(nodeData?.data?.dataset?.[0]).map((el, index) => (
                                    <SelectItem value={el} key={index}>{el}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {nodeData?.data?.filter.filter_column && (
                        <>
                            <div className='mt-2'>
                                <Label>Condition:</Label>
                                <Select onValueChange={value => handleFilterChange("condition", value)}>
                                    <SelectTrigger className="w-[260px] my-1 border-primary">
                                        <SelectValue placeholder="Select condition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nodeData?.data?.filter?.filter_list.map((each:any, index:number) => (
                                            <SelectItem key={index} value={each}>{each.replace(/_/g, ' ')}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {nodeData?.data?.filter?.filter_key && (
                                <div className='mt-2'>
                                    <Input
                                        type={nodeData?.data?.filter?.type}
                                        value={nodeData?.data?.filter?.filter_value}
                                        onChange={e => handleFilterChange("value", e.target.value)}
                                        className='my-2 min-w-64 border-2 border-primary'
                                    />
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <p className='my-2 min-w-64 text-muted-foreground'>Please attach a valid dataset</p>
            )}
        </CustomNode>
    );
};

export default memo(FilterNode);
