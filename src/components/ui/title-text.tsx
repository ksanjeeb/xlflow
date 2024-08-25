import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Workflow } from 'lucide-react';
import { useAuth } from '@/lib/auth-provider';

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
    const { user } = useAuth()

    return (
        <div
            className="text-2xl z-20 font-semibold top-10 mb-12 sticky"
        >
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-2'>
                    <Workflow size={36} color=' rgb(156 163 175)' />

                    <span className="font-bold text-gray-400 mr-2">
                        XlFlow
                    </span>
                    <span className='hidden md:block'>/ {text}</span>
                </div>
                <div className='md:mr-12  flex flex-row gap-2'>
                    <div className='self-center gap-2'>
                        <p className='text-sm text-muted-foreground text-right mt-[2px]'>{extractNameFromEmail(user?.email)}</p>
                        <p className='text-[10px] text-right leading-2 text-muted-foreground font-thin'>{user?.email}</p>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                        <AvatarFallback>{user?.email}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default TitleText;
