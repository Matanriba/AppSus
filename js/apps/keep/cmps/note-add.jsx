export class NoteAdd extends React.Component {
    state = {
        note: {
            type: 'note-txt',
            info: {
                title: '',
                txt: ''
            }
        },
        isClicked: false
    }

    onToggleFormClicked = () => {
        const isClicked = this.state.isClicked
        this.setState({ isClicked: !isClicked })
    }

    onChangeNoteType = (ev, type) => {
        ev.preventDefault()
        // change type, keep title+txt info only
        const title = this.state.note.info.title
        const txt = this.state.note.info.txt
        this.setState({ note: { type, info: { title, txt } } })
        // didn't manage to do it with prevState... :(
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState(prevState => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }))
    }

    DynamicInput = (props) => {
        switch (props.noteType) {
            case 'note-video':
                return <input required placeholder="enter video url" name="url" onChange={this.handleChange} value={this.state.note.info.url || ''} />
            case 'note-img':
                return <input required placeholder="enter image url" name="url" onChange={this.handleChange} value={this.state.note.info.url || ''} />
            case 'note-todos':
                return <input required placeholder="enter comma seperated list" name="todos" onChange={this.handleChange} value={this.state.note.info.todos || ''} />
            default:
                return null
        }
    }

    resetNote = () => {
        this.setState({
            note: {
                type: 'note-txt',
                info: {
                    title: '',
                    txt: ''
                }
            },
            isClicked: false
        })
    }

    setTodosFromList = (commaSepList) => {
        const todos = commaSepList.split(',').map(todo => ({ txt: todo.trim(), isDone: false }))
        this.state.note.info.todos = todos
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { note } = this.state
        console.log('note:', note)
        const infoVals = Object.values(note.info);
        const hasInfo = infoVals.some(val => (val))
        if (hasInfo) {
            if (note.type === 'note-todos') this.setTodosFromList(note.info.todos)
            const { onAddNote } = this.props
            onAddNote(note)
        }
        this.resetNote()
    }

    render() {
        const { note, isClicked } = this.state
        const { type } = note
        return (
            <form className="new-note" onSubmit={this.onSubmit}>
                {!isClicked && <input type='text' placeholder='Add new note...' onFocus={this.onToggleFormClicked} />}
                {isClicked &&
                    <React.Fragment>
                        <input type="text" name="title" placeholder="Add title" onChange={this.handleChange} value={note.info.title || ''} />
                        <textarea rows="3" name="txt" placeholder={`Enter text ...`} onChange={this.handleChange} value={note.info.txt || ''} />
                        <this.DynamicInput noteType={type} />
                        <div className="new-note-controls">
                            <div className="choose-type">
                                <span className="icon-container" title="text" onClick={(ev) => this.onChangeNoteType(ev, 'note-txt')}>
                                    <img className="icon" src="../../../../assets/svg/keep/note-txt.svg" />
                                </span>
                                <span className="icon-container" title="checklist" onClick={(ev) => this.onChangeNoteType(ev, 'note-todos')}>
                                    <img className="icon" src="../../../../assets/svg/keep/note-todos.svg" />
                                </span>
                                <span className="icon-container" title="image" onClick={(ev) => this.onChangeNoteType(ev, 'note-img')}>
                                    <img className="icon" src="../../../../assets/svg/keep/note-img.svg" />
                                </span>
                                <span className="icon-container" title="video" onClick={(ev) => this.onChangeNoteType(ev, 'note-video')}>
                                    <img className="icon" src="../../../../assets/svg/keep/note-video.svg" />
                                </span>
                            </div>
                            <div className="control-buttons">
                                <button>Keep note</button>
                                <button onClick={this.onToggleFormClicked} >Close</button>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </form >
        )
    }
}