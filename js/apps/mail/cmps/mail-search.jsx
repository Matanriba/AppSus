import { MailCompose } from "./mail-compose.jsx"

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
            <section className='mail-search flex'>
                <button className="hamburger-btn" onClick={this.props.onOpenMenu}>☰</button>
                <form className="search-form flex">
                    <input type="text" name="txt" id="txt" value={txt} placeholder="Search Mail" onChange={this.handleChange} />
                    <select name="isRead" id="isRead" value={isRead} onChange={this.handleChange} >
                        <option value=''>All</option>
                        <option value='read'>Read</option>
                        <option value='unread'>Unread</option>
                    </select>
                </form>
            </section>
        )
    }
}