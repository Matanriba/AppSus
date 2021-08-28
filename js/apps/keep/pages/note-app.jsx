import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx';
import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/note-filter.jsx';
import {NoteEdit} from '../pages/note-edit.jsx'

const {Route} = ReactRouterDOM
export class NoteApp extends React.Component {
    state = {
        notes: null,
        filterBy: {
            type: null,
            search: null,
        }
    }

    componentDidMount() {
        this.loadNotes()
        console.log('mounting')
    }

    componentDidUpdate(prevProps, prevState) {
        const { filterBy } = this.state
        if (filterBy !== prevState.filterBy) this.loadNotes(filterBy)
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy).then(notes => { this.setState({ notes }) })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    // NOTE HANDLERS
    onAddNote = (note) => {
        noteService.addNote(note).then(this.loadNotes)
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId).then(this.loadNotes)
    }

    onDupNote = (noteId) => {
        noteService.dupNote(noteId).then(this.loadNotes)
    }

    onUpdateNote = (updatedNote) => {
        noteService.updateNote(updatedNote)
            .then(() => { this.loadNotes() })
        //remove/add todo, change style.. 
    }


    /* GETTERS */

    get pinnedNotes() {
        return this.state.notes.filter(note => note.isPinned)
    }

    get unpinnedNotes() {
        return this.state.notes.filter(note => !note.isPinned)
    }

    render() {
        const { notes, isShowColors } = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <section>
                <Route path="/keep/edit/:noteId" render={(props)=> 
                    <NoteEdit onUpdateNote={this.onUpdateNote} {...props}/>}/>
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteAdd  className="new-note" onAddNote={this.onAddNote} />
                <section className="notes-list flex">
                    {notes && !notes.length && <div>No notes to show</div>}
                    {this.pinnedNotes &&
                        <NoteList notes={this.pinnedNotes}
                            onUpdateNote={this.onUpdateNote}
                            onRemoveNote={this.onRemoveNote}
                            onDupNote={this.onDupNote}
                        />
                    }
                    {this.unpinnedNotes &&
                        <NoteList notes={this.unpinnedNotes}
                            onUpdateNote={this.onUpdateNote}
                            onRemoveNote={this.onRemoveNote}
                            onDupNote={this.onDupNote}
                        />
                    }
                </section>
            </section>
        )
    }
}