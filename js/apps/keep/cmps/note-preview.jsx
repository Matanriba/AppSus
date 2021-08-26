import { NoteImg } from "./note-img.jsx"
import { NoteTodo } from "./note-todo.jsx"
import { NoteVideo } from "./note-video.jsx"

export class NotePreview extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        this.setState({ note: this.props.note })
    }

    DyanmicNote = (note) => {
        switch (note.type) {
            case 'note-video':
                return <NoteVideo note={note} />
            case 'note-todos':
                return <NoteTodo note={note} />
            case 'note-img':
                return <NoteImg note={note} />
            case 'note-txt':
                return null
                // return <NoteTxt note={note} />
        }
    }

    render() {
        const { note } = this.state
        if (!note) return <div>loading note...</div>
        return (
            <div className={`note ${note.type}`} >
                {/* {JSON.stringify(note.info)} */}
                {note.info.title && <h3>{note.info.title}</h3>}
                {this.DyanmicNote(note)}
                {note.info.txt && <p>{note.info.txt}</p>}
                <div className="note-controls">
                <span className={`icon ${note.type}`}></span>

                </div>
            </div>
        )
    }
}







// export function NotePreview({ note }) {
//     const DyanmicNote = (note) => {
//         switch (note.type) {
//             case 'note-video':
//                 return <NoteVideo note={note} />
//             case 'note-todo':
//                 return <NoteTodo note={note} />
//             case 'note-img':
//                 return <NoteImg note={note} />
//             case 'note-txt':
//                 return <NoteTxt note={note} />
//         }
//     }

//     return(
//         <div className = { note.type } >
//             <h3>note.</h3>
//             <React.Fragment>
//                 {DyanmicNote(note)}
//             </React.Fragment>
//         </div>
//     )
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