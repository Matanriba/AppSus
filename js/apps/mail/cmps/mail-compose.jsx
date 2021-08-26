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
    };

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ composeData: { ...prevState.composeData, [field]: value } }))
    }

    onAddMail = (ev) => {
        ev.preventDefault()
        mailService.addMail(this.state.composeData)
    }


    render() {
        const { to, subject, body } = this.state.composeData

        return (

            <section className="mail-add">
                {this.state.isActive && (
                    <form className="mail-compose flex column" onSubmit={this.onAddMail}>
                        <div className="compose-input to flex">
                        <label htmlFor="to">To: </label>
                        <input required type="email" name="to" id="to" value={to} onChange={this.handleChange} />
                        </div>
                        <div className="compose-input subject flex">
                        <label htmlFor="subject">Subject: </label>
                        <input required type="text" name="subject" id="subject" value={subject} onChange={this.handleChange} />
                        </div>
                        <div className="compose-input body flex">
                        <label htmlFor="body">Body: </label>
                        <input required type="text" name="body" id="body" value={body} onChange={this.handleChange} />
                        </div>

                        <button>Send!</button>
                    </form>
                    )}
                    <button className="compose-btn" onClick={this.onToggleActive}>Compose</button>
            </section>
        )
    }
}