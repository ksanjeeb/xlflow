/* eslint-disable @typescript-eslint/no-explicit-any */

import authService from "@/appwrite/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
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
            toast.success("OTP has been sent to your email.");
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
        } catch (err:any) {
            console.error(err)
            toast.error("Failed :" + err?.message || " Not valid.")
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
                        <p className="text-left text-muted-foreground">
                            {!enableOTP ? "Enter your email below to login to your account": "Please enter the OTP sent to your email."}
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
                                    <Label htmlFor="password">One-Time Password</Label>
                                </div>
                                <InputOTP maxLength={6} value={user.otp}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onChange={(value:any) => setUser({ ...user, otp: value })}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} className="w-14 h-12" />
                                        <InputOTPSlot index={1} className="w-14 h-12"/>
                                        <InputOTPSlot index={2} className="w-14 h-12"/>
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} className="w-14 h-12"/>
                                        <InputOTPSlot index={4} className="w-14 h-12"/>
                                        <InputOTPSlot index={5} className="w-14 h-12"/>
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>}
                        {!enableOTP ? <Button type="submit" className="w-full" onClick={sendOTP} disabled={loading}>
                            {loading ? "Verifying..." : "Login"}
                        </Button> : <Button type="submit" className="w-full" onClick={verifyOTP} disabled={loading}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
