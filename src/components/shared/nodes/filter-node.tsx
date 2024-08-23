/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from 'react';
import CustomNode from '../custom-node';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { useHandleConnections, useNodesData } from '@xyflow/react';

type FilterState = {
    filter_column: string;
    filter_list: string[];
    type: string;
    filter_key: string;
    filter_value: string;
};

type DatasetItem = { [key: string]: any };

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




const FilterNode = ({ id, ...props }: any) => {
    const [dataset] = useState<DatasetItem[]>([]);

    const [filter, setFilter] = useState<FilterState>({
        filter_column: "",
        filter_list: [],
        type: "",
        filter_key: "",
        filter_value: "",
    });

    const connectionsTarget = useHandleConnections({
        type: 'target',
        id: `target_${id}`,
    });

    const nodeData = useNodesData(connectionsTarget?.[0]?.source);

    console.log(id, connectionsTarget, nodeData)

  
    const handleColumnChange = (value: string) => {
        const columnValue = dataset[0]?.[value];
        const list = typeof columnValue === "number" ? num_types : text_type;
        const type = typeof columnValue === "number" ? "number" : "text";
        setFilter({
            ...filter,
            type,
            filter_column: value,
            filter_list: list,
            filter_key: "",
            filter_value: "",
        });
    };

    return (
        <CustomNode title="Filter" id={id} {...props}>
            {dataset.length > 0 ? <>
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
                {dataset.length > 0 && filter.filter_column && (
                    <div className='mt-2'>
                        <Label>Condition:</Label>
                        <Select onValueChange={(value) => setFilter({ ...filter, filter_key: value })}>
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
                )}
                {dataset.length > 0 && filter.filter_key && (
                    <div className='mt-2'>
                        <Input
                            type={filter.type}
                            value={filter.filter_value}
                            onChange={e => setFilter({ ...filter, filter_value: e.target.value })}
                            className='my-2 min-w-64 border-2 border-primary'
                        />
                    </div>
                )}
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}
        </CustomNode>
    );
};

export default memo(FilterNode);
