import { describe, expect, it } from 'vitest';
import { formatDate, toNoteDTO } from '../app/_lib/mappers/noteMapper';

describe('noteMapper', () => {
  it('maps a Firestore doc to the shape the UI expects', () => {
    const ms = new Date(2024, 2, 5, 12).getTime();
    const dto = toNoteDTO('abc', {
      noteQuote: 'q', noteAuthor: 'a', noteYear: '2020', isUsed: true,
      createdAt: { toMillis: () => ms },
    });
    expect(dto.id).toBe('abc');
    expect(dto.ts).toBe(ms);
    expect(dto.date).toBe('5/3/2024');
    expect(dto.data.noteQuote).toBe('q');
    expect(dto.data.isUsed).toBe(true);
    expect(dto.data.notePage).toBe('');
  });

  it('defaults isUsed to false and tolerates a pending createdAt', () => {
    const dto = toNoteDTO('x', { noteQuote: 'q', noteYear: null, createdAt: null });
    expect(dto.data.isUsed).toBe(false);
    expect(dto.data.noteYear).toBe('');
    expect(typeof dto.ts).toBe('number');
  });

  it('formats dates as d/m/yyyy', () => {
    expect(formatDate(new Date(2025, 11, 31).getTime())).toBe('31/12/2025');
  });
});
