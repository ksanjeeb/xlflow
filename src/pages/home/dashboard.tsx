/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TitleText from "@/components/ui/title-text";
import { Plus } from "lucide-react";
import FlowImage from "../../assets/workflow.svg";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    return (
        <>
            <TitleText text={" Dashboard"} />
            <div className="flex flex-row flex-wrap gap-4">
                <Card className="xl:w-[600px] lg:w-[420px] w-[350px] border-dotted border-4 border-gray-700 bg-inherit  hover:bg-card cursor-pointer" onClick={() => navigate("/editor/new?back=dashboard")}>
                    <CardContent className="flex items-center justify-center h-full  bg-opacity-50">
                        <p className="text-gray-700 font-bold text-3xl flex flex-row gap-1">
                            <Plus className="self-center w-8 h-8" />
                            Add Workflow</p>
                    </CardContent>
                </Card>
                {[...Array(55)].map((each: any, index: number) => (<Card className="xl:w-[600px] lg:w-[420px] w-[350px] -p-2 " key={index}>
                    <CardHeader>
                        <CardTitle className="text-xl">Workflow {Date.now()}</CardTitle>
                        <CardDescription>No description.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src={FlowImage} alt="My Image" className="w-full h-32 rounded-md object-cover blur-lg" />

                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => navigate("/editor/" + (each?.id || "new") + "?back=dashboard")}>View</Button>
                    </CardFooter>
                </Card>))}
            </div>
        </>
    );
}

export default Dashboard;