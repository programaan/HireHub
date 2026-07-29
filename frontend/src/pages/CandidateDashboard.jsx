import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getCandidateDashboard } from "../services/dashboardService";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function CandidateDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {
            const data = await getCandidateDashboard();
            setDashboard(data);
        } 
        catch (error) {
            console.log(error);
            toast.error("Failed to load dashboard.");
        } 
        finally {
            setLoading(false);
        }

    };

    if (loading) {

        return (

            <>
                <Navbar />
                <Loader />
                <Footer />
            </>

        );

}

    return (

        <>

            <Helmet>
                <title>Dashboard | HireHub</title>
            </Helmet>

            <Navbar />

            <section className="candidate-dashboard-page">

                <div className="candidate-dashboard-header">
                    <div>
                        <h1>Welcome Back 👋</h1>
                        <p>Track your applications and discover new opportunities.</p>
                    </div>
                </div>

                <div className="candidate-dashboard-cards">

                    <div className="candidate-dashboard-card">
                        <span>Total Applications</span>
                        <h2>{dashboard.applications}</h2>
                    </div>

                    <div className="candidate-dashboard-card">
                        <span>Pending</span>
                        <h2>{dashboard.pending}</h2>
                    </div>

                    <div className="candidate-dashboard-card">
                        <span>Accepted</span>
                        <h2>{dashboard.accepted}</h2>
                    </div>

                    <div className="candidate-dashboard-card">
                        <span>Rejected</span>
                        <h2>{dashboard.rejected}</h2>
                    </div>

                </div>

                <div className="candidate-dashboard-actions">

                    <Link to="/applications">My Applications</Link>
                    <Link to="/saved-jobs">Saved Jobs</Link>
                    <Link to="/profile">My Profile</Link>

                </div>

                <div className="candidate-dashboard-section-title">
                    <h2>Recent Applications</h2>
                </div>

                {
                    dashboard.latest_applications.length === 0 ? (

                        <div className="candidate-dashboard-empty">

                            <h3>No Applications Yet</h3>
                            <p>Start applying to jobs and they'll appear here.</p>

                            <Link to="/jobs"
                                className="candidate-dashboard-browse-btn"
                            >
                                Browse Jobs
                            </Link>

                        </div>

                    ) : (

                        dashboard.latest_applications.map((app, index) => (

                            <div key={index} className="candidate-dashboard-application-card">

                                <div>
                                    <h3>{app.job_title}</h3>
                                    <p>{app.company}</p>
                                </div>

                                <span className={`candidate-dashboard-status ${app.status.toLowerCase()}`}>
                                    {app.status}
                                </span>

                            </div>

                        ))

                    )

                }

            </section>

            <Footer />

        </>

    );

}

export default CandidateDashboard;