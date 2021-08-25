const { Link, Switch, Route } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus-service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailDetails } from "./mail-details.jsx"
import { MailSearch } from "../cmps/mail-search.jsx"

export class MailApp extends React.Component {
    state = {
        mails: [],
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

    onSetSearch = ({txt, isRead}) => {
        this.setState(prevState => ({ criteria: { ...prevState.criteria, txt, isRead } }))
    }

    setCategoryStatus = (status) => {
        this.setState(prevState => ({ criteria: { ...prevState.criteria, status } }))
    }

    render() {
        const { mails } = this.state

        return (
            <section className='mail-app flex column'>
                <MailSearch onSetSearch={this.onSetSearch} />
                <div className="mail-main flex">
                <MailNav setCategoryStatus={this.setCategoryStatus} />
                <Switch>
                    <Route exact path="/mail/inbox" render={(props) => <MailList {...props} mails={mails} />} />
                    <Route exact path="/mail/sent" render={(props) => <MailList {...props} mails={mails} />} />
                    <Route exact path="/mail/starred" render={(props) => <MailList {...props} mails={mails} />} />
                    <Route exact path="/mail/trash" render={(props) => <MailList {...props} mails={mails} />} />
                    <Route exact path="/mail/:status/:mailId" render={(props) => <MailDetails {...props} />} />
                </Switch>
                </div>
            </section>
        )
    }
}