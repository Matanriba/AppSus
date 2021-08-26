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

    setCriteriaStatus = (status) => {
        this.setState(prevState => ({ criteria: { ...prevState.criteria, status } }))
    }

    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId)
        this.loadMails()
    }

    onToggleIsRead = (mailId) => {
        mailService.toggleReadMailPreview(mailId)
        this.loadMails()
    }

    render() {
        const { mails } = this.state
        const {location} = this.props
        console.log('location:', location)
        return (
            <section className='mail-app flex column'>
                <MailSearch onSetSearch={this.onSetSearch} />
                <div className="mail-main flex">
                <MailNav setCriteriaStatus={this.setCriteriaStatus} />
                <Switch>
                    <Route path="/mail/:status/:mailId" render={(props) => <MailDetails {...props} />} />
                    {/* <Route path={`${location.pathname}/:mailId`} render={(props) => <MailDetails {...props} />} /> */}
                    <Route path={`${location.pathname}`} render={() => <MailList onToggleIsRead={this.onToggleIsRead} onRemoveMail={this.onRemoveMail} mails={mails} />} />
                </Switch>
                </div>
            </section>
        )
    }
}