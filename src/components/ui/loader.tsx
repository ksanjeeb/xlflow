// Loader.tsx

const Loader = () => {
    return (
        <div className="grid place-items-center h-screen w-screen bg-muted/40">
            <div className="flex items-center space-x-2 ">
                <span className="inline-block w-[3px] h-7 bg-white/50 rounded-[10px] animate-scale-up"></span>
                <span className="inline-block w-[3px] h-10 bg-white/50 rounded-[10px] animate-scale-up"></span>
                <span className="inline-block w-[3px] h-[70px] bg-white/50 rounded-[10px] animate-scale-up animation-delay-250"></span>
                <span className="inline-block w-[3px] h-10 bg-white/50 rounded-[10px] animate-scale-up animation-delay-500"></span>
                <span className="inline-block w-[3px] h-7 bg-white/50 rounded-[10px] animate-scale-up"></span>
            </div>
        </div>
    );
};

export default Loader;
