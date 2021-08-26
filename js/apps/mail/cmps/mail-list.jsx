import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail, onToggleIsRead }) {
    return (
        <div className="mail-list">
            {mails.map(mail => <MailPreview onToggleIsRead={onToggleIsRead} onRemoveMail={onRemoveMail} key={mail.id} mail={mail} />)}
        </div>
    )
}
