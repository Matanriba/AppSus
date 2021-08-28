import { NoteImg } from "./note-img.jsx"
import { NoteTodo } from "./note-todo.jsx"
import { NoteVideo } from "./note-video.jsx"

export function NotePreview({ note, onRemoveNote, onUpdateNote, onDupNote }) {
    const onTogglePin = (note) => {
        note.isPinned = !note.isPinned;
        onUpdateNote(note)
    }

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

    const style = note.style || null
    const bgColorObj = { backgroundColor: style ? style.backgroundColor : "#fff" }

    return (

        <div className={`note ${note.type} ${note.isPinned ? "note-pinned" : ""}`}
            style={bgColorObj}>
            <div className="note-content">
                {note.isPinned && <img className="pinned" src="../../../assets/svg/keep/pinned.svg" />}
                {note.info.title && <h3>{note.info.title}</h3>}
                <DynamicNote note={note} onUpdateNote={onUpdateNote} />
                {note.info.txt && <p>{note.info.txt}</p>}
            </div>
            <div className="note-footer">
                <img className="note-type" src={`../../../../assets/svg/keep/${note.type}-grey.svg`} />
                <div className="note-controls">
                    <span className="icon-container note-bg-color" title="note color">
                        <img className="icon" src="../../../../assets/svg/keep/palette.svg" />
                    </span>
                    <span className="icon-container" title="edit">
                        <img className="icon" src="../../../../assets/svg/keep/edit.svg" />
                    </span>
                    <span className="icon-container" title="delete" onClick={() => onRemoveNote(note.id)}>
                        <img className="icon" src="../../../../assets/svg/keep/trash.svg" />
                    </span>
                    <span className="icon-container" title="duplicate" onClick={() => onDupNote(note.id)}>
                        <img className="icon" src="../../../../assets/svg/keep/duplicate.svg" />
                    </span>
                    {note.isPinned && <span className="icon-container" title="unpin" onClick={() => onTogglePin(note)}>
                        <img className="icon" src="../../../../assets/svg/keep/pin.svg" />
                    </span>}
                    {!note.isPinned && <span className="icon-container" title="pin" onClick={() => onTogglePin(note)}>
                        <img className="icon" src="../../../../assets/svg/keep/pinned.svg" />
                    </span>}
                </div>
            </div>
        </div>
    )
}