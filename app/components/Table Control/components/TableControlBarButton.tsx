export default function TableControlBarButton({ functionParam, buttonLabel } : any) {
    return (
        <button 
            className="hover:text-gray-400 bg-slate-50 h-full px-5 rounded-md active:text-white transition-all mr-4 border border-gray-400 text-xs lg:text-base" 
            onClick={functionParam}
        >
            {buttonLabel}
        </button>
    )
}