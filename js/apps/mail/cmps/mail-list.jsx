import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail, onToggleIsRead, onStar }) {
    if (!mails) return <p>Nothing to show here...</p>
    return (
        <div className="mail-list">
            {mails.map(mail => <MailPreview onStar={onStar} onToggleIsRead={onToggleIsRead} onRemoveMail={onRemoveMail} key={mail.id} mail={mail} />)}
        </div>
    )
}
