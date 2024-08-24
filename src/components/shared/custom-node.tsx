/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import { Position } from '@xyflow/react';
import CustomHandle from './custom-handle';
import { GripVertical } from 'lucide-react';



const CustomNode = ({ id = "", children, enableTarget = true, enableSource = true, enableSecondTarget = false, input = "", output = "", title }: any) => {
    return (
        <>
            <div className={`bg-muted min-w-44 min-h-24 rounded-sm border-2 border-neutral-600 active:border-gray-300 ${enableTarget && "border-l-[12px]"} ${enableSource && "border-r-[12px]"}`}>
                {enableTarget && <CustomHandle
                    type="target"
                    position={Position.Left}
                    connectionCount={1}
                    id={"target_" + id}
                    style={{ bottom: -5 }}
                />}
                {enableSecondTarget && <CustomHandle
                    type="target"
                    position={Position.Left}
                    connectionCount={1}
                    id={"target_2_" + id}
                    style={{ top: "auto", bottom: 8 }}
                />}
                {enableSource && <CustomHandle
                    type="source"
                    position={Position.Right}
                    connectionCount={100}
                    id={"source_" + id}
                />}

                <div className='text-sm p-[4px] flex flex-row border-b-2 border-neutral-600'> <GripVertical size={12} className='self-center' />{title}</div>
                <div className='p-4'>{children}</div>
            </div>
            <div className='flex flex-row justify-between'>
                {input && <p className='text-xs mt-1 text-muted-foreground ml-1'>{input}</p>}
                {output && <p className='text-xs mt-1 text-muted-foreground mr-1'>{output}</p>}
            </div>
        </>
    );
};

export default memo(CustomNode);