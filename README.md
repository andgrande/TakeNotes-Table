[x] Sync git
[x] Change site title: add Metadata in page.tsx

[x] ⁠buttons: put hover and active effects
[] ⁠check about tooltip
[-] ⁠Make the Table make the request
[-] Implement Loading state (Use <Suspense />)
[] Include Layout for No Data shown
[] Error handling
[x] ⁠Create Post route
[] ⁠Create modal for Post
[x] ⁠refresh table on Delete
[] ⁠refresh table on Post
[] create ⁠PATCH route
[] ⁠refresh table on Patch
---
[] ⁠create archive?
[] ⁠layout to support multi selection to move Notes to folders
[] ⁠change structure to allow editing notes

## Firebase setup (Firestore + Authentication)

Notes are stored in Firestore (collection `notes`), shared with the TakeNotes extension. Fauna was discontinued; the old API route is kept in `legacy/fauna/` and is not part of the build.

1. Use the same Firebase project as the extension. Enable **Email/Password** in Authentication and create users manually (sign-up is not exposed in the app).
2. Copy `.env.example` to `.env.local` and fill in the Web app config. On Vercel, add the same `NEXT_PUBLIC_FIREBASE_*` variables under Settings > Environment Variables **before** building (values are inlined at build time).
3. Security rules and indexes live in the extension repo (`app/firestore.rules`, `app/firestore.indexes.json`). Publish them: `firebase deploy --only firestore:rules,firestore:indexes`.

Data access: `app/_lib/repositories/notesRepository.ts`. Auth: `app/_lib/auth/`. Tests: `npm test`.

### Adding users (invite-only)

Sign-up is intentionally not exposed. To give someone access:

1. Firebase console > Authentication > Users > **Add user** (email + temporary password), and share the credentials privately.
2. They sign in with that account. Each user only sees and edits notes whose `userId` is their own uid (enforced by `firestore.rules`).
3. Keep open sign-up disabled in Authentication > Settings > User actions.
4. To reset a password: Authentication > Users > ⋯ > **Reset password**.
