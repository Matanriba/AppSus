const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    state = {}

    render() {

        return (
            <section className="app-header">
                <div className="header-content">
                <img src='../assets/img/book.png' onClick={() => this.props.history.push('/book')} />
                <nav>
                    <NavLink activeClassName="home-active" exact to="/"> Home</NavLink>
                    <NavLink to="/about"> About </NavLink>
                    <NavLink to="/book"> Book Gallery </NavLink>
                </nav>
                </div>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)