import { NoteImg } from "./note-img.jsx"
import { NoteTodo } from "./note-todo.jsx"
import { NoteVideo } from "./note-video.jsx"

export function NotePreview({ note, onRemoveNote,
    onUpdateNote, onDupNote }) {
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

    const onChangeColor = (color) => {
        const noteCopy = note
        const colors = {
            blue: '#aecbfa',
            teal: '#a7ffeb',
            green: '#ccff90',
            red: '#f28b82',
            yellow: '#fff475',
            pink: '#fdcfe8',
            purple: '#d7aefb'
        }
        noteCopy.style = { backgroundColor: colors[color] }
        onUpdateNote(noteCopy)
    }

    const style = note.style || null
    const bgColorObj = { backgroundColor: style ? style.backgroundColor : "#fff" }

    return (

        <div className={`note ${note.type} ${note.isPinned ? "note-pinned" : ""}`}
            style={bgColorObj}>
            <div className="note-content">
                {note.isPinned && <img className="pinned" src="./assets/svg/keep/pinned.svg" />}
                {note.info.title && <h3>{note.info.title}</h3>}
                <DynamicNote note={note} onUpdateNote={onUpdateNote} />
                {note.info.txt && <p>{note.info.txt}</p>}
            </div>
            <div className="note-footer">
                <img className="note-type" src={`./assets/svg/keep/${note.type}-grey.svg`} />
                <div className="note-controls">
                    <span className="icon-container note-bg-color" title="note color">
                        <img className="icon" src="./assets/svg/keep/palette.svg" />
                        <div className="choose-color active">
                            <button className="choose-color-btn blue" onClick={() => onChangeColor('blue')}></button>
                            <button className="choose-color-btn teal" onClick={() => onChangeColor('teal')}></button>
                            <button className="choose-color-btn green" onClick={() => onChangeColor('green')}></button>
                            <button className="choose-color-btn red" onClick={() => onChangeColor('red')}></button>
                            <button className="choose-color-btn yellow" onClick={() => onChangeColor('yellow')}></button>
                            <button className="choose-color-btn pink" onClick={() => onChangeColor('pink')}></button>
                            <button className="choose-color-btn purple" onClick={() => onChangeColor('purple')}></button>
                            <button className="choose-color-btn white" onClick={() => onChangeColor('')}></button>
                        </div>
                    </span>
                    {/* <span className="icon-container" title="edit">
                        <img className="icon" src="./assets/svg/keep/edit.svg" />
                    </span> */}
                    <span className="icon-container" title="delete" onClick={() => onRemoveNote(note.id)}>
                        <img className="icon" src="./assets/svg/keep/trash.svg" />
                    </span>
                    <span className="icon-container" title="duplicate" onClick={() => onDupNote(note.id)}>
                        <img className="icon" src="./assets/svg/keep/duplicate.svg" />
                    </span>
                    {note.isPinned && <span className="icon-container" title="unpin" onClick={() => onTogglePin(note)}>
                        <img className="icon" src="./assets/svg/keep/pin.svg" />
                    </span>}
                    {!note.isPinned && <span className="icon-container" title="pin" onClick={() => onTogglePin(note)}>
                        <img className="icon" src="./assets/svg/keep/pinned.svg" />
                    </span>}
                </div>
            </div>
        </div>
    )
}