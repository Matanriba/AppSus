const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="flex space-between align-center">
            <Link to="/"><h1>AppSus.</h1></Link>
            <nav>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/mail/inbox" >Mail</NavLink>
                <NavLink to="/keep" >Keep</NavLink>
            </nav>
        </header>
    )
}