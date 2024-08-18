/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import { Position } from '@xyflow/react';
import CustomHandle from './custom-handle';
import { GripVertical } from 'lucide-react';



const CustomNode = ({ children, enableTarget = true, enableSource = true,title, ...props }: any) => {
    return (
        <div className={`bg-muted min-w-44 min-h-24 rounded-sm border-2 border-neutral-600 active:border-gray-300 ${enableTarget && "border-l-[12px]"} ${enableSource && "border-r-[12px]"}`}
            onClick={props.data.handleAction}>
            {enableTarget && <CustomHandle
                type="target"
                position={Position.Left}
                connectionCount={1}
            />}
            {enableSource && <CustomHandle
                type="source"
                position={Position.Right}
                connectionCount={100}
            />}
            <div className='text-sm p-[4px] flex flex-row border-b-2 border-neutral-600'> <GripVertical size={12} className='self-center'/>{title}</div>
            <div className='p-4'>{children}</div>
        </div>
    );
};

export default memo(CustomNode);