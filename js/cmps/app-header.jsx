const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="header-container flex space-between align-center main-layout">
            <Link to="/"><h1>AppSus.</h1></Link>
            <div className="main-menu">
                <button className="menu-btn"></button>
                <nav className="dropdown-content">
                    <NavLink to="/keep" ><button className="btn keep-btn"></button></NavLink>
                    <NavLink to="/mail/inbox" ><button className="btn mail-btn">M</button></NavLink>
                    <NavLink to="/books"><button className="btn books-btn">B</button></NavLink>
                    <NavLink to="/about" ><button className="btn about-btn">A</button></NavLink>
                </nav>
            </div>
            {/* <nav>
                <NavLink to="/keep" >Keep</NavLink>
                <NavLink to="/mail/inbox" >Mail</NavLink>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/about" >About</NavLink>
            </nav> */}
        </header>
    )
}