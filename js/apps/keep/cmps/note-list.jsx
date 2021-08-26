import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {
    return (
        <section className="notes-list flex">
            {notes.map(note => <NotePreview key={note.id} note={note} />)}
        </section>
    )
}