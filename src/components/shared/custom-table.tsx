/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import {
    DataEditor,
    GridCellKind,
    GridColumn,
    Item,
    useTheme
} from "@glideapps/glide-data-grid";

interface CustomTableProps {
    data: Record<string, any>[];
    [key: string]: any;
}

const darkTheme = {
    bgCell: "#1e1e1e",
    textDark: "#ffffff",
    bgHeader: "#2e2e2e",
    textHeader: "#cccccc",
    accentColor: "#007acc",
    bgHeaderHovered: "#3e3e3e",
    bgHeaderHasFocus:"#3e3e3e",
};

function CustomTable({ data = [], ...props }: CustomTableProps) {
    const theme = useTheme();

    const columns: GridColumn[] = data.length > 0
        ? Object.keys(data[0]).map((el: string) => ({ title: el, id: el ,filter:true }))
        : [];

    const getCellContent = useCallback((cell: Item) :any => {
        const [col, row] = cell;
        if (data && data.length > 0) {
            const dataRow = data[row];
            const indexes = Object.keys(data[0]);
            const d = dataRow[indexes[col]];
            return {
                kind: GridCellKind.Text,
                allowOverlay: false,
                displayData: d?.toString() || "",
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

    return (
        <div className="pb-2 h-full w-full overflow-x-scroll" {...props}>
            {data.length > 0 ? (
                <DataEditor
                    getCellContent={getCellContent}
                    columns={columns}
                    rows={data.length}
                    className="w-full"
                    theme={{...theme, ...darkTheme}}
                />
            ) : (
                <p className="text-xs font-medium text-muted-foreground p-2">
                    No data. Please select a row to display the table.
                </p>
            )}
        </div>
    );
}

export default CustomTable;
