/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import { Button } from "./button";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { ScrollArea } from "./scroll-area";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { useState } from "react";

const blockElement: any = [
    {
        "file_name": "File",
        "description": "Handles csv, json, geojson or topojson files.",
        "input_text": "Input: -",
        "output_text": "Output: Dataset, Geojson",
        "type": "input",
        "disabled": false,
        "key": "file_upload",
    },
    {
        "file_name": "Sheets",
        "description": "Loads data from google sheets.",
        "input_text": "Input: -",
        "output_text": "Output: Dataset",
        "type": "input",
        "disabled": false,
        "key": "google_sheet"
    },
    {
        "file_name": "Example Data",
        "description": "Some example data for playing around with data blocks.",
        "input_text": "Input: -",
        "output_text": "Output: Dataset, Geojson",
        "type": "input",
        "disabled": false,
        "key": "example_data"
    },
    {
        "file_name": "Filter",
        "description": "Groups a data set based on a given column name.",
        "input_text": "Input: Dataset",
        "output_text": "Output: Dataset",
        "type": "transform",
        "disabled": false,
        "key": "filter_node"
    },
    {
        "file_name": "Merge",
        "description": "Merges two data sets based on the given column name.",
        "input_text": "Input: Dataset, Geojson",
        "output_text": "Output: Dataset",
        "type": "transform",
        "disabled": false,
        "key": "merge_by_key_node"
    },
    {
        "file_name": "Group",
        "description": "Groups a data set based on a given column name.",
        "input_text": "Input: Dataset, Geojson",
        "output_text": "Output: Dataset",
        "type": "transform",
        "disabled": false,
        "key": "group_node"
    },
    {
        "file_name": "Slice",
        "description": "Slices a data set based on indices.",
        "input_text": "Input: Dataset, Array",
        "output_text": "Output: Dataset",
        "type": "transform",
        "disabled": false,
        "key": "slice_node"
    },
    {
        "file_name": "Sort",
        "description": "Sorts data based on a given column.",
        "input_text": "Input: Dataset",
        "output_text": "Output: Dataset",
        "type": "transform",
        "disabled": false,
        "key": "slice_node"
    },

    {
        "file_name": "Javascript",
        "description": "The most powerful node! Takes two inputs (can be everything) and lets you transform it with Javascript.",
        "input_text": "Input: All types",
        "output_text": "Output: All types",
        "type": "transform",
        "disabled": false,
        "key": "js_node"
    },

    {
        "file_name": "Barchart",
        "description": "Displays a bar chart of given x and y column names.",
        "input_text": "Input: Dataset",
        "output_text": "Output: Dataset",
        "type": "visualization",
        "disabled": false,
        "key": "bar_chart_node"
    },
    {
        "file_name": "Stats",
        "description": "Gives you min, max, avg, mean, and count of a given column name.",
        "input_text": "Input: Dataset",
        "output_text": "Output: -",
        "type": "other",
        "disabled": false,
        "key": "stats_node"
    },
    {
        "file_name": "Markdown",
        "description": "Lets you write some markdown.",
        "input_text": "Input: -",
        "output_text": "Output: -",
        "type": "other",
        "disabled": false,
        "key": "textarea_node"
    },
    {
        "file_name": "Export",
        "description": "Lets you export data as CSV, JSON, or GeoJSON.",
        "input_text": "Input: Dataset",
        "output_text": "Output: Dataset",
        "type": "other",
        "disabled": false,
        "key": "export_node"
    }
]


interface BlocksListProps {
    onAction?: (value: any) => void;
}

function BlocksList({ onAction }: BlocksListProps) {
    const [currentTab, setCurrentTab] = useState<any>("input");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = (element: any) => {
        if (typeof onAction === "function") onAction(element);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"default"} className="md:ml-4" onClick={() => { setIsOpen(true); setCurrentTab("input") }}>
                    <Plus size={16} className="mr-2" /> Block
                </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Blocks</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="input" className="w-full" onValueChange={val => setCurrentTab(val)}>
                    <TabsList>
                        <TabsTrigger value="input" className="text-xs">INPUT</TabsTrigger>
                        <TabsTrigger value="transform" className="text-xs">TRANSFORM</TabsTrigger>
                        <TabsTrigger value="visualization" className="text-xs">VISUALIZATION</TabsTrigger>
                        <TabsTrigger value="other" className="text-xs">OTHER</TabsTrigger>
                    </TabsList>
                </Tabs>
                <ScrollArea className="h-[540px] w-full gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-3">
                        {blockElement.filter((each: any) => (each.type === currentTab) && !each.disabled).map((el: any, index: number) => (
                            <Card key={index} className="w-full cursor-pointer hover:bg-secondary" onClick={() => handleClick(el)}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{el.file_name}</CardTitle>
                                    <CardDescription>
                                        {el.description}
                                    </CardDescription>
                                    <p className="text-xs !mt-[30px] text-muted-foreground font-semibold">{el.input_text}</p>
                                    <p className="text-xs text-muted-foreground font-semibold">{el.output_text}</p>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default BlocksList;