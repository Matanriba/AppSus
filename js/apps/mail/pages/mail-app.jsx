const { Link, Switch, Route } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus-service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailDetails } from "./mail-details.jsx"
import { MailSearch } from "../cmps/mail-search.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"

export class MailApp extends React.Component {
    state = {
        mails: [],
        criteria: {
            status: 'inbox',
            txt: '',
            isRead: null,
            isStarred: null
        },
        isNavMenuOpen: false
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

    onSetSearch = ({ txt, isRead }) => {
        this.setState(prevState => ({ criteria: { ...prevState.criteria, txt, isRead } }))
    }

    setCriteriaStatus = (status) => {
        this.setState(prevState => ({ criteria: { ...prevState.criteria, status } }))
    }

    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId)
        eventBusService.emit('user-msg', { txt: 'Message Removed', type: 'danger' })
        this.loadMails()
    }

    onToggleIsRead = (mailId) => {
        mailService.toggleReadMailPreview(mailId)
        this.loadMails()
    }

    onUnRemove = (mailId) => {
        mailService.sendMailToInbox(mailId)
        eventBusService.emit('user-msg', { txt: 'Message moved back to Inbox', type: 'success' })
        this.loadMails()
    }

    onStar = (mailId) => {
        mailService.toggleMailIsStarred(mailId)
        this.loadMails()
    }

    onOpenMenu = () => {
        this.setState((prevState) => ({ isNavMenuOpen: !prevState.isNavMenuOpen }));
    }

    render() {
        const { mails, isNavMenuOpen } = this.state
        const { location } = this.props
        return (
            <section className="mail-app-container flex column">
                <div className="mail-app mail-search">
                    <MailSearch onOpenMenu={this.onOpenMenu} onSetSearch={this.onSetSearch} />
                </div>
                <div className="mail-app-main flex">
                    <MailNav isNavMenuOpen={isNavMenuOpen} onOpenMenu={this.onOpenMenu} setCriteriaStatus={this.setCriteriaStatus} />
                    <Switch>
                        <Route path="/mail/:status/:mailId" render={(props) => <MailDetails onStar={this.onStar} onUnRemove={this.onUnRemove} onToggleIsRead={this.onToggleIsRead} onRemoveMail={this.onRemoveMail} {...props} />} />
                        <Route path={`${location.pathname}`} render={() => <MailList onStar={this.onStar} onToggleIsRead={this.onToggleIsRead} onRemoveMail={this.onRemoveMail} mails={mails} />} />
                    </Switch>
                </div>
            </section>
        )
    }
}