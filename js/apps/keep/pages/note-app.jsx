import { noteService } from '../services/note.service.js'

export class NoteApp extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.getNotes().then(notes => this.setState({ notes }))
    }

    render() {
        const {notes} = this.state
        console.log('notes:', notes)

        return (
            <section>
                <h1>Note App!</h1>
            </section>
        )
    }
}