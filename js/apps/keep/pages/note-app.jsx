import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx';
import { noteService } from '../services/note.service.js'

export class NoteApp extends React.Component {
    state = {
        notes: null,
        // pinnedNotes: null,
        // unpinnedNotes: null,
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
        // noteService.query(this.state.filterBy)
        //     .then(unpinnedNotes => this.setState({ unpinnedNotes }))
        // noteService.query(this.state.filterBy, true)
        //     .then(pinnedNotes => { this.setState({ pinnedNotes }) })
        noteService.query(this.state.filterBy).then(notes=>{this.setState({notes})})
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    // NOTE HANDLERS
    onAddNote = (note) => {
        noteService.addNote(note).then(this.loadNotes)
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId).then(() => { this.loadNotes() })
    }

    onUpdateNote = (updatedNote) => {
        noteService.updateNote(updatedNote)
        .then(()=>{this.loadNotes()})  
        //remove/add todo, change style.. 
    }


    /* GETTERS */

    get pinnedNotes(){
        return this.state.notes.filter(note=> note.isPinned)
    }

    get unpinnedNotes(){
        return this.state.notes.filter(note=> !note.isPinned)
    }

    render() {
        const { filterBy,notes } = this.state
        // if (!pinnedNotes && !unpinnedNotes) return <div>Loading...</div>
        if (!notes) return <div>Loading...</div>
        return (
            <section>
                <div>A search + filter bar...</div>
                <NoteAdd className="new-note" onAddNote={this.onAddNote} />
                <section className="notes-list flex">
                    {notes && !notes.length && <div>No notes to show</div>}
                    {this.pinnedNotes && <NoteList onUpdateNote={this.onUpdateNote} onRemoveNote={this.onRemoveNote} notes={this.pinnedNotes} />}
                    {this.unpinnedNotes && <NoteList onUpdateNote={this.onUpdateNote} onRemoveNote={this.onRemoveNote} notes={this.unpinnedNotes} />}
                </section>
            </section>
        )
    }
}