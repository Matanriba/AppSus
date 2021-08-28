import { MailCompose } from "./mail-compose.jsx"

const { Link } = ReactRouterDOM

export function MailNav({ setCriteriaStatus, onOpenMenu, isNavMenuOpen }) {

    return (
        <nav className={`side-bar ${(isNavMenuOpen) ? 'nav-menu-open' : ''}`}>
            <div className="mail-nav flex column">
                <div className="compose-btn"><MailCompose /></div>
                <ul className="mail-nav-links flex column">
                    <li><Link to="/mail/inbox" onClick={() => { setCriteriaStatus('inbox') }}>Inbox</Link></li>
                    <li><Link to="/mail/sent" onClick={() => { setCriteriaStatus('sent') }}>Sent</Link></li>
                    <li><Link to="/mail/starred" onClick={() => { setCriteriaStatus('starred') }}>Starred</Link></li>
                    <li><Link to="/mail/trash" onClick={() => { setCriteriaStatus('trash') }}>Trash</Link></li>
                    <button className="back-button" onClick={() => { onOpenMenu() }}><img className="trash-img" src="../../assets/svg/mail/back-arrow.svg" /></button>
                </ul>

            </div>
        </nav>
    )
}