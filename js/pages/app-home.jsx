const {Link } = ReactRouterDOM
 
export function Home() {
    return (
        <section className='app-home'>
            <div className="hero">
                <a className="hero-link" href="#">Welcome</a>
                <img src="./assets/img/hero.jpg" />
            </div>
            <div id="gallery-container" className="app-cards-container">
                <div id="feature-header" className="feature-header">
                    <p>What's inside</p>
                </div>
                <div id="cards" className="app-container">
                    <div className="app-card">
                        <div className="home-img-container">
                            <img src="./assets/img/home-notes.jpg" />
                        </div>
                        <Link to="/keep"><button>Notes</button></Link>
                        <p>Stay organized and get creative!</p>
                    </div>
                    <div className="app-card">
                        <div className="home-img-container">
                            <img src="./assets/img/home-mail.jpg" />
                        </div>
                        <Link to="/mail"><button>Mail</button></Link>
                        <p>Stay in touch constantly with this intuitive and easy to use mail app</p>
                    </div>
                </div>
            </div>
        </section>
    )
}