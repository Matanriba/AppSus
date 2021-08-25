const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { MailApp } from "./apps/mail/pages/mail-app.jsx"

export function App() {
    return (
        <Router>
            <header>
                header
            </header>
            <main>
                <Switch>
                    <Route path="/mail" component={MailApp}/>
                </Switch>
            </main>
            <footer>
                footeR
            </footer>
        </Router>
    )
}