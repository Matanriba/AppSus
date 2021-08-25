

export function MailPreview({mail}) {
    return (
        <article className='mail-preview'>
            <h1>From: {mail.from} </h1>
            <h2>Subject: {mail.subject}</h2>
            <h3>Body: {mail.body}</h3>
            <p>Sent at: {mail.sentAt}</p>
        </article>
    )
}