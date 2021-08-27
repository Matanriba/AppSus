import { mailService } from "../services/mail.service.js"

export class MailCompose extends React.Component {
    state = {
        isActive: false,
        composeData: {
            to: '',
            subject: '',
            body: ''
        }
    }

    onToggleActive = () => {
        this.setState((prevState) => ({ isActive: !prevState.isActive }));
        this.setState((prevState) => ({ composeData: { ...prevState.composeData, to: '', subject: '', body: '' } }));
    };

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ composeData: { ...prevState.composeData, [field]: value } }))
    }

    onAddMail = (ev) => {
        ev.preventDefault()
        mailService.addMail(this.state.composeData)
        this.onToggleActive()
    }


    render() {
        const { to, subject, body } = this.state.composeData

        return (

            <section className="mail-add">
                {this.state.isActive && (
                    <form className="mail-compose flex column" onSubmit={this.onAddMail}>
                        <div className="compose-header flex">
                            <small>New Message</small>
                            <button onClick={this.onToggleActive}>X</button>
                        </div>
                        <div className="compose-input to flex">
                            <label htmlFor="to"></label>
                            <input required type="email" name="to" id="to" value={to} onChange={this.handleChange} placeholder="To:" />
                        </div>
                        <div className="compose-input subject flex">
                            <label htmlFor="subject"></label>
                            <input required type="text" name="subject" id="subject" value={subject} onChange={this.handleChange} placeholder="Subject:" />
                        </div>
                        <div className="compose-input body flex">
                            <label htmlFor="body"></label>
                            <textarea required type="text" name="body" id="body" value={body} onChange={this.handleChange} />
                        </div>

                        <button className="send-btn">Send!</button>
                    </form>
                )}
                <button className="compose-btn" onClick={this.onToggleActive}>🚀 Compose</button>
            </section>
        )
    }
}