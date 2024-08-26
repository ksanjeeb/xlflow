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

const createWorker = createWorkerFactory(() => import('../../../lib/worker'));

const initialFilter: FilterState = {
    filter_column: "",
    filter_list: [],
    type: "",
    filter_key: "",
    filter_value: "",
};

const FilterNode = ({ id, data, ...props }: { id: string; [key: string]: any }) => {
    const { updateNodeData } = useReactFlow();

    const connectionsTarget = useHandleConnections({ type: 'target', id: `target_${id}` });
    const nodeData: any = useNodesData(connectionsTarget?.[0]?.source);
    const worker = useWorker(createWorker);

    useEffect(() => {
        const dataset: any = nodeData?.data?.dataset || [];
        updateNodeData(id, { dataset: dataset, filter:data?.filter || initialFilter });
    }, [nodeData?.data?.dataset]);

    useEffect(() => {
        (async () => {
            if (data?.filter?.filter_key && data?.filter?.filter_column) {
                const data_filtered = await worker.applyFilter(
                    nodeData?.data?.dataset,
                    data?.filter?.filter_key,
                    data?.filter?.filter_value,
                    data?.filter?.filter_column
                );
                updateNodeData(id, { dataset: data_filtered });
            }
        })();
    }, [data?.filter]);

    const handleColumnChange = useCallback((value: string) => {
        const columnValue = nodeData?.data?.dataset?.[0]?.[value];
        const isNumber = typeof columnValue === "number";
        const filter = {
            ...data?.filter,
            filter_column: value,
            filter_list: isNumber ? num_types : text_type,
            type: isNumber ? "number" : "text",
            filter_key: "",
            filter_value: "",
        };
        updateNodeData(id, { filter });
    }, [nodeData?.data?.dataset]);

    const handleFilterChange = useCallback((key: string, value: any) => {
        const filter = { ...data?.filter };
        if (key === "condition") {
            filter.filter_key = value;
            filter.filter_value = "";
        } else if (key === "value") {
            filter.filter_value = value;
        }
        updateNodeData(id, { filter });
    }, [data?.filter]);


    return (
        <CustomNode title="Filter" id={id} input={`IN : ${nodeData?.data?.dataset?.length}`} output={`OP : ${data?.dataset?.length}`} {...props}>
            {nodeData?.id ? (
                <>
                    <div className='mt-2'>
                        <Label>Column name:</Label>
                        <Select onValueChange={handleColumnChange} value={data?.filter?.filter_column}>
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
                    {data?.filter?.filter_column && (
                        <>
                            <div className='mt-2'>
                                <Label>Condition:</Label>
                                <Select onValueChange={value => handleFilterChange("condition", value)} value={data?.filter?.filter_key}>
                                    <SelectTrigger className="w-[260px] my-1 border-primary">
                                        <SelectValue placeholder="Select condition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data?.filter?.filter_list?.map((each: any, index: number) => (
                                            <SelectItem key={index} value={each}>{each.replace(/_/g, ' ')}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {data?.filter?.filter_key && (
                                <div className='mt-2'>
                                    <Input
                                        type={data?.filter?.type}
                                        value={data?.filter?.filter_value}
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
