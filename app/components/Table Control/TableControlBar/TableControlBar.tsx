import TableControlBarInputSearch from "../components/TableControlBarInputSearch";

export default function TableControlBar({ toggleAllActivated, handleToggleAll, handleGenerateBatchCitations, handleCopyQuotes, filterByQuotes, filterByPapers }: any) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter') {
      let input = event.target as HTMLInputElement

      filterByQuotes(input.value)
    }
  }
  
  return (
    <div className="flex flex-row w-full h-8 mt-4 -mb-8">
      {/* <button 
        className="hover:text-gray-400 bg-slate-50 h-full px-5 rounded-md active:text-white transition-all mr-4 border border-gray-400" 
        onClick={handleToggleAll}
      >
        {!toggleAllActivated ? <>Unselect all</> : <>Select all</>}
        
      </button> */}

      <button 
        className="hover:text-gray-400 bg-slate-50 h-full px-5 rounded-md active:text-white transition-all mr-4 border border-gray-400" 
        onClick={handleGenerateBatchCitations}
      >
        Copy selected citations
      </button>

      <button 
        className="hover:text-gray-400 bg-slate-50 h-full px-5 rounded-md active:text-white transition-all mr-4 border border-gray-400" 
        onClick={handleCopyQuotes}
      >
        Copy selected quotes
      </button>
      
      <TableControlBarInputSearch typeTag="text" nameTag="note-filter" placeholderTag="Filter by quotes" filterByQuotes={filterByQuotes} />
      <TableControlBarInputSearch typeTag="text" nameTag="paper-filter" placeholderTag="Filter by paper name" filterByPapers={filterByPapers} />
      
    </div>
  )
}