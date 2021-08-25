export class MailSearch extends React.Component {
    state = {
        searchBy: {
            txt: '',
            isRead: ''
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ searchBy: { ...this.state.searchBy, [field]: value } }, () => {
            this.props.onSetSearch(this.state.searchBy)
        })
    }

    render() {
        const { txt, isRead } = this.state.searchBy

        return (
            <form className='mail-search flex'>
                <input type="text" name="txt" id="txt" value={txt} placeholder="Search Mail" onChange={this.handleChange} />
                <select name="isRead" id="isRead" value={isRead} onChange={this.handleChange} >
                    <option value=''>All</option>
                    <option value='read'>Read</option>
                    <option value='unread'>Unread</option>
                </select>
            </form>
        )
    }
}