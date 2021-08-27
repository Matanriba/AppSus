export function About() {
    return (
        <section className="app-about">
            <h1>Meet The Team!</h1>
            <hr />
            <div className="about-card">
                <img className="about-img" src="../../assets/img/matan.jpg" alt="" />
                <div className="about-text">
                    <p className="about-name">Matan Riba</p>
                    <p className="about-details">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Rerum architecto nostrum obcaecati ratione id ea,
                        consectetur eveniet ipsum voluptatum placeat cumque molestiae provident!
                        Pariatur saepe officia odit accusamus rerum dolorum.
                    </p>
                </div>
            </div>
            <div className="about-card">
                <div className="about-text">
                    <p className="about-name">Amitee Weiner</p>
                    <p className="about-details">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Rerum architecto nostrum obcaecati ratione id ea,
                        consectetur eveniet ipsum voluptatum placeat cumque molestiae provident!
                        Pariatur saepe officia odit accusamus rerum dolorum.
                    </p>
                </div>
                <img className="about-img" src="../../assets/img/amitee.jpg" alt="" />
            </div>
        </section>
    )
}