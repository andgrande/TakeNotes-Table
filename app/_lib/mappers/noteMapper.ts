import { IDTOData } from '../dtos/IReferenceDataDTO';

// Firestore stores createdAt as a Timestamp; the UI expects ts in ms
// and a d/m/yyyy string (same shape the Fauna API used to return).
type TimestampLike = { toMillis: () => number };

export type NoteDocData = {
  noteQuote?: string;
  notePage?: string;
  noteAuthor?: string;
  noteYear?: string | null;
  noteTitle?: string;
  notePublisher?: string;
  noteLink?: string;
  notePaper?: string;
  isUsed?: boolean;
  createdAt?: TimestampLike | null;
};

export const formatDate = (ts: number): string => {
  const date = new Date(ts);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const toNoteDTO = (id: string, d: NoteDocData): IDTOData => {
  // createdAt can be null while a server timestamp is still pending.
  const ts = d.createdAt?.toMillis?.() ?? Date.now();

  return {
    id,
    ts,
    date: formatDate(ts),
    data: {
      noteQuote: d.noteQuote ?? '',
      notePage: d.notePage ?? '',
      noteAuthor: d.noteAuthor ?? '',
      noteYear: d.noteYear ?? '',
      noteTitle: d.noteTitle ?? '',
      notePublisher: d.notePublisher ?? '',
      noteLink: d.noteLink ?? '',
      notePaper: d.notePaper ?? '',
      isUsed: d.isUsed ?? false,
    },
  };
};
