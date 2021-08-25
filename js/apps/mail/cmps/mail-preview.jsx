const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    return (
        <Link to={`/mail/${mail.status}/${mail.id}`}>
            <article className={`mail-preview ${(mail.isRead ? 'read' : '')}`}>
                <p>{mail.from} </p>
                <p>{mail.subject}</p>
                <p>{mail.body}</p>
                <p>{mail.sentAt}</p>
            </article>
        </Link>
    )
}