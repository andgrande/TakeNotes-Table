export interface IDTOData {
  data: {
    noteQuote: string,
    notePage: string,
    noteAuthor: string,
    noteYear: string,
    noteTitle: string,
    notePublisher: string,
    noteLink: string,
    notePaper: string
    isUsed: boolean | undefined;
  },
  id: string,
  ts: number,
  date: string | undefined,
}