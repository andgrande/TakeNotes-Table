import { TbCheckbox } from "react-icons/tb";

export default function AcknowledgeEffect({ state }:any) {
  if (!state) return;

  return (
    <div className='fixed w-full h-90vh bg-white-0 z-50 flex justify-center items-center animate-fadein-out'>        
      <TbCheckbox className=' text-pale-700 h-14 w-14 opacity-100 '/>
    </div>
  )
}