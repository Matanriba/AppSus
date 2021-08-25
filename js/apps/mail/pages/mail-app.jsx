const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus-service.js"
import { MailList } from "../cmps/mail-list.jsx"

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadMails();
    }

    loadMails = () => {
        mailService.query().then((mails) => {
            this.setState({ mails })
        })
    }
    
    
    render() {
        const { mails, filterBy } = this.state
        
        return (
            <section className='mail-app'>
                <h1>Mail App!</h1>
                <MailList mails={mails} />
            </section>
        )
    }
}