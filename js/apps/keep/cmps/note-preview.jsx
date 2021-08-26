import { NoteImg } from "./note-img.jsx"
import { NoteTodo } from "./note-todo.jsx"
import { NoteVideo } from "./note-video.jsx"


export function NotePreview({ note, onRemoveNote }) {
    const DyanmicNote = (note) => {
        switch (note.type) {
            case 'note-video':
                return <NoteVideo note={note} />
            case 'note-todos':
                return <NoteTodo note={note} />
            case 'note-img':
                return <NoteImg note={note} />
            case 'note-txt':
                return null
        }
    }

    return (
        <div className={`note ${note.type}`} >
            {note.isPinned && <span>{'<Pinned>'}</span>}
            {note.info.title && <h3>{note.info.title}</h3>}
            {DyanmicNote(note)}
            {note.info.txt && <p>{note.info.txt}</p>}
            <div className="note-controls">
                <span className={`icon ${note.type}`}></span>
                <button onClick={() => onRemoveNote(note.id)}>remove</button>
            </div>
        </div>
    )
}

// export class NotePreview extends React.Component {
//     state = {
//         note: null
//     }

//     componentDidMount() {
//         this.loadNote()
//     }

//     loadNote = () => {
//         this.setState({ note: this.props.note })
//     }

//     DyanmicNote = (note) => {
//         switch (note.type) {
//             case 'note-video':
//                 return <NoteVideo note={note} />
//             case 'note-todos':
//                 return <NoteTodo note={note} />
//             case 'note-img':
//                 return <NoteImg note={note} />
//             case 'note-txt':
//                 return null
//             // return <NoteTxt note={note} />
//         }
//     }

//     render() {
//         const { note } = this.state
//         if (!note) return <div>loading note...</div>
//         return (
//             <div className={`note ${note.type}`} >
//                 {/* {JSON.stringify(note.info)} */}
//                 {note.info.title && <h3>{note.info.title}</h3>}
//                 {this.DyanmicNote(note)}
//                 {note.info.txt && <p>{note.info.txt}</p>}
//                 <div className="note-controls">
//                     <span className={`icon ${note.type}`}></span>
//                     <button onClick={() => }>remove</button>
//                 </div>
//             </div>
//         )
//     }
// }


//     render() {
//         const DyanmicNote = (props) => {
//             switch (props.type) {
//                 case 'note-video':
//                     return <NoteVideo {...props} />
//                 case 'note-todo':
//                     return <NoteTodo {...props} />
//                 case 'note-img':
//                     return <NoteImg {...props} />
//                 case 'note-txt':
//                     return <NoteTxt {...props} />
//             }
//         }
//         return <div>
//             <DyanmicNote type={this.props.type} />
//         </div>
//     }
// }