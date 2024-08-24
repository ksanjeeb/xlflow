/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from "react";
import CustomNode from "../custom-node";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { downloadJSON } from "@/lib/utils";

interface GroupNodeProps {
  id: string;
  data: any;
  [key: string]: any;
}


const groupByKey = (data: any, key: string) => {
  return data.reduce((result: { [key: string]:any }, item:any) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

const GroupNode = ({ id, data, ...props }: GroupNodeProps) => {
  const [groupByFilter, setGroupByFilter] = useState("");
  const { updateNodeData } = useReactFlow();

  const connectionsTarget = useHandleConnections({
    type: "target",
    id: `target_${id}`,
  });
  const nodeData:any = useNodesData(connectionsTarget?.[0]?.source);

  useEffect(() => {
    if (nodeData?.data?.dataset) {
      updateNodeData(id, { dataset: nodeData.data.dataset });
    }
  }, [nodeData?.data]);

  useEffect(() => {
    if (groupByFilter && nodeData?.data?.dataset) {
      const filteredData = groupByKey(nodeData.data.dataset, groupByFilter);
      updateNodeData(id, { dataset: filteredData });
    }
  }, [groupByFilter]);



  const renderOptions = () => {
    if (!nodeData?.data?.dataset?.length) return null;
    return Object.keys(nodeData?.data?.dataset[0]).map((el: string, i: number) => (
      <SelectItem key={i} value={el}>
        {el}
      </SelectItem>
    ));
  };

  return (
    <CustomNode title="Group" enableSource={false} id={id} {...props}>
      {nodeData?.data?.dataset?.length > 0 ? (
        <>
          <Label>Column name:</Label>
          <Select onValueChange={(e: any) => setGroupByFilter(e)} value={groupByFilter}>
            <SelectTrigger className="w-[260px] my-1 border-primary">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>{renderOptions()}</SelectContent>
          </Select>
          <Button
            onClick={() => downloadJSON(data?.dataset)}
            className="mt-2 px-2 py-[2px] text-xs"
          >
            Download json
          </Button>
        </>
      ) : (
        <p className="my-2 min-w-64 text-muted-foreground">
          Please attach valid dataset
        </p>
      )}
    </CustomNode>
  );
};

export default memo(GroupNode);