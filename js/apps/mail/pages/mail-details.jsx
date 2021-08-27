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
        console.log(id)
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
        console.log(mail)
        if (!mail) return <div>Loading...</div>
        return (
            <article className='mail-details'>
                <button className='back-btn' onClick={this.onBack}>{`<---`}</button>
                <h3>From: {mail.from} </h3>
                <small>At: {utilService.timestampConverter(mail.sentAt)}</small>
                <h2>{mail.subject}</h2>
                <p>{mail.body}</p>
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