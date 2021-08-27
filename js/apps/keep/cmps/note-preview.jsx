import { NoteImg } from "./note-img.jsx"
import { NoteTodo } from "./note-todo.jsx"
import { NoteVideo } from "./note-video.jsx"


export function NotePreview({ note, onRemoveNote,onUpdateNote }) {
    
    const DynamicNote = (props) => {
        switch (props.note.type) {
            case 'note-video':
                return <NoteVideo {...props} />
            case 'note-todos':
                return <NoteTodo {...props} />
            case 'note-img':
                return <NoteImg {...props} />
            case 'note-txt':
                return null
        }
    }

    return (
        <div className={`note ${note.type}`} >
            {note.isPinned && <span className="pinned">📌</span>}
            {note.info.title && <h3>{note.info.title}</h3>}
            <DynamicNote note={note} onUpdateNote={onUpdateNote} />
            {note.info.txt && <p>{note.info.txt}</p>}
            <div className="note-controls">
                <span className={`icon ${note.type}`}></span>
                <button onClick={() => onRemoveNote(note.id)}>🗑</button>
            </div>
        </div>
    )
}