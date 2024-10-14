export default function TableControlBarInputSearch({typeTag, nameTag, placeholderTag, value, filterByQuotes, filterByPapers}: any) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, field?: string) => {
    if (event.key == 'Enter') {
      let input = event.target as HTMLInputElement

      if (nameTag == 'note-filter') filterByQuotes(input.value)
      else filterByPapers(input.value)
    }
  }

  return (
    <div className='relative mr-4 mt-4"'>
      <input 
        name={nameTag} id={nameTag} type={typeTag} placeholder={placeholderTag} value={value} 
        onKeyDown={handleKeyDown}
        className="peer
          w-full h-full p-2 pt-4
          border border-pale-800 rounded-md
          focus:border-0 focus:border-b-2 focus:border-b-pale-800 focus:outline-none 
          bg-white-0 placeholder-transparent
          text-base text-pale-800
          transition-all
        "
      />
      <label htmlFor={nameTag}
        className="absolute -top-1 left-0 mt-1 px-2
          text-pale-700 text-xs italic
          transition-all
          peer-placeholder-shown:text-base
          peer-placeholder-shown:top-0
          peer-focus:-top-1
          peer-focus:text-xs
        "
      >{placeholderTag}</label>
    </div>
  )
}