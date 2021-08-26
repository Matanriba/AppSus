const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onToggleIsRead }) {

    return (
        <article className={`mail-preview ${(mail.isRead ? 'read' : '')}`}>
            <Link className="mail-preview-link" to={`/mail/${mail.status}/${mail.id}`}>
                <p>{mail.from} </p>
                <p>{mail.subject}</p>
                <p>{mail.body}</p>
                <p>{mail.sentAt}</p>
            </Link>
            <div className="preview-btns">
            <button onClick={() => onRemoveMail(mail.id, event)}>🗑</button>
            <button onClick={() => onToggleIsRead(mail.id)}>✉</button>
            </div>
        </article>
    )
}