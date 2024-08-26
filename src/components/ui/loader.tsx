const Loader = ({ gradient = false }: { gradient?: boolean }) => {
    return (
        <div className={`absolute inset-0 grid place-items-center z-40 ${gradient ? 'bg-muted/40 backdrop-blur-xs' : 'bg-muted/40 backdrop-blur-none'} pointer-events-none`}>
            <div className="flex items-center space-x-2">
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