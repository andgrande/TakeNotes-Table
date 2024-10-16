import TableControlBarButton from "../components/TableControlBarButton";
import TableControlBarInfoMessage from "../components/TableControlBarInfoMessage";
import TableControlBarInputSearch from "../components/TableControlBarInputSearch";

export default function TableControlBar({ toggleAllActivated, handleToggleAll, handleGenerateBatchCitations, handleCopyQuotes, filterByQuotes, filterByPapers, filteredCount, totalCount }: any) {  
  return (
    <div className="flex flex-row w-full h-8 mt-4 -mb-8">
      <TableControlBarButton functionParam={handleToggleAll} buttonLabel={toggleAllActivated ? 'Unselect all' : 'Select all'} />
      <TableControlBarButton functionParam={handleGenerateBatchCitations} buttonLabel="Copy selected citations" />
      <TableControlBarButton functionParam={handleCopyQuotes} buttonLabel="Copy selected quotes" />

      <TableControlBarInputSearch typeTag="text" nameTag="note-filter" placeholderTag="Filter by quotes" filterByQuotes={filterByQuotes} />
      <TableControlBarInputSearch typeTag="text" nameTag="paper-filter" placeholderTag="Filter by paper name" filterByPapers={filterByPapers} />
      
      <TableControlBarInfoMessage filteredCount={filteredCount} totalCount={totalCount} />
    </div>
  )
}