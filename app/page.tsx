/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react";
import { inter, karla } from './fonts';
import ListOfNotes from "./ListOfNotes";
import TableOfNotes from "./TableOfNotes";

import { TbCircles } from "react-icons/tb";

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
  ts: number,
  date: string | undefined,
}

export default function Home() {
  const [ notes, setNotes ] = useState<dataInt[] | undefined>(undefined);
  const [ toastOpen , setToastOpen ] = useState<boolean>(false);
  let timeout: any;

  async function getDataThere() {
    const response = await fetch('/api/', {
      method: 'GET',
      cache: 'no-store',
    })

    return response.json();
  }

  const updateNotes = async () => {
    const response = await getDataThere();
    setNotes(response);
  }

  useEffect(() => {
    updateNotes()
  }, []);  

  const updateToastStatus = () => {
    setToastOpen(!toastOpen)
  }

  function copyReference (data: any)  {
    setToastOpen(false)
    let reference = `${data.noteAuthor} (${data.notePage}) - ${data.noteYear} - ${data.noteLink}`
    navigator.clipboard.writeText(reference);


    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3500);

  }

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-stretch p-10">
      <button hidden={!toastOpen} onClick={updateToastStatus} type="button" className="fixed right-4 top-4 z-50 rounded-md px-4 py-2 font-thin animate-sliding transition text-white bg-green-150 hover:bg-green-250 ease-out">
          <div className="flex items-center space-x-2">
              <span className="text-3xl"><i className="bx bx-check"></i></span>
              <p className="font-medium">Full reference generated!</p>
          </div>
      </button>

      <div>
        <h1 className={`uppercase font-semibold text-4xl`}>References</h1>
      </div>

      {
        !!notes 
        ? <TableOfNotes content={notes} copyReference={copyReference} />
        : <div className="flex flex-row w-52 mt-32 text-teal-800 text-lg font-normal items-center justify-between">
            <TbCircles className="animate-spin" />
            <p>Loading references</p>
          </div>
      }

    </main>
  );
}
