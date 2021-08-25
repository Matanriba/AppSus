const { Link, Switch, Route } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus-service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailDetails } from "./mail-details.jsx"

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: null,
        searchBy: null,
        criteria: {
            status: 'inbox',
            txt: '',
            isRead: null,
            isStarred: null
        }
    }

    componentDidMount() {
        this.loadMails()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.criteria !== prevState.criteria) {
            this.loadMails()
        }
    }

    loadMails = () => {
        const { criteria } = this.state
        mailService.query(criteria).then((mails) => {
            this.setState({ mails })
        })
    }

    setCategoryStatus = (status) => {
        this.setState(prevState => ({ criteria: { ...prevState.criteria, status } }))
    }

    setReadMail = () => {

    }

    render() {
        const { mails, filterBy } = this.state

        return (
            <section className='mail-app flex'>
                <MailNav setCategoryStatus={this.setCategoryStatus} />
                <Switch>
                    <Route exact path="/mail/:status/:mailId" render={() => <MailDetails />} />
                    <Route exact path="/mail/inbox" render={() => <MailList filterBy={filterBy} mails={mails} />} />
                    <Route exact path="/mail/sent" render={() => <MailList mails={mails} />} />
                    <Route exact path="/mail/starred" render={() => <MailList mails={mails} />} />
                    <Route exact path="/mail/trash" render={() => <MailList mails={mails} />} />
                </Switch>
            </section>
        )
    }
}