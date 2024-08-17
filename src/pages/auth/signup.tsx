
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Workflow } from "lucide-react"
import { Link } from "react-router-dom"

export default function Signup() {
    return (
        <div className="w-full">
        <div className="flex items-center justify-center py-24">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold flex flex-row gap-2 mb-4"><Workflow size={38} />
              Signup</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to signup to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" required placeholder="********" />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Confirm Password</Label>
                            </div>
                            <Input id="confirm_password" type="password" required placeholder="********" />
                        </div>
                        <Button type="submit" className="w-full">
                            Signup
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                            login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
