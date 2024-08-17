/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TitleText from "@/components/ui/title-text";
import { Plus } from "lucide-react";

function Dashboard() {
    return (
        <>
            <TitleText text={"Dashboard"} />
            <div className="flex flex-row flex-wrap gap-4">
                <Card className="w-[375px] border-dotted border-4 border-gray-700 bg-inherit  hover:bg-card cursor-pointer">
                    <CardContent className="flex items-center justify-center h-full  bg-opacity-50">
                        <p className="text-gray-700 font-bold text-3xl flex flex-row gap-1">
                            <Plus className="self-center w-8 h-8"/>
                            Add project</p>
                    </CardContent>
                </Card>
                {[...Array(55)].map((each: any, index: number) => (<Card className="w-[375px]" key={index}>
                    <CardHeader>
                        <CardTitle className="text-xl">Deepak's House</CardTitle>
                        <CardDescription>AR Tour for Deepak House.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src="https://i.postimg.cc/FsfmhqcQ/gg.png" alt="My Image" className="w-full h-32 rounded-md object-cover" />

                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline">Editor</Button>
                        <Button>View</Button>
                    </CardFooter>
                </Card>))}
            </div>
        </>
    );
}

export default Dashboard;