export default function TableControlBar() {
  return (
    <div className="flex flex-row w-full h-8 mt-10 -mb-8 bg-orange-300">
      <button className="hover:text-gray-400 bg-slate-50 h-full px-5 rounded-md active:text-white transition-all mr-4 border border-gray-400" onClick={() => handleToggleAll()} >
        Select all
      </button>
      <div>      
       
      </div>
    </div>
  )
}