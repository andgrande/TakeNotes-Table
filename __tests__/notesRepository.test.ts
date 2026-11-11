import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ currentUser: { uid: 'user-1' } as any }));

vi.mock('../app/_lib/firebase/config', () => ({
  getAuthInstance: () => ({ currentUser: mocks.currentUser }),
  getDb: () => 'db',
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn((db, name) => ({ db, name })),
  doc: vi.fn((db, name, id) => ({ db, name, id })),
  addDoc: vi.fn(async () => ({ id: 'new-id' })),
  getDocs: vi.fn(),
  getDoc: vi.fn(),
  updateDoc: vi.fn(async () => {}),
  deleteDoc: vi.fn(async () => {}),
  query: vi.fn((...args) => ({ args })),
  where: vi.fn((...args) => ({ where: args })),
  orderBy: vi.fn((...args) => ({ orderBy: args })),
  limit: vi.fn((n) => ({ limit: n })),
  serverTimestamp: vi.fn(() => 'TS'),
}));

import * as fs from 'firebase/firestore';
import {
  createNote, deleteNote, getNote, listNotes, updateNote,
} from '../app/_lib/repositories/notesRepository';

const ts = (ms: number) => ({ toMillis: () => ms });
const snap = (id: string, data: any) => ({ id, data: () => data, exists: () => true });

beforeEach(() => {
  vi.clearAllMocks();
  mocks.currentUser = { uid: 'user-1' };
});

describe('notesRepository', () => {
  it('createNote writes whitelisted fields + userId and returns the UI shape', async () => {
    (fs.getDoc as any).mockResolvedValueOnce(
      snap('new-id', { noteQuote: 'hi', isUsed: false, createdAt: ts(1000) })
    );
    const note = await createNote({ noteQuote: 'hi', userId: 'evil', x: 'y' });
    const [, data] = (fs.addDoc as any).mock.calls[0];
    expect(data).toEqual({
      isUsed: false, noteQuote: 'hi',
      userId: 'user-1', createdAt: 'TS', updatedAt: 'TS',
    });
    expect(note.id).toBe('new-id');
    expect(note.ts).toBe(1000);
    expect(note.data.noteQuote).toBe('hi');
  });

  it('createNote propagates errors', async () => {
    (fs.addDoc as any).mockRejectedValueOnce(new Error('denied'));
    await expect(createNote({ noteQuote: 'x' })).rejects.toThrow('denied');
  });

  it('rejects when unauthenticated', async () => {
    mocks.currentUser = null;
    await expect(createNote({ noteQuote: 'x' })).rejects.toThrow(/authenticated/);
    await expect(listNotes()).rejects.toThrow();
    await expect(deleteNote('a')).rejects.toThrow();
    expect(fs.addDoc).not.toHaveBeenCalled();
  });

  it('listNotes filters by user, asks newest 500 and returns oldest first', async () => {
    (fs.getDocs as any).mockResolvedValueOnce({
      docs: [
        snap('new', { noteQuote: 'n', createdAt: ts(2000) }),
        snap('old', { noteQuote: 'o', createdAt: ts(1000) }),
      ],
    });
    const notes = await listNotes();
    expect(fs.where).toHaveBeenCalledWith('userId', '==', 'user-1');
    expect(fs.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    expect(fs.limit).toHaveBeenCalledWith(500);
    expect(notes.map((n) => n.id)).toEqual(['old', 'new']);
  });

  it('getNote returns null when missing', async () => {
    (fs.getDoc as any).mockResolvedValueOnce({ exists: () => false });
    expect(await getNote('zzz')).toBeNull();
  });

  it('updateNote never changes userId and bumps updatedAt', async () => {
    await updateNote('n1', { isUsed: true, userId: 'evil' });
    const [ref, data] = (fs.updateDoc as any).mock.calls[0];
    expect(ref.id).toBe('n1');
    expect(data).toEqual({ isUsed: true, updatedAt: 'TS' });
  });

  it('deleteNote deletes the document', async () => {
    await deleteNote('n1');
    expect((fs.deleteDoc as any).mock.calls[0][0].id).toBe('n1');
  });
});
