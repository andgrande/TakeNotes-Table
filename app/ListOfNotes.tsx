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
}

export default function ListOfNotes({ content }: any) {
  const notes: dataInt[] | undefined = content;

  if (notes == undefined) return;

  const getDate = (ts: number) => {
    const date = new Date();

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  
  return (
    <div className="flex flex-col space-y-2 w-full text-sm">
      <div className="flex flex-row bg-slate-400 border border-slate-900 rounded">
          <span className="border w-10 text-center">ID</span>
          <span className="border w-1/4 text-center">Quote</span>
          <span className="border w-20 text-center">Page</span>
          <span className="border w-1/6 text-center">Author</span>
          <span className="border w-20 text-center">Year</span>
          <span className="border w-1/6 text-center">Title</span>
          <span className="border w-1/6 text-center">Publisher</span>
          <span className="border w-1/6 text-center">Link</span>
          <span>Paper</span>
          <span className="border w-40 text-center">Date Added</span>
      </div>
      {notes.map(item => (
        <div key={item.ts} 
        className="flex flex-row h-20 bg-slate-100  rounded shadow-md"
      >
        <span className="w-10 text-center">00</span>
        <span className="w-1/4 text-center">{item.data.noteQuote} </span>
        <span className="border w-20 text-center">{item.data.notePage} </span>
        <span className="border w-1/6 text-center">{item.data.noteAuthor} </span>
        <span className="border w-20 text-center">{item.data.noteYear} </span>
        <span className="border w-1/6 text-center">{item.data.noteTitle} </span>
        <span className="border w-1/6 text-center">{item.data.notePublisher} </span>
        <span className="border w-1/6 text-center">{item.data.noteLink} </span>
        <span>{item.data.notePaper} </span>
        <span className="border w-40 text-center">{getDate(item.ts)}</span>
      </div>

        // <div key={item.ts} 
        //   className="flex flex-row h-20 border border-slate-900 rounded"
        // >
        //   <span className="w-10 text-center">00</span>
        //   <input value={item.data.noteQuote} className="w-1/4 text-center" disabled />
        //   <input value={item.data.notePage} disabled />
        //   <input value={item.data.noteAuthor} disabled />
        //   <input value={item.data.noteYear} disabled />
        //   <input value={item.data.noteTitle} disabled />
        //   <input value={item.data.notePublisher} disabled />
        //   <input value={item.data.noteLink} disabled />
        //   <input value={item.data.notePaper} disabled />
        //   <span>{getDate(item.ts)}</span>
        // </div>
      ))}


    </div>
)}