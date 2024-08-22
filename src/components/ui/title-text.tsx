import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Workflow } from 'lucide-react';

interface TitleTextProps {
    text: string;
}

const TitleText: React.FC<TitleTextProps> = ({ text }) => {


    return (
        <div
            className="text-lg md:text-2xl z-20 font-semibold top-10 mb-12 sticky"
        >
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-2'>
                    <Workflow size={36} color=' rgb(156 163 175)'/>

                    <span className="font-bold text-gray-400 mr-2">
                        XlFlow
                    </span>
                    / {text}
                </div>
                <div className='md:mr-12 mr-5'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default TitleText;
