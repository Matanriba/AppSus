import { noteService } from '../services/note.service.js'
import { TodosEdit } from '../cmps/todos-edit.jsx'

export class NoteEdit extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { noteId } = this.props.match.params
        noteService.getById(noteId).then(note => this.setState({ note }))
    }

    DynamicInput = ({ note }) => {
        switch (note.type) {
            case 'note-video':
                return <input required placeholder="enter video url" name="url" onChange={this.handleChange} value={this.state.note.info.url || ''} />
            case 'note-img':
                return <input required placeholder="enter image url" name="url" onChange={this.handleChange} value={this.state.note.info.url || ''} />
            case 'note-todos':
                return <TodosEdit onUpdateTodos={this.onUpdateTodos} handleChange={this.handleChangeTodo} onAddTodo={this.onAddTodo} onRemoveTodo={this.onRemoveTodo} todos={note.info.todos} />
            default:
                return null
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState(prevState => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }))
    }

    handleChangeTodo = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        const idx = +ev.target.dataset.idx
        const noteCopy = JSON.parse(JSON.stringify(this.state.note))
        noteCopy.info.todos[idx][field] = value
        this.setState({ note: noteCopy })
    }

    onAddTodo = () => {
        const noteCopy = JSON.parse(JSON.stringify(this.state.note))
        noteCopy.info.todos.push({ txt: '', isDone: false })
        this.setState({ note: noteCopy })
    }

    onRemoveTodo = (todoIdx) => {
        const noteCopy = JSON.parse(JSON.stringify(this.state.note))
        noteCopy.info.todos.splice(todoIdx, 1)
        this.setState({ note: noteCopy })
    }

    onSubmit = () => {
        const updatedNote = this.state.note
        this.props.onUpdateNote(updatedNote)
        this.props.history.push('/keep')
    }

    onCancel = () => { this.props.history.push('/keep') }

    render() {
        const { note } = this.state
        if (!note) return <div>loading...</div>
        return (
            <React.Fragment>
                <div className="screen"></div>
                <section className="note-edit">
                    <button className="close-btn" onClick={this.onCancel}></button>
                    <form onSubmit={this.onSubmit}>
                        <span>Title:</span><input type="text" name="title" placeholder="Add title" onChange={this.handleChange} value={note.info.title || ''} />
                        <this.DynamicInput note={note} />
                        <textarea rows="3" name="txt" placeholder={`Enter text ...`} onChange={this.handleChange} value={note.info.txt || ''} />
                        <div className="control-buttons">
                            <button>Save</button>
                            <button onClick={this.onCancel}>Cancel</button>
                        </div>
                    </form>
                </section>
            </React.Fragment>
        )
    }
}