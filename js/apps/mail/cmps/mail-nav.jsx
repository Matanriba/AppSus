const { Link } = ReactRouterDOM

export function MailNav({ setCategoryStatus }) {
    return (
        <nav className="mail-nav flex column">
            <Link to="/mail/inbox" onClick={() => { setCategoryStatus('inbox') }}>Inbox</Link>
            <Link to="/mail/sent" onClick={() => { setCategoryStatus('sent') }}>Sent</Link>
            <Link to="/mail/starred">Starred</Link>
            <Link to="/mail/trash" onClick={() => { setCategoryStatus('trash') }}>Trash</Link>
        </nav>
    )
}