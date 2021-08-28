import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail, onToggleIsRead, onStar }) {

    return (
        <article className={`mail-preview ${(mail.isRead ? 'read' : '')}`}>
            <Link className="mail-preview-link" to={`/mail/${mail.status}/${mail.id}`}>
                <div className="from-initials">
                    <h4>{mail.from.substring(0, 1)}</h4>
                </div>
                <ul className="mail-preview-content">
                    <li><p>{mail.from} </p></li>
                    <li><p>{(mail.subject.length > 15) ? mail.subject.substring(0, 15) + '...' : mail.subject}</p></li>
                    <li><p>{(mail.body.length > 20) ? mail.body.substring(0, 20) + '...' : mail.body}</p></li>
                </ul>
            </Link>
            <div className="preview-btns">
                <p>{utilService.timestampConverter(mail.sentAt)}</p>
                <button className="remove-mail-btn" onClick={() => onRemoveMail(mail.id)}><img className="trash-img" src="././assets/svg/mail/trash.svg" /></button>
                <button className="read-mail-btn" onClick={() => onToggleIsRead(mail.id)}><img className="envelope-img" src={(mail.isRead) ? '././assets/svg/mail/envelope-opened.svg' : '././assets/svg/mail/envelope-closed.svg'} /></button>
                <button className="star-mail-btn" onClick={() => onStar(mail.id)}><img className="star-img" src={(mail.isStarred) ? '././assets/svg/star-active.svg' : '././assets/svg/star-disabled.svg'} /></button>
            </div>
        </article>
    )
}