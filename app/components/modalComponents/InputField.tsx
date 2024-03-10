export default function InputField ({typeTag, nameTag, placeholderTag, value}: any) {
  
  return (
    <div className='relative mt-4"'>
      <input name={nameTag} id={nameTag} type={typeTag} placeholder={placeholderTag} value={value} 
        className="peer
        w-full h-14 px-2 pt-4
        border border-pale-800 rounded-md
        focus:border-0 focus:border-b-2 focus:border-b-pale-800 focus:outline-none 
        bg-white-0 placeholder-transparent
        text-base text-pale-800
        transition-all
      "
      />
      <label htmlFor={nameTag}
        className="absolute -top-3 left-0 mt-1 pt-3 px-2
        text-pale-700 text-sm italic
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