import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'

export class NoteApp extends React.Component {
    state = {
        notes: null,
        filterBy: {
            byType: null,
            bySearch: null
        }
    }

    componentDidMount() {
        this.loadNotes()
    }

    componentDidUpdate(prevProps, prevState) {
        const { filterBy } = this.state
        if (filterBy !== prevState.filterBy) this.loadNotes(filterBy)
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy).then(notes => this.setState({ notes }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    render() {
        const { notes, filterBy } = this.state
        console.log('notes:', notes)
        if (!notes) return <div>Loading...</div>
        return (
            <section>
                <div>A search + filter bar...</div>
                <div>A new note widget...</div>
                <NoteList notes={notes} />
            </section>
        )
    }
}