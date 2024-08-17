import React from 'react';

interface TitleTextProps {
    text: string;
}

const TitleText: React.FC<TitleTextProps> = ({ text }) => {


    return (
        <p
            className="text-2xl z-20 font-semibold lg:top-6 mb-4 sticky"
        >
            {text}
        </p>
    );
};

export default TitleText;
