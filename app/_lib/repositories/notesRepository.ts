import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs,
  limit, orderBy, query, serverTimestamp, updateDoc, where,
} from 'firebase/firestore';
import { getAuthInstance, getDb } from '../firebase/config';
import { IDTOData } from '../dtos/IReferenceDataDTO';
import { NoteDocData, toNoteDTO } from '../mappers/noteMapper';

export const COLLECTION_NAME = 'notes';
export const LIST_LIMIT = 500;

const NOTE_FIELDS = [
  'noteQuote', 'notePage', 'noteAuthor', 'noteYear',
  'noteTitle', 'notePublisher', 'noteLink', 'notePaper', 'isUsed',
];

export type NoteInput = Partial<Record<string, string | boolean | null>>;

const requireUid = (): string => {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error('User is not authenticated.');
  return user.uid;
};

// Only known note fields are persisted (never userId/timestamps from the caller).
const pickFields = (values: NoteInput = {}) =>
  Object.fromEntries(
    NOTE_FIELDS.filter((f) => f in values).map((f) => [f, values[f] ?? null])
  );

const notesCollection = () => collection(getDb(), COLLECTION_NAME);

// Returns the notes oldest -> newest (same order the UI had with Fauna).
// The query asks for the newest LIST_LIMIT notes and reverses them, which
// reuses the (userId ASC, createdAt DESC) index.
export const listNotes = async (): Promise<IDTOData[]> => {
  const userId = requireUid();
  const q = query(
    notesCollection(),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(LIST_LIMIT)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toNoteDTO(d.id, d.data() as NoteDocData)).reverse();
};

export const getNote = async (id: string): Promise<IDTOData | null> => {
  requireUid();
  const snap = await getDoc(doc(getDb(), COLLECTION_NAME, id));
  return snap.exists() ? toNoteDTO(snap.id, snap.data() as NoteDocData) : null;
};

// Creates the note and returns it already in the UI shape. The document is
// read back so createdAt holds the resolved server timestamp.
export const createNote = async (inputValues: NoteInput): Promise<IDTOData> => {
  const userId = requireUid();
  const ref = await addDoc(notesCollection(), {
    isUsed: false,
    ...pickFields(inputValues),
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const snap = await getDoc(ref);
  return toNoteDTO(snap.id, snap.data() as NoteDocData);
};

export const updateNote = async (id: string, values: NoteInput): Promise<void> => {
  requireUid();
  await updateDoc(doc(getDb(), COLLECTION_NAME, id), {
    ...pickFields(values),
    updatedAt: serverTimestamp(),
  });
};

export const deleteNote = async (id: string): Promise<void> => {
  requireUid();
  await deleteDoc(doc(getDb(), COLLECTION_NAME, id));
};
