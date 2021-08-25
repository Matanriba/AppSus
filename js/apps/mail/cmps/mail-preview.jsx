const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return (
        <Link to={`/mail/${mail.status}/${mail.id}`}>
            <article className='mail-preview'>
                <h1>{mail.from} </h1>
                <h2>{mail.subject}</h2>
                <h3>{mail.body}</h3>
                <p>{mail.sentAt}</p>
            </article>
        </Link>
    )
}