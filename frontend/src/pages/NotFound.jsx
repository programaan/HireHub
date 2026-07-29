import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Helmet } from "react-helmet-async";

function NotFound() {

    return (

        <>

            <Helmet>
                <title>404 - Page Not Found | HireHub</title>
            </Helmet>

            <section className="notfound-page">

                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>

                <Link to="/" className="browse-btn">
                    Back to Home
                </Link>

            </section>

        </>

    );

}

export default NotFound;