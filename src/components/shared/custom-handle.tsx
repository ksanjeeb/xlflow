/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, useHandleConnections } from '@xyflow/react';

const CustomHandle = (props: any) => {
  const connections = useHandleConnections({
    type: props.type,
  });

  const DEFAULT_HANDLE_STYLE = {
    width: 15,
    height: 15,
    bottom: -5,
  };

  return (
    <Handle
      {...props}
      style={{ ...DEFAULT_HANDLE_STYLE, ...props.style }}
      isConnectable={connections.length < props.connectionCount}
    />
  );
};

export default CustomHandle;