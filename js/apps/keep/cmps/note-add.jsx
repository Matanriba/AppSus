export class NoteAdd extends React.Component {
    state = {
        note: {
            type: 'note-txt',
            title: '',
            txt: '',
        },
        isClicked: false
    }

    onToggleFormClicked = () => {
        console.log('isClicked:', this.state.isClicked)
        const isClicked = this.state.isClicked
        this.setState({ isClicked: !isClicked })
    }

    getPlaceHolderTxt = () => {
        switch (this.state.type) {
            case 'note-txt':
                return 'note text'
            case 'note-video':
                return 'Youtube URL'
            case 'note-todos':
                return 'comma separated list'
            case 'note-img':
                return 'image URL'
        }
    }

    onChangeNoteType = (ev, type) => {
        ev.preventDefault()
        this.setState(prevState => ({note: {...prevState.note, type} }))
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState(prevState => ({note: {...prevState.note, [field]: value}}))
    }

    DynamicInput = (props) => {
        console.log('props: ', props)
        switch (props.noteType) {
            case 'note-video':
                return <input placeholder="enter video url" name="url" onChange={this.handleChange} value={this.state.note.url || ''}/>
            case 'note-img':
                return <input placeholder="enter image url" name="url" onChange={this.handleChange} value={this.state.note.url || ''}/>
            case 'note-todos':
                return <input placeholder="enter comma seperated list" name="todos" onChange={this.handleChange} value={this.state.note.todos || ''}/>
            default:
                return null
        }
    }
    render() {

        const {note, isClicked } = this.state
        const { type, title, input, txt} = note
        const {onSubmit} = this.props
        return (
            <form className="new-note" onSubmit={(ev)=>{
                ev.preventDefault()
                onSubmit(note)
            }
            }>
                 <this.DynamicInput noteType={type}/>
                {!isClicked && <input type='text' placeholder='Add new note...' onFocus={this.onToggleFormClicked} />}
                {isClicked &&
                    <React.Fragment>
                        <input type="text" name="title" placeholder="Add title" onChange={this.handleChange} />
                        {/* {type !== 'note-txt' && <input type="text" name="note-input" placeholder={`Enter ${this.getPlaceHolderTxt()}...`} onChange={this.handleChange} />} */}
                        <input type="text" name="txt" placeholder={`Enter text...`} onChange={this.handleChange} />
                        <div className="choose-note-type">
                            <button onClick={(ev) => this.onChangeNoteType(ev, 'note-txt')}>Txt</button>
                            <button onClick={(ev) => this.onChangeNoteType(ev, 'note-todos')}>List</button>
                            <button onClick={(ev) => this.onChangeNoteType(ev, 'note-img')}>Img</button>
                            <button onClick={(ev) => this.onChangeNoteType(ev, 'note-video')}>Vid</button>
                        </div>
                        <button>Add note</button>
                        <button onClick={this.onToggleFormClicked} >Cancel</button>
                    </React.Fragment>
                }
            </form >
        )
    }
}