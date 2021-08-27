const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="header-container flex space-between align-center main-layout">
            <Link to="/"><h1>AppSus.</h1></Link>
            <nav>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/mail/inbox" >Mail</NavLink>
                <NavLink to="/keep" >Keep</NavLink>
            </nav>
        </header>
    )
}