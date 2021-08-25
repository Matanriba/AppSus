const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Redirect } = ReactRouterDOM

import { AppHeader } from "./cmps/app-header.jsx"
import { Home } from "./pages/app-home.jsx"
import { About } from "./pages/app-about.jsx"
import { MailApp } from "./apps/mail/pages/mail-app.jsx"
import { NoteApp } from "./apps/keep/pages/note-app.jsx"
import { AppFooter } from "./cmps/app-foorer.jsx"

export function App() {
    return (
        <Router>
            <AppHeader />
            <main>
                <Switch>
                    <Route path="/keep" component={NoteApp}/>
                    <Route path="/mail" component={MailApp}/>
                    <Route path="/about" component={About}/>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </main>
           <AppFooter />
        </Router>
    )
}