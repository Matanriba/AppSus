// export class NotePreview extends React.Component {
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

import { NoteImg } from "./note-img.jsx"
import { NoteTodo } from "./note-todo.jsx"
import { NoteTxt } from "./note-txt.jsx"
import { NoteVideo } from "./note-video.jsx"

export function NotePreview({ note }) {
    const DyanmicNote = (note) => {
        switch (note.type) {
            case 'note-video':
                return <NoteVideo note={note} />
            case 'note-todo':
                return <NoteTodo note={note} />
            case 'note-img':
                return <NoteImg note={note} />
            case 'note-txt':
                return <NoteTxt note={note} />
        }
    }

    // return (<div>
    //     {DyanmicNote(note)}
    // </div>)

    return (<React.Fragment>
        {DyanmicNote(note)}
    </React.Fragment>)
}




