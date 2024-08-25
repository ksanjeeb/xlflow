/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import {
    DataEditor,
    GridCell,
    GridCellKind,
    GridColumn,
    Item
} from "@glideapps/glide-data-grid";

function CustomTable({ data = [], ...props }: any) {
    const getCellContent = useCallback((cell: Item): GridCell => {
        if (data && data.length > 0) {
            const [col, row] = cell;
            const dataRow = data[row];
            const indexes: any = Object.keys(data[0]);
            const d = dataRow[indexes[col]];
            return {
                kind: GridCellKind.Text,
                allowOverlay: false,
                displayData: d,
                data: d,
            };
        }
        return {
            kind: GridCellKind.Text,
            allowOverlay: false,
            displayData: "",
            data: "",
        };
    }, [data]);

    const columns: GridColumn[] = data && data.length > 0 ? Object.keys(data[0]).map((el: any) => ({ title: el, id: el })) : [];

    return (
        <DataEditor
            getCellContent={getCellContent}
            columns={columns}
            rows={data.length}
            {...props}
            className="w-full"
        />
    );
}

export default CustomTable;