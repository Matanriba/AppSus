import { NoteImg } from "./note-img.jsx"
import { NoteTodo } from "./note-todo.jsx"
import { NoteVideo } from "./note-video.jsx"

const { Link } = ReactRouterDOM

export class NotePreview extends React.Component {
    state = {
        isShowColors: false
    }

    onTogglePin = () => {
        const { note } = this.props
        note.isPinned = !note.isPinned;
        this.props.onUpdateNote(note)
    }

    onToggleColors = () => {
        this.setState(prevState => ({ isShowColors: !prevState.isShowColors }))
    }

    DynamicNote = (props) => {
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

    onChangeColor = (color) => {
        const noteCopy = this.props.note
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
        this.props.onUpdateNote(noteCopy)
        this.onToggleColors()
    }

    render() {
        const {isShowColors} = this.state
        const { note } = this.props
        const style = note.style || null
        const bgColorObj = { backgroundColor: style ? style.backgroundColor : "#fff" }

        return (
            <div className={`note ${note.type} ${note.isPinned ? "note-pinned" : ""}`}
                style={bgColorObj}>
                <div className="note-content">
                    {note.isPinned && <img className="pinned" src="./assets/svg/keep/pinned.svg" />}
                    {note.info.title && <h3>{note.info.title}</h3>}
                    {note.type === 'note-todos' && note.info.txt && <p>{note.info.txt}</p>}
                    <this.DynamicNote note={note} onUpdateNote={this.props.onUpdateNote} />
                    {note.type !== 'note-todos' && note.info.txt && <p>{note.info.txt}</p>}
                </div>
                <div className="note-footer">
                    <img className="note-type" src={`./assets/svg/keep/${note.type}-grey.svg`} />
                    <div className="note-controls">
                        <span className="icon-container note-bg-color" title="note color">
                            <img className="icon" src="./assets/svg/keep/palette.svg" onClick={this.onToggleColors} />
                            <div className={`choose-color ${isShowColors ? "active": ""}`}>
                                <button className="choose-color-btn blue" onClick={() => this.onChangeColor('blue')}></button>
                                <button className="choose-color-btn teal" onClick={() => this.onChangeColor('teal')}></button>
                                <button className="choose-color-btn green" onClick={() => this.onChangeColor('green')}></button>
                                <button className="choose-color-btn red" onClick={() => this.onChangeColor('red')}></button>
                                <button className="choose-color-btn yellow" onClick={() => this.onChangeColor('yellow')}></button>
                                <button className="choose-color-btn pink" onClick={() => this.onChangeColor('pink')}></button>
                                <button className="choose-color-btn purple" onClick={() => this.onChangeColor('purple')}></button>
                                <button className="choose-color-btn white" onClick={() => this.onChangeColor('')}></button>
                            </div>
                        </span>
                        <Link to={`/keep/edit/${note.id}`}>
                            <span className="icon-container" title="edit">
                                <img className="icon" src="./assets/svg/keep/edit.svg" />
                            </span>
                        </Link>
                        <span className="icon-container" title="delete" onClick={() => this.props.onRemoveNote(note.id)}>
                            <img className="icon" src="./assets/svg/keep/trash.svg" />
                        </span>
                        <span className="icon-container" title="duplicate" onClick={() => this.props.onDupNote(note.id)}>
                            <img className="icon" src="./assets/svg/keep/duplicate.svg" />
                        </span>
                        {note.isPinned && <span className="icon-container" title="unpin" onClick={() => this.onTogglePin(note)}>
                            <img className="icon" src="./assets/svg/keep/pin.svg" />
                        </span>}
                        {!note.isPinned && <span className="icon-container" title="pin" onClick={() => this.onTogglePin(note)}>
                            <img className="icon" src="./assets/svg/keep/pinned.svg" />
                        </span>}
                    </div>
                </div>
            </div>
        )
    }

}