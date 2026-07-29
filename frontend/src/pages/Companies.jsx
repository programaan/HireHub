import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import google from "../assets/images/companies/google.png";
import microsoft from "../assets/images/companies/microsoft.png";
import amazon from "../assets/images/companies/amazon.png";
import adobe from "../assets/images/companies/adobe.png";
import tcs from "../assets/images/companies/tcs.png";
import deloitte from "../assets/images/companies/deloitte.jpeg";
import accenture from "../assets/images/companies/accenture.png";
import wipro from "../assets/images/companies/wipro.png";
import ibm from "../assets/images/companies/ibm.png";

import { Helmet } from "react-helmet-async";

function Companies() {

    const [search, setSearch] = useState("");

    const companies = [

        {
            id: 1,
            name: "Google",
            logo: google,
            industry: "Technology",
            employees: "10K+",
            jobs: 250,
        },

        {
            id: 2,
            name: "Microsoft",
            logo: microsoft,
            industry: "Technology",
            employees: "10K+",
            jobs: 180,
        },

        {
            id: 3,
            name: "Amazon",
            logo: amazon,
            industry: "E-Commerce",
            employees: "10K+",
            jobs: 220,
        },

        {
            id: 4,
            name: "Adobe",
            logo: adobe,
            industry: "Technology",
            employees: "10K+",
            jobs: 120,
        },

        {
            id: 5,
            name: "TCS",
            logo: tcs,
            industry: "IT Services",
            employees: "10K+",
            jobs: 120,
        },

        {
            id: 6,
            name: "Deloitte",
            logo: deloitte,
            industry: "Technology",
            employees: "10K+",
            jobs: 110,
        },

        {
            id: 7,
            name: "Accenture",
            logo: accenture,
            industry: "Consulting",
            employees: "10K+",
            jobs: 100,
        },

        {
            id: 8,
            name: "IBM",
            logo: ibm,
            industry: "Technology",
            employees: "10K+",
            jobs: 70,
        },

        {
            id: 9,
            name: "Wipro",
            logo: wipro,
            industry: "Technology",
            employees: "5K+",
            jobs: 60,
        },

    ];

    const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>

            <Helmet>
                <title>Companies | HireHub</title>

                <meta
                    name="description"
                    content="Explore companies hiring through HireHub."
                />
            </Helmet>

            <Navbar />

            <section className="companies-page">

                <div className="companies-header">

                    <div>
                        <h1>All Companies</h1>
                        <p>Showing {filteredCompanies.length} companies</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Search company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="companies-grid">

                    {filteredCompanies.map((company) => (

                        <div key={company.id} className="company-card">

                            <img src={company.logo} alt={company.name}/>

                            <div className="company-info">

                                <h3>{company.name}</h3>
                                <p>{company.industry}</p>

                                <div className="company-meta">

                                    <span>👥 {company.employees} Employees</span>
                                    <span>💼 {company.jobs}+ Jobs</span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            <Footer />
        </>
    );
}

export default Companies;