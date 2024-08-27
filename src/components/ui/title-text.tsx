import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Workflow } from 'lucide-react';
import { useAuth } from '@/lib/auth-provider';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import toast from 'react-hot-toast';
import authService from '@/appwrite/auth';
import { useNavigate } from 'react-router-dom';

interface TitleTextProps {
    text: string;
}

const extractNameFromEmail = (email: string): string => {
    if (!email) return '';

    // Extract the part before '@'
    const namePart = email.split('@')[0];

    // Capitalize the first letter of each word if needed (e.g., for names with periods or hyphens)
    const name = namePart
        .split(/[._-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return name;
};

const TitleText: React.FC<TitleTextProps> = ({ text }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {    
        try {
            await toast.promise(
                authService.logout(),
                {
                    loading: 'Logging out...',
                    success: <b>Logged out!</b>,
                    error: <b>Failed to log out.</b>,
                }
            );
            navigate("/login"); // Navigate only if logout is successful
        } catch (err) {
            toast.error("Failed to logout.");
            console.error(err);
        }
    }


    const redirectToFeedback=()=>{
        try{
            window.open( import.meta.env.VITE_TALLY_FORM_ID,"_blank") //Paste your form here
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div
            className="text-2xl z-20 font-semibold top-10 mb-16 sticky "
        >
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-2 self-center'>
                    <Workflow size={36} color=' rgb(156 163 175)' />

                    <span className="font-bold text-gray-400 mr-2">
                        XlFlow
                    </span>
                    <span className='hidden md:block'>/ {text}</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} className='md:mr-12  flex flex-row gap-2 py-6 px-3 rounded-md bg-muted/40 self-center'>
                            <div className='self-center gap-2'>
                                <p className='text-sm text-muted-foreground text-right mt-[2px]'>{extractNameFromEmail(user?.email)}</p>
                                <p className='text-[10px] text-right leading-4 text-muted-foreground font-thin'>{user?.email}</p>
                            </div>
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src="https://github.com/shcn.png" alt="@user" />
                                <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={redirectToFeedback}>Feedback</DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    );
};

export default TitleText;
