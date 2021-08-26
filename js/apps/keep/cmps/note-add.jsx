export class NoteAdd extends React.Component {
    state = {
        noteType: 'note-txt',
        title: '',
        input: '',
        isClicked: false
    }

    onToggleFormClicked = () => {
        console.log('isClicked:', this.state.isClicked)
        const isClicked = this.state.isClicked
        this.setState({ isClicked: !isClicked })
    }

    getPlaceHolderTxt = () => {
        switch (this.state.noteType) {
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

    onChangeNoteType = (ev, noteType) => {
        ev.preventDefault()
        this.setState({ noteType })
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        console.log('field:', field, 'val:', value)
    }

    render() {
        const { noteType, title, input, style, isClicked } = this.state

        return (
            <form className="new-note">
                {!isClicked && <input type='text' placeholder='Add new note...' onFocus={this.onToggleFormClicked} onBlur={this.onToggleFormClicked} />}
                {isClicked &&
                    <React.Fragment>
                        <input type="text" name="title" placeholder="Add title" onChange={this.handleChange} />
                        <input type="text" name="note-input" placeholder={`Enter ${this.getPlaceHolderTxt()}...`} onChange={this.handleChange} />
                        <div className="choose-note-type">
                            <button onClick={(ev) => this.onChangeNoteType(ev, 'note-txt')}>Txt</button>
                            <button onClick={(ev) => this.onChangeNoteType(ev, 'note-todos')}>List</button>
                            <button onClick={(ev) => this.onChangeNoteType(ev, 'note-img')}>Img</button>
                            <button onClick={(ev) => this.onChangeNoteType(ev, 'note-video')}>Vid</button>
                        </div>
                        <button>Add note</button>
                    </React.Fragment>
                }
            </form >
        )
    }
}