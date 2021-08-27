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
        // this.setState(prevState => ({ note: {type, info: { ...prevState.note.info.title } }}))

    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState(prevState => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }))
    }


    DynamicInput = (props) => {
        switch (props.noteType) {
            case 'note-video':
                return <input placeholder="enter video url" name="url" onChange={this.handleChange} value={this.state.note.info.url || ''} />
            case 'note-img':
                return <input placeholder="enter image url" name="url" onChange={this.handleChange} value={this.state.note.info.url || ''} />
            case 'note-todos':
                return <input placeholder="enter comma seperated list" name="todos" onChange={this.handleChange} value={this.state.note.info.todos || ''} />
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

    getTodosFromTxt = () => {
        const { todoTxt } = this.state.note.info.todos
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const noteInfo = this.state.note.info

        const { onAddNote } = this.props
        const { note } = this.state
        onAddNote(note)
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
                        <input type="text" name="txt" placeholder={`Enter text...`} onChange={this.handleChange} value={note.info.txt || ''} />
                        <this.DynamicInput noteType={type} />
                        <div className="new-note-controls">
                            <div className="choose-type">
                                <span className="icon-container" title="text" onClick={(ev) => this.onChangeNoteType(ev, 'note-txt')}>
                                    <img src="../../../../assets/svg/keep/note-txt.svg" />
                                </span>
                                <span className="icon-container" title="checklist" onClick={(ev) => this.onChangeNoteType(ev, 'note-todos')}>
                                    <img src="../../../../assets/svg/keep/note-todos.svg" />
                                </span>
                                <span className="icon-container" title="image" onClick={(ev) => this.onChangeNoteType(ev, 'note-img')}>
                                    <img src="../../../../assets/svg/keep/note-img.svg" />
                                </span>
                                <span className="icon-container" title="video" onClick={(ev) => this.onChangeNoteType(ev, 'note-video')}>
                                    <img src="../../../../assets/svg/keep/note-video.svg" />
                                </span>
                            </div>
                            <div className="control-buttons">
                                <button>Add note</button>
                                <button onClick={this.onToggleFormClicked} >Cancel</button>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </form >
        )
    }
}

// import {} from '../../../../assets/svg/keep/'