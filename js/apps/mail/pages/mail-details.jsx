import { mailService } from "../services/mail.service.js"

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
        mailService.getMailById(id)
            .then(mail => {
                if (!mail) this.props.history.push('/mail/inbox')
                this.setState({ mail })
            })
    }

    render() {
        const { mail } = this.state
        if (!mail) return <div>Loading...</div>
        return (
            <article className='mail-details'>
                <h1>{mail.from} </h1>
                <h2>{mail.subject}</h2>
                <h3>{mail.body}</h3>
            </article>
        )
    }
}