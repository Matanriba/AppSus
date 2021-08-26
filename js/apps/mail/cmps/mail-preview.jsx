import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail, onToggleIsRead }) {

    return (
        <article className={`mail-preview ${(mail.isRead ? 'read' : '')}`}>
            <Link className="mail-preview-link" to={`/mail/${mail.status}/${mail.id}`}>
                <p>{mail.from} </p>
                <p>{(mail.subject.length > 10) ? mail.subject.substring(15) + '...' : mail.subject}</p>
                <p>{(mail.body.length > 10) ? mail.body.substring(0,20) + '...' : mail.body}</p>
                <p>{utilService.timestampConverter(mail.sentAt)}</p>
            </Link>
            <div className="preview-btns">
            <button onClick={() => onRemoveMail(mail.id)}>🗑</button>
            <button onClick={() => onToggleIsRead(mail.id)}>✉</button>
            </div>
        </article>
    )
}