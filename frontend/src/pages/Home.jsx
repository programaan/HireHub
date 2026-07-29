import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedJobs from "../components/FeaturedJobs";
import EmployerCTA from "../components/EmployerCTA";
import Footer from "../components/Footer";

import { Helmet } from "react-helmet-async";

function Home() {

    return (

        <>

            <Helmet>
                <title>HireHub | Find Your Dream Job</title>

                <meta
                    name="description"
                    content="Discover thousands of jobs and connect with top companies on HireHub."
                />
            </Helmet>

            <Navbar />

            <Hero />

            <Categories />

            <FeaturedJobs />

            <EmployerCTA />

            <Footer />

        </>

    );

}

export default Home;