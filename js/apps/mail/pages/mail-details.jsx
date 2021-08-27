import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {
    state = {
        mail: null,
    }

    componentDidMount() {
        this.loadMail()
    }


    loadMail = () => {
        const id = this.props.match.params.mailId
        mailService.setMailAsRead(id)
        mailService.getMailById(id)
            .then(mail => {
                if (!mail) this.props.history.push('/mail/inbox')
                this.setState({ mail })
            })
    }

    onBack = () => {
        this.props.history.push(`/mail/${this.state.mail.status}`)
    }

    render() {
        const { mail } = this.state
        if (!mail) return <div>Loading...</div>
        return (
            <article className="mail-details">
                <div className="details-btns flex">
                    <div className="left-btn">
                        <button className="back-btn" onClick={this.onBack}>{`<---`}</button>
                    </div>
                    <div className="right-btns">
                        <button onClick={() => this.props.onStar(mail.id)} title="Mark As Starred">
                            <img className="star-img" src={(mail.isStarred) ? '../../assets/img/star-full.png' : '../../assets/img/star-empty.png'} />
                        </button>
                        <button title="Mark As Unread" onClick={() => this.props.onToggleIsRead(mail.id)}>✉</button>
                        <button title="Remove Message" onClick={() => this.props.onRemoveMail(mail.id)}>🗑</button>
                        {mail.status.includes('trash') &&
                            <button className="to-inbox-btn" title="Send Back to Inbox" onClick={() => this.props.onUnRemove(mail.id)}>🚀</button>
                        }
                    </div>
                </div>
                <div className="mail-details-content flex column">
                    <div className="mail-details-header">
                        <h3>From: {mail.from} </h3>
                        <small>At: {utilService.timestampConverter(mail.sentAt)}</small>
                    </div>
                    <h2 className="mail-details-subject">{mail.subject}</h2>
                    <p className="mail-details-body">{mail.body}</p>
                </div>
            </article>
        )
    }
}

// id: 'e107',
// from: 'Beth Smithasd',
// subject: 'Holy Crap!',
// body: 'Would losdfgsdfgve to catch up sometimes',
// to: 'momo@momo.com',
// status: 'inbox',