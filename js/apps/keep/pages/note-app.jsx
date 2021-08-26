import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx';
import { noteService } from '../services/note.service.js'

export class NoteApp extends React.Component {
    state = {
        pinnedNotes: null,
        unpinnedNotes: null,
        filterBy: {
            byType: null,
            bySearch: null,
        }
    }

    notesToShow = null;

    componentDidMount() {
        this.loadNotes()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     const { filterBy } = this.state
    //     if (filterBy !== prevState.filterBy) this.loadNotes(filterBy)
    // }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(unpinnedNotes => this.setState({ unpinnedNotes }))
        noteService.query(this.state.filterBy, true)
            .then(pinnedNotes => { this.setState({ pinnedNotes }) })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    // NOTE HANDLERS
    onAddNote = () => {

    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId).then(() => { this.loadNotes() })
    }

    onUpdateNote = () => {
        //remove/add todo, change style.. 
    }


    render() {
        const { pinnedNotes, unpinnedNotes, filterBy } = this.state
        if (!pinnedNotes && !unpinnedNotes) return <div>Loading...</div>
        return (
            <section>
                <div>A search + filter bar...</div>
                <div>A new note widget...</div>
                <NoteAdd />
                <section className="notes-list flex">
                    {pinnedNotes && !pinnedNotes.length && unpinnedNotes && !unpinnedNotes.length &&
                        <div>No notes to show</div>}
                    {pinnedNotes && <NoteList onRemoveNote={this.onRemoveNote} notes={pinnedNotes} />}
                    {unpinnedNotes && <NoteList onRemoveNote={this.onRemoveNote} notes={unpinnedNotes} />}
                </section>
            </section>
        )
    }
}