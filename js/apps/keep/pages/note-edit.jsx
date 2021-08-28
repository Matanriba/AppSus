export class NoteEdit extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    render() {
        const {note} = this.state
        if (!note) return <div>loading...</div>
        return (
            <div className="note-edit">edit {JSON.stringify(note)}</div>
        )
    }
}