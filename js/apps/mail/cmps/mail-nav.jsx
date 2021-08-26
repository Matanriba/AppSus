const { Link } = ReactRouterDOM

export function MailNav({ setCriteriaStatus }) {
    return (
        <nav className="mail-nav flex column">
            <Link to="/mail/inbox" onClick={() => { setCriteriaStatus('inbox') }}>Inbox</Link>
            <Link to="/mail/sent" onClick={() => { setCriteriaStatus('sent') }}>Sent</Link>
            <Link to="/mail/starred">Starred</Link>
            <Link to="/mail/trash" onClick={() => { setCriteriaStatus('trash') }}>Trash</Link>
        </nav>
    )
}