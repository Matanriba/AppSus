import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail, onToggleIsRead, onStar }) {

    return (
        <article className={`mail-preview ${(mail.isRead ? 'read' : '')}`}>
            <Link to={`/mail/${mail.status}/${mail.id}`}>
                <ul className="mail-preview-content flex">
                    <li><h4>{mail.from.substring(0, 1)}</h4></li>
                    <li><p>{mail.from} </p></li>
                    <li><p>{(mail.subject.length > 15) ? mail.subject.substring(0, 15) + '...' : mail.subject}</p></li>
                    <li><p>{(mail.body.length > 20) ? mail.body.substring(0, 20) + '...' : mail.body}</p></li>
                    <li><p>{utilService.timestampConverter(mail.sentAt)}</p></li>
                </ul>
            </Link>
            <div className="preview-btns">
                <button onClick={() => onRemoveMail(mail.id)}>🗑</button>
                <button onClick={() => onToggleIsRead(mail.id)}>✉</button>
                <button onClick={() => onStar(mail.id)}><img className="star-img" src={(mail.isStarred) ? '../../assets/img/star-full.png' : '../../assets/img/star-empty.png'} /></button>
            </div>
        </article>
    )
}