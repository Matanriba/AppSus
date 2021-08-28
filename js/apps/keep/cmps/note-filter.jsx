export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            search: '',
            type: null
        }
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, search: value } }),
            () => { this.props.onSetFilter(this.state.filterBy) })
    }

    changeType = (type) => {
        const currType = this.state.filterBy.type
        if (type === currType) {
            this.setState(prevState => ({ filterBy: { ...prevState.filterBy, type: null } }),
                () => { this.props.onSetFilter(this.state.filterBy) })
            return
        }
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, type } }),
            () => { this.props.onSetFilter(this.state.filterBy) })
    }

    render() {
        const { filterBy } = this.state
        return (
            <div>
                <div className="note-filter">
                    <span>Filter By:</span>
                    <div className="note-types">
                        <button className={`note-type-btn ${(filterBy.type === 'note-txt') ? "selected" : ""}`} onClick={() => this.changeType('note-txt')}>
                            <img className="icon" src="./assets/svg/keep/note-txt.svg" />
                        </button>
                        <button className={`note-type-btn ${(filterBy.type === 'note-todos') ? "selected" : ""}`} onClick={() => this.changeType('note-todos')}>
                            <img className="icon" src="./assets/svg/keep/note-todos.svg" />
                        </button>
                        <button className={`note-type-btn ${(filterBy.type === 'note-img') ? "selected" : ""}`} onClick={() => this.changeType('note-img')}>
                            <img className="icon" src="./assets/svg/keep/note-img.svg" />
                        </button>
                        <button className={`note-type-btn ${(filterBy.type === 'note-video') ? "selected" : ""}`} onClick={() => this.changeType('note-video')}>
                            <img className="icon" src="./assets/svg/keep/note-video.svg" />
                        </button>
                    </div>
                </div>
                <input className="note-search" type="text" name="search" placeholder="Search notes..." value={filterBy.search} onChange={this.handleChange} />
            </div>
        )
    }
}