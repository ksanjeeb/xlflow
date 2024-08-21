/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from 'react';
import CustomNode from '../custom-node';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function SortNode({ ...props }: any) {
    const [dataset] = useState([  {
        "country": "Afghanistan",
        "population": "Many",
        "life expectancy": 58.7,
        "income": 1870
      },
      {
        "country": "Albania",
        "population": 2930000,
        "life expectancy": 78,
        "income": 12400
      },]);
    const [sort, setSort] = useState({ column_name: "", order: "" })

    return (
        <CustomNode title="Sort" {...props}>
            {dataset.length > 0 ? <>
                <div className='mt-2'>
                    <Label>Column name:</Label>
                    <Select onValueChange={(e) => setSort({ ...sort, column_name: e })} value={sort.column_name}>
                        <SelectTrigger className="w-[260px] my-1 border-primary">
                            <SelectValue placeholder="Please select column" />
                        </SelectTrigger>
                        <SelectContent>
                            {dataset.length > 0 && Object.keys(dataset[0])?.map((el: string, i: number) => (
                                <SelectItem key={i} value={el}>{el}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='mt-2'>
                    <Label>Order:</Label>
                    <Select onValueChange={(e) => setSort({ ...sort, order: e })} value={sort.order}>
                        <SelectTrigger className="w-[260px] my-1 border-primary">
                            <SelectValue placeholder="Select order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ascending">Ascending</SelectItem>
                            <SelectItem value="descending">Descending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </> : <p className='my-2 min-w-64 text-muted-foreground'>Please attach valid dataset</p>}

        </CustomNode>
    );
}

export default memo(SortNode);