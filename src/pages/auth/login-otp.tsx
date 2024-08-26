
import authService from "@/appwrite/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Workflow } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function LoginOTP() {
    const [user, setUser] = useState({ mail: "", otp: "", id: "" });
    const [enableOTP, setEnableOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const sendOTP = async () => {
        try {
            setLoading(true)
            if (!user.mail) {
                toast.error("Please provide mail.");
                return;
            }
            const response = await authService.sendEmailOTP({ email: user.mail });
            setUser({ ...user, id: response?.userId })
            response?.userId && setEnableOTP(true);
        } catch (err) {
            console.error(err)
            toast.error("Failed :" + err)
        } finally {
            setLoading(false)
        }
    };

    const verifyOTP = async () => {
        try {
            setLoading(true)
            if (!user.otp) {
                toast.error("Please provide otp.");
                return;
            }
            const sessionToken = await authService.verifyOTP({ userID: user.id, secret: user.otp });
            if (sessionToken.userId) {
                navigate("/dashboard")
            }
        } catch (err) {
            console.error(err)
            toast.error("Failed :" + err)
        } finally {
            setLoading(false)
        }
    };



    return (
        <div className="w-full">
            <div className="flex items-center justify-center py-24">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold flex flex-row gap-2 mb-4"><Workflow size={38} />
                            Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        {!enableOTP ? <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={user.mail}
                                onChange={(e) => setUser({ ...user, mail: e.target.value })}
                            />
                        </div> :
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">OTP</Label>
                                </div>
                                <Input id="password" type="otp" required
                                    value={user.otp}
                                    onChange={(e) => setUser({ ...user, otp: e.target.value })}
                                />
                            </div>}
                        {!enableOTP ? <Button type="submit" className="w-full" onClick={sendOTP} disabled={loading}>
                            {loading ? "Sending..." : "Send OTP"}
                        </Button> : <Button type="submit" className="w-full" onClick={verifyOTP} disabled={loading}>
                            {loading ? "Verifying..." : "Verify"}
                        </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
