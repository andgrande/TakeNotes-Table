import Link from "next/link";
import { IDTOData } from '../_lib/dtos/IReferenceDataDTO';
import { TbLayersOff, TbTrashX, TbCopy, TbSortAscending, TbSortDescending } from "react-icons/tb";
import { useState } from "react";

export default function TableOfNotes({ content, copyReference, handleDeleteFromPage, handleSetInUseFlag, sortDate }: any) {
  const notes: IDTOData[] | undefined = content;
  const [ isDateSorted, setIsDateSorted ] = useState<boolean>(false)
  const [ isPaperSorted, setIsPaperSorted ] = useState<boolean>(false)
  let timeout: any;

  const previousDate = new Date('03/21/2024').getTime() * 1000;

  if (notes == undefined) return;
  const handleDeleteReference = async(id: string) => {
    try {
      const res = await fetch("/api", {
        method: "DELETE",
        body: JSON.stringify({ id })
      })

      handleDeleteFromPage(id)
    } catch (er) {
      console.log(er)
    }
  }

  const handleUpdateUseFlag = async (elementId: string, noteId: string) => {
    try {
      const element = document.getElementById(elementId) as HTMLInputElement;
      const inUse: boolean = element.checked;
      
      handleSetInUseFlag(noteId, inUse);
      // const res = await fetch('/api', {
      //   method: "PATCH",
      //   body: JSON.stringify({ id: noteId, isUsed: inUse })
      // })

    } catch (er) {
      console.log(er)
    }
  }

  const copyContent = (fieldValue: string | undefined, id?: string | undefined) => {
    if (fieldValue == undefined || id == undefined) return;
    navigator.clipboard.writeText(fieldValue);

    let el = document.getElementById(id);
    el?.classList.add("blinkElement")

    clearTimeout(timeout);
    timeout = setTimeout(() => el?.classList.remove("blinkElement"), 750)
  }

  const handleCopyReference = (data: any) => {
    copyReference(data)
  }

  const handleSortDate = (field: string) => {

    if (field == 'date') {
      sortDate(field, isDateSorted)
      setIsDateSorted(prevState => !prevState)
    }
    else if (field == 'paper') {
      sortDate(field, isPaperSorted)
      setIsPaperSorted(prevState => !prevState)
    }
  }

  if (notes?.length == 0) return (
    <div className="flex flex-row w-52 mt-32 text-teal-800 text-lg font-normal items-center justify-evenly">
      <TbLayersOff />
      <p>No data saved</p>
    </div>
  );

  return (
    <div className="w-full mt-10">
      <table className="table-auto w-full bg-slate-100 border-separate border-spacing-0.25 rounded-lg border-slate-200 text-center">
        <thead >
          <tr className="*:border" >
            <th className="text-center">Use</th>
            <th className="w-1/5 px-3">Quote</th>
            <th>Page</th>
            <th className="w-2/12">Author</th>
            <th>Year</th>
            <th className="w-1/5">Title</th>
            <th className="w-1/12">Publisher</th>
            <th className="max-w-48">Link</th>
            <th onClick={() => handleSortDate('paper')}>
              <div className="flex items-center justify-evenly">
                Paper {isPaperSorted ? <TbSortAscending /> : <TbSortDescending />}
              </div>
            </th>
            <th onClick={() => handleSortDate('date')}>
              <div className="flex items-center justify-evenly">
                Date {isDateSorted ? <TbSortAscending /> : <TbSortDescending />}
              </div>
            </th>
            <th className="italic font-thin text-sm">copy</th>
          </tr>
        </thead>
        <tbody className="bg-slate-300">
          {notes?.map(i => {
          // if (previousDate > i.ts) return;
          // if (i.data.notePaper.charAt(0) != '4') return;
          return (
          <tr key={i.id} 
            className="border-2 h-28 max-h-116px border-black rounded-lg truncate-after-n-lines
            *:border *:border-slate-300 *:px-2 *:h-116px has-[:checked]:bg-green-100 transition
            "
          >
            <td className="border border-slate-300 text-center">
              <input type="checkbox" id={i.ts.toString() + 'noteUsed'} 
                checked={i.data.isUsed == true ? true : false} 
                className="accent-gray-600 h-full"
                // onClick={() => handleUpdateUseFlag(i.ts.toString() + 'noteUsed', i.id)}
                onChange={() => handleUpdateUseFlag(i.ts.toString() + 'noteUsed', i.id)}
              />
            </td>
            <td id={i.ts.toString()} onClick={() => copyContent(i.data.noteQuote, i.ts.toString())}
              className="w-1/5 min-w-1/5 *:hover:overflow-visible hover:w-full">
              <p className="focus:border-sky-500 truncate-after-n-lines">{i.data.noteQuote}</p>
            </td>
            <td id={i.ts.toString() + 'notePage'} onClick={() => copyContent(i.data.notePage, i.ts.toString() + 'notePage')} >{i.data.notePage}</td>
            <td id={i.ts.toString() + 'noteAuthor'}  onClick={() => copyContent(i.data.noteAuthor, i.ts.toString() + 'noteAuthor')} className=" w-2/12">
              <p className="truncate-after-n-lines">{i.data.noteAuthor}</p>
            </td> 
            <td id={i.ts.toString() + 'noteYear'} onClick={() => copyContent(i.data.noteYear, i.ts.toString() + 'noteYear')} >{i.data.noteYear}</td>
            <td id={i.ts.toString() + 'noteTitle'} onClick={() => copyContent(i.data.noteTitle, i.ts.toString() + 'noteTitle')} className=" w-1/5 h-116px *:hover:overflow-visible">
              <p className="truncate-after-n-lines">{i.data.noteTitle}</p>
            </td>
            <td id={i.ts.toString() + 'notePublisher'} onClick={() => copyContent(i.data.notePublisher, i.ts.toString() + 'notePublisher')} className=" max-w-1/12 *:hover:overflow-visible ">
              <p className="truncate-after-n-lines">
                {i.data.notePublisher}
              </p>
            </td>
            <td id={i.ts.toString() + 'noteLink'} onClick={() => copyContent(i.data.noteLink, i.ts.toString() + 'noteLink')} className=" w-1/12 max-w-48 hover:relative hover:w-full transition-all duration-500 ease-in-out">
              {/* <a className="truncate-after-n-lines ">
                {i.data.noteLink}
              </a> */}
              <Link href={i.data.noteLink} target="_blank" rel="noopener noreferrer">
                <p className="truncate-after-n-lines">{i.data.noteLink}</p>
              </Link>
            </td>
            <td id={i.ts.toString() + 'notePaper'} onClick={() => copyContent(i.data.notePaper, i.ts.toString() + 'notePaper')} >{i.data.notePaper}</td>
            <td id={i.ts.toString() + 'date'} onClick={() => copyContent(i.date, i.ts.toString() + 'date')} >{i.date}</td>
            <td className="flex flex-col justify-center items-center space-y-5 *:size-6  *:transition-all">
              <TbTrashX onDoubleClick={() => handleDeleteReference(i.id)} className="hover:text-gray-500 active:text-white" aria-label="Double-click to delete" />
              <TbCopy onClick={() => handleCopyReference(i.data)} className="hover:text-gray-500 active:text-white" aria-label="Click to copy Reference" />
            </td>
          </tr>
        )}
        )}
        </tbody>
      </table>
    </div>
)}
