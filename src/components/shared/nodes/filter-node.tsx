/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState, useCallback } from 'react';
import CustomNode from '../custom-node';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { useHandleConnections, useNodesData, useReactFlow } from '@xyflow/react';

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

const applyFilter = (
    data: any[],
    filterKey: string,
    filterValue: string | number,
    filterColumn: string
): any[] => {
    if (!filterKey || !filterValue || !filterColumn) return data;

    switch (filterKey) {
        case "text_is_exactly":
            return data.filter(item => item[filterColumn] === filterValue);
        case "text_is_not_exactly":
            return data.filter(item => item[filterColumn] !== filterValue);
        case "text_includes":
            return data.filter(item => item[filterColumn]?.includes(filterValue));
        case "text_does_not_include":
            return data.filter(item => !item[filterColumn]?.includes(filterValue));
        case "data_is_not_empty_or_null":
            return data.filter(item => item[filterColumn] !== null && item[filterColumn] !== '');
        case "data_matches_regex":
            // eslint-disable-next-line no-case-declarations
            const regex = new RegExp(filterValue as string);
            return data.filter(item => regex.test(item[filterColumn]));
        case "number_equals":
            return data.filter(item => item[filterColumn] === Number(filterValue));
        case "number_is_greater_than":
            return data.filter(item => item[filterColumn] > Number(filterValue));
        case "number_is_greater_than_or_equals":
            return data.filter(item => item[filterColumn] >= Number(filterValue));
        case "number_is_less_than":
            return data.filter(item => item[filterColumn] < Number(filterValue));
        case "number_is_less_than_or_equals":
            return data.filter(item => item[filterColumn] <= Number(filterValue));
        default:
            return data;
    }
};

const initialFilter:FilterState ={
    filter_column: "",
    filter_list: [],
    type: "",
    filter_key: "",
    filter_value: "",
}


const FilterNode = ({ id, ...props }: { id: string; [key: string]: any }) => {
    const [dataset, setDataset] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const { updateNodeData } = useReactFlow();
    const [filter, setFilter] = useState<FilterState>(initialFilter);

    const connectionsTarget = useHandleConnections({ type: 'target', id: `target_${id}` });
    const nodeData = useNodesData(connectionsTarget?.[0]?.source);

    useEffect(() => {
        const data:any = nodeData?.data?.dataset || [];
        setDataset(data);
        setFilteredData(data);
        setFilter(initialFilter);
    }, [nodeData]);

    useEffect(() => {
            const data_filtered = applyFilter(dataset, filter.filter_key, filter.filter_value, filter.filter_column);
            setFilteredData(data_filtered);
            updateNodeData(id, { dataset: data_filtered });
    }, [filter]);

    const handleColumnChange = useCallback((value: string) => {
        const columnValue = dataset[0]?.[value];
        const isNumber = typeof columnValue === "number";
        setFilter({
            filter_column: value,
            filter_list: isNumber ? num_types : text_type,
            type: isNumber ? "number" : "text",
            filter_key: "",
            filter_value: "",
        });
    }, [dataset]);

    return (
        <CustomNode title="Filter" id={id} input={`IN : ${dataset.length}`} output={`OP : ${filteredData.length}`} {...props}>
            {nodeData?.id ? (
                <>
                    <div className='mt-2'>
                        <Label>Column name:</Label>
                        <Select onValueChange={handleColumnChange} value={filter.filter_column}>
                            <SelectTrigger className="w-[260px] my-1 border-primary">
                                <SelectValue placeholder="Please select column" />
                            </SelectTrigger>
                            <SelectContent>
                                {dataset.length > 0 && Object.keys(dataset[0]).map((el, index) => (
                                    <SelectItem value={el} key={index}>{el}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {filter.filter_column && (
                        <>
                            <div className='mt-2'>
                                <Label>Condition:</Label>
                                <Select onValueChange={value => setFilter(prev => ({ ...prev, filter_key: value, filter_value:""}))}>
                                    <SelectTrigger className="w-[260px] my-1 border-primary">
                                        <SelectValue placeholder="Select condition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filter.filter_list.map((each, index) => (
                                            <SelectItem key={index} value={each}>{each.replace(/_/g, ' ')}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {filter.filter_key && (
                                <div className='mt-2'>
                                    <Input
                                        type={filter.type}
                                        value={filter.filter_value}
                                        onChange={e => setFilter(prev => ({ ...prev, filter_value: e.target.value }))}
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
