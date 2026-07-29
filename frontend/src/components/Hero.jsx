import heroImage from "../assets/images/hero.png";

function Hero() {
    return (
        <section className="hero">

            <div className="container hero-container">

                <div className="hero-left">

                    <h1>Find the job that<br /><span>fits your life</span></h1>
                    <p>Explore thousands of jobs and discover opportunities that match your skills and passion.</p>

                    <div className="popular-searches">

                        <span>Web Developer</span>
                        <span>UI/UX Designer</span>
                        <span>Marketing</span>
                        <span>Data Analyst</span>
                        <span>Sales</span>

                    </div>

                </div>

                <div className="hero-right">

                    <img src={heroImage} alt="Job Search Illustration" className="hero-image"/>

                </div>

            </div>

        </section>
    );
}

export default Hero;