import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onRemoveNote,onUpdateNote }) {
    return (
        <React.Fragment>
            {notes.map(note => <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} />)}
        </React.Fragment>
    )
}