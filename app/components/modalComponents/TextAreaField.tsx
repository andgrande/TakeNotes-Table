export default function TextAreaField ({nameTag, placeholderTag, rowsTag, value}: any) {
  
  return (
    <div className='relative'>
      <textarea rows={rowsTag} name={nameTag} id={nameTag} placeholder={placeholderTag} value={value} 
        className="peer
        w-full px-2 pt-4 pb-1 z-0
        border border-pale-800 rounded-md
        focus:border-0 focus:border-b-2 focus:border-b-pale-800 focus:outline-none 
        bg-white-0 placeholder-transparent
        text-base text-pale-800 leading-tight
        transition-all
      "
      ></textarea>
      <label htmlFor={nameTag}
        className="absolute -top-3 left-0 mt-1 pt-3 px-2 w-11/12 mx-1 z-10
        text-pale-700 text-sm italic leading-none
        transition-all
        peer-placeholder-shown:text-base
        peer-placeholder-shown:top-0
        peer-focus:-top-4
        peer-focus:text-sm
        "
      >{placeholderTag}</label>
    </div>
  )
}