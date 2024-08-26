/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TitleText from "@/components/ui/title-text";
import { Loader2, Plus } from "lucide-react";
import FlowImage from "../../assets/workflow.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import flowService from "@/appwrite/db";
import toast from "react-hot-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Dashboard() {
    const navigate = useNavigate();
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchWorkFlows();
    }, [])

    const fetchWorkFlows = async () => {
        try {
            setLoading(true);
            const response: any = await flowService.listFlow();
            setWorkflows(response?.documents || [])
        } catch (err: any) {
            toast.error("Failed to fetch :: " + err?.message)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }


    const handleDelete = async (info: any) => {
        try {
            setDeleting(true)
            await toast.promise(flowService.deleteFlow(info?.$id),
                {
                    loading: 'Deleting...',
                    success: () => `Successfully deleted.🔥`,
                    error: (err) => `This just happened: ${err.toString()}`,
                },
            )
            const temp = workflows.filter((each: any) => each.$id !== info?.$id)
            setWorkflows(temp)
        } catch (err: any) {
            toast.error("Failed to fetch :: " + err?.message)
            console.error(err)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <>
            <TitleText text={" Dashboard"} />
            {loading && <div className="flex flex-row gap-2 text-white my-4"><Loader2 className="animate-spin" /> Fetching...</div>}
            <div className="flex flex-row flex-wrap gap-4">
                <Card className="xl:w-[600px]  min-h-72 lg:w-[420px] w-[350px] border-dotted border-4 border-gray-700 bg-inherit  hover:bg-card cursor-pointer" onClick={() => navigate("/editor/new?back=dashboard")}>
                    <CardContent className="flex items-center justify-center h-full  bg-opacity-50">
                        <p className="text-gray-700 font-bold text-3xl flex flex-row gap-1">
                            <Plus className="self-center w-8 h-8" />
                            Add Workflow</p>
                    </CardContent>
                </Card>
                {workflows ? workflows?.map((each: any, index: number) => (<Card className="xl:w-[600px] lg:w-[420px] w-[350px] -p-2 " key={index}>
                    <CardHeader>
                        <CardTitle className="text-xl">{each?.name || "Unnamed Workflow"}</CardTitle>
                        <CardDescription>{each?.description || "No description."}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src={FlowImage} alt="My Image" className="w-full h-32 rounded-md object-cover" />

                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-700">Delete</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Delete workflow</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete this item? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="name" className="text-muted-foreground">
                                        Please type <strong className="text-white">{each.name}</strong> to delete.
                                    </Label>
                                    <Input id="name" className="col-span-3" value={deleteInfo} onChange={(e: any) => setDeleteInfo(e.target.value)} />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit" variant={"destructive"} onClick={() => handleDelete(each)} disabled={deleteInfo !== each?.name || deleting}>{deleting ? "Removing..." : "Delete Workflow"}</Button>
                                    </DialogClose >
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Button variant="secondary" onClick={() => navigate("/editor/" + (each?.$id || "new") + "?back=dashboard")}>View workflow</Button>
                    </CardFooter>
                </Card>)) : (<p className="text-sm text-muted-foreground font-medium">No workflows.</p>)}
            </div>
        </>
    );
}

export default Dashboard;