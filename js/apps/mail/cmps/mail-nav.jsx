import { MailCompose } from "./mail-compose.jsx"

const { Link } = ReactRouterDOM

export function MailNav({ setCriteriaStatus }) {

    return (
        <nav className="side-bar">
            <ul className="mail-nav flex column">
                <li><MailCompose /></li>
                <li><Link to="/mail/inbox" onClick={() => { setCriteriaStatus('inbox') }}>Inbox</Link></li>
                <li><Link to="/mail/sent" onClick={() => { setCriteriaStatus('sent') }}>Sent</Link></li>
                <li><Link to="/mail/starred" onClick={() => { setCriteriaStatus('starred') }}>Starred</Link></li>
                <li><Link to="/mail/trash" onClick={() => { setCriteriaStatus('trash') }}>Trash</Link></li>
            </ul>
        </nav>
    )
}