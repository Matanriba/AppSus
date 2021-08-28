const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="header-container flex space-between align-center main-layout">
            <Link to="/"><h1>AppSus.</h1></Link>
            <div className="main-menu">
                <button className="menu-btn"></button>
                <nav className="dropdown-content">
                    <NavLink to="/keep" ><button className="btn keep-btn" title="Keep"></button></NavLink>
                    <NavLink to="/mail/inbox" ><button className="btn mail-btn" title="Mail"></button></NavLink>
                    <NavLink to="/books"><button className="btn books-btn" title="Books"></button></NavLink>
                    <NavLink to="/about" ><button className="btn about-btn" title="About"></button></NavLink>
                </nav>
            </div>
        </header>
    )
}