import Link from "next/link";
import { useState } from "react";
import { TbLayersOff, TbTrashX } from "react-icons/tb";

import { TbCopy } from "react-icons/tb";

interface dataInt {
  data: {
    noteQuote: string,
    notePage: string,
    noteAuthor: string,
    noteYear: string,
    noteTitle: string,
    notePublisher: string,
    noteLink: string,
    notePaper: string
  },
  id: number,
  ts: number,
  date: string | undefined,
}

export default function TableOfNotes({ content, copyReference }: any) {
  const notes: dataInt[] | undefined = content;
  let timeout: any;

  if (notes == undefined) return;

  const handleDeleteReference = async(id: number) => {
    try {
      const res = await fetch("/api", {
        method: "DELETE",
        body: JSON.stringify({ id })
      })

      console.log(res.json())
    } catch (er) {
      console.log(er)
    }
    
  }

  const copyContent = (fieldValue: string | undefined, id?: string | undefined) => {
    if (fieldValue == undefined || id == undefined) return;
    navigator.clipboard.writeText(fieldValue);

    let el = document.getElementById(id);
    el?.classList.add("test")

    clearTimeout(timeout);
    timeout = setTimeout(() => el?.classList.remove("test"), 750)
  }

  const handleCopyReference = (data: any) => {
    copyReference(data)
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
          <tr >
            {/* <th className="text-center">ID</th> */}
            <th className="w-1/5 px-3">Quote</th>
            <th>Page</th>
            <th className="w-2/12">Author</th>
            <th>Year</th>
            <th className="w-1/5">Title</th>
            <th className="w-1/12">Publisher</th>
            <th className="max-w-48">Link</th>
            <th>Paper</th>
            <th>Date Added</th>
            <th className="italic font-thin text-sm">copy</th>
          </tr>
        </thead>
        <tbody className="bg-slate-300">
          {notes?.map(i => (
          <tr key={i.data.noteQuote} 
            className="border-2 h-28 max-h-116px border-black rounded-lg truncate-after-n-lines
            *:border *:border-slate-300 *:px-2 *:h-116px
            "
          >
            {/* <td className="border border-slate-300 px-2 text-center">##</td> */}
            <td id={i.ts.toString()} onClick={() => copyContent(i.data.noteQuote, i.ts.toString())}
              className="w-1/5 min-w-1/5">
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
            <td id={i.ts.toString() + 'date'} onClick={() => copyContent(i.date, i.ts.toString())} >{i.date}</td>
            <td className="flex flex-col justify-center items-center space-y-5">
              <TbTrashX onDoubleClick={() => handleDeleteReference(i.id)} size={20}/>
              <TbCopy onClick={() => handleCopyReference(i.data)} size={20} />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
)}
