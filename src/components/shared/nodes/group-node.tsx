/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useEffect } from "react";
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
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

interface GroupNodeProps {
  id: string;
  data: any;
  [key: string]: any;
}

const createWorker = createWorkerFactory(() => import('../../../lib/worker'));




const GroupNode = ({ id, data, ...props }: GroupNodeProps) => {
  // const [groupByFilter, setGroupByFilter] = useState("");
  const { updateNodeData } = useReactFlow();
  const worker = useWorker(createWorker);
  const connectionsTarget = useHandleConnections({
    type: "target",
    id: `target_${id}`,
  });
  const nodeData: any = useNodesData(connectionsTarget?.[0]?.source);

  useEffect(() => {
    if (nodeData?.data?.dataset) {
      updateNodeData(id, { dataset: nodeData.data.dataset });
    }
  }, [nodeData?.data]);

  useEffect(() => {
    if (data?.group_by_filter && nodeData?.data?.dataset) {
      (async () => {
        const filteredData = await worker.groupByKey(nodeData.data.dataset, data?.group_by_filter);
        updateNodeData(id, { dataset: filteredData });
      })()
    }
  }, [data?.group_by_filter]);

  const handleGroupBy = useCallback((val: string) => {
    updateNodeData(id, { group_by_filter: val });
  }, [])



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
          <Select onValueChange={(e: any) => handleGroupBy(e)} value={data?.group_by_filter}>
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