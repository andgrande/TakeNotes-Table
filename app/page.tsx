/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react";
import TableOfNotes from "./components/TableOfNotes";
import { IDTOData } from './_lib/dtos/IReferenceDataDTO';
import { TbCircles, TbRefresh, TbSquareRoundedPlus } from "react-icons/tb";
import SidePanelModal from "./components/SidePanelModal";

export default function Home() {
  const [ notes, setNotes ] = useState<IDTOData[] | []>([]);
  // const [ notesToClipboard, setNotesToClipboard ] = useState<IDTOData[] | []>([]);
  const [ toastOpen , setToastOpen ] = useState<boolean>(false);

  async function handleFetchReferences() {
    const response = await fetch('/api/', {
      method: 'GET',
      cache: 'no-store',
    })

    return response.json();
  }

  const handleUpdateNotes = async () => {
    const response = await handleFetchReferences();
    setNotes(response);
  }

  useEffect(() => {
    handleUpdateNotes()
  }, []);  

  const updateToastStatus = () => {
    setToastOpen(!toastOpen)
  }

  function copyReference (data: any)  {
    setToastOpen(false)
    let reference = `${data.noteAuthor} (${data.noteYear}). ${data.noteTitle}. ${data.notePublisher}.`;
    navigator.clipboard.writeText(reference);

    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3500);
  }

  const handleDeleteFromPage = (id: string) => {
    setNotes(previousState => previousState?.filter(i => i.id != id))
  }

  const handleAddOnPage = (newReferenceToScreen: IDTOData) => {
    setNotes([
      ...notes,
      {...newReferenceToScreen},
    ]);
  }

  const handleSetInUseFlag = (id: string, inUse: boolean) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        note.data.isUsed = inUse;
        return {...note}
      } else return note;
    }))
  }

  const handleShowModal = () => {
    const modal: HTMLDialogElement | null = document.querySelector("#sidePanelModal");
    modal?.showModal();

    const element = document.getElementById("note-quote") as HTMLInputElement;
    if (element) element.value = "";
    element.focus();
  }

  const handleGenerateBatchCitations = () => {

    const sorted = [...notes].sort((a: any, b: any) => {
      const firstName = a.data.noteAuthor.split(' ');
      const secondName = b.data.noteAuthor.split(' ');
      if (firstName < secondName) {
        return -1;
      }
      if (firstName > secondName) {
        return 1;
      }
      return 0;
    });
    // console.log(sorted)
    let citationString = ``;
    const titleMap: any = new Map();
    sorted.map(note => {
      if (note.data.isUsed == true && !titleMap.has(note.data.noteTitle)) {
        // let cite = `${note.data.noteAuthor} (${note.data.noteYear}). ${note.data.noteTitle}. ${note.data.notePublisher}. BREAKLINE `;
        // console.log(note.data.noteTitle)
        // citationString += cite;
        citationString += `${note.data.noteAuthor} (${note.data.noteYear}). ${note.data.noteTitle}. ${note.data.notePublisher}.
        
`;
        titleMap.set(note.data.noteTitle);
      }
    });

    navigator.clipboard.writeText(citationString);

    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3500);
  }

  // const handleToggleAll = () => setNotes(notes.map(note => {
  //     note.data.isUsed = true;
  //     return {...note}
  // }));
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-stretch p-10">
      <button hidden={!toastOpen} onClick={updateToastStatus} type="button" className="fixed right-4 top-4 z-50 rounded-md px-4 py-2 font-thin animate-sliding transition text-white bg-green-150 hover:bg-green-250 ease-out">
          <div className="flex items-center space-x-2">
              <span className="text-3xl"><i className="bx bx-check"></i></span>
              <p className="font-medium">Full reference generated!</p>
          </div>
      </button>

      <div className="flex flex-row w-full items-center">
        <div className="flex flex-col space-y-1">
          <button className="hover:text-gray-400 active:text-white transition-all mr-4 border border-gray-400" onClick={() => handleGenerateBatchCitations()} >
            Copy Citations
          </button>
          {/* <button className="hover:text-gray-400 active:text-white transition-all mr-4 border border-gray-400" onClick={() => handleToggleAll()} >
            Select all
          </button> */}
        </div>
        <div className="flex justify-end w-7/12">
          <h1 className={`uppercase font-semibold text-4xl`}>References</h1>
        </div>
        
        <div className="flex items-center justify-end w-5/12 text-4xl" >
          <button className="hover:text-gray-400 active:text-white transition-all mr-4" onClick={() => handleUpdateNotes()} >
            <TbRefresh />
          </button>

          <button className="hover:text-gray-400 active:text-white transition-all" onClick={() => handleShowModal()} >
            <TbSquareRoundedPlus />
          </button>
        </div>
        
      </div>

      <SidePanelModal handleAddOnPage={handleAddOnPage} />

      {
        !!notes 
        ? <TableOfNotes content={notes} copyReference={copyReference} handleDeleteFromPage={handleDeleteFromPage} handleSetInUseFlag={handleSetInUseFlag} />
        : <div className="flex flex-row w-52 mt-32 text-teal-800 text-lg font-normal items-center justify-between">
            <TbCircles className="animate-spin" />
            <p>Loading references</p>
          </div>
      }

    </main>
  );
}