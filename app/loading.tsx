import { TbCircles } from "react-icons/tb";

export default function Loading() {
  return (
    <div className="flex flex-row w-52 text-teal-800 text-lg font-normal items-center justify-between">
      <TbCircles className="animate-spin" />
      <p>Loading references</p>
    </div>
  )
}