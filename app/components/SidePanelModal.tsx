import { TbRefresh, TbX } from "react-icons/tb";
import InputField from "./modalComponents/InputField";
import TextAreaField from "./modalComponents/TextAreaField";

export default function SidePanelModal({ handleAddOnPage }: any) {

  const handleCloseModal = () => {
    const modal: HTMLDialogElement | null = document.querySelector("#sidePanelModal");
    modal?.close();
  }

  const handleResetModalFields = () => {
    const element = document.getElementById("note-quote") as HTMLInputElement;
    if (element) element.value = "";
    element.focus();
  }

  const handleEnterKey = () => {
    var formElement = document.getElementById("oForm") as HTMLFormElement;
    formElement.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        formElement.submit();
      }
    });

    var quoteTextAreaElement = document.getElementById("oForm") as HTMLFormElement;
    quoteTextAreaElement.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        formElement.submit();
      }
    });
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = {
      noteQuote: event.target?.['note-quote'].value,
      notePage: event.target?.['note-page'].value,
      noteAuthor: event.target?.['note-author'].value,
      noteYear: event.target?.['note-year'].value,
      noteTitle: event.target?.['note-title'].value,
      notePublisher: event.target?.['note-publisher'].value,
      noteLink: event.target?.['note-link'].value,
      notePaper: event.target?.['note-paper'].value,
    }

    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const { createdNote } = await response.json();
    handleAddOnPage(createdNote);

    handleResetModalFields();
    handleCloseModal();
  };

  return (
    <dialog id="sidePanelModal" 
      className="backdrop:opacity-50 backdrop:bg-slate-900"
    >
      <div className="fixed w-1/4 min-w-96 h-98% right-2 top-2 p-10 
        transition-all modal rounded
      ">
        <div className='w-full flex flex-row justify-between items-center'>
          <h1 className="text-2xl font-bold text-pale-800 w-3/4">
            Create a Note
          </h1>
          <div className='flex flex-row justify-around align-middle w-1/5 
            *:text-pale-700 *:text-lg *:w-1/6 *:self-end *:transition-all'
          >
            <button
              onClick={() => handleResetModalFields()}
              className='text-lg hover:text-pale-800 active:text-pale-600 outline-none'
            >
              <TbRefresh />
            </button>
            <button
              onClick={() => handleCloseModal()}
              className='text-xl hover:text-pale-800 active:text-pale-600'
            >
              <TbX />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <form id="oForm" onSubmit={handleSubmit} target="_blank" className='flex flex-col justify-between h-90vh w-full mt-4 space-y-5 -mb-4'>
            <TextAreaField rowsTag={4} nameTag="note-quote" id="quote" placeholderTag="Quote"/>
            <InputField typeTag="text" nameTag="note-page" placeholderTag="Pages"/>
            <InputField typeTag="text" nameTag="note-author" placeholderTag="Author"/>
            <InputField typeTag="number" nameTag="note-year" placeholderTag="Year" />
            <TextAreaField rowsTag={2} nameTag="note-title" placeholderTag="Title" />

            <InputField typeTag="text" nameTag="note-publisher" placeholderTag="Publisher" />
            <InputField typeTag="text" nameTag="note-link" placeholderTag="Link" />
            <InputField typeTag="text" nameTag="note-paper" placeholderTag="Paper" />

            <button id="btn-submit" type="submit" aria-label="Submit new Note"
              className='border border-pale-800 w-10/12 h-10 rounded self-center
              text-lg text-pale-200 bg-pale-800 hover:bg-pale-700 hover:text-white focus:bg-pale-800 active:bg-pale-700 transition'
            >Submit</button>
          </form>

        </div>
      </div>
    </dialog>
  )
}