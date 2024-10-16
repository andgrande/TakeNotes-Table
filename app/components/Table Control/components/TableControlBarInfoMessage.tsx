export default function TableControlBarInfoMessage({ filteredCount, totalCount }: any) {
    return (
        <div className="flex flex-row h-8 align-center justify-center">
            <span className="italic text-sm self-center">Showing 
                <span className="font-medium"> {filteredCount} </span> 
                 of 
                <span className="font-medium"> {totalCount} </span> 
                notes.
            </span>
        </div>
    )
}