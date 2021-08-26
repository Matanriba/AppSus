import { mailService } from "../services/mail.service.js"

export class MailCompose extends React.Component {
    state = {
        composeData: {
            to: '',
            subject: '',
            body: ''
        }
    }


    render() {

        return (

            <section>
                Compose Mail!
            </section>
        )
    }
}