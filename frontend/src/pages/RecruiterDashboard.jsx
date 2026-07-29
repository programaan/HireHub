import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getRecruiterJobs, deleteJob } from "../services/jobService";
import { getRecruiterDashboard } from "../services/dashboardService";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function RecruiterDashboard() {

    const [jobs, setJobs] = useState([]);

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {
            const jobsData = await getRecruiterJobs();
            setJobs(jobsData.results);
            const dashboardData = await getRecruiterDashboard();
            setStats(dashboardData);
        } 
        catch (error) {
            console.log(error);
        }

        setLoading(false);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this job?");

        if (!confirmDelete) return;

        try {
            await deleteJob(id);
            toast.success("Job deleted successfully!");
            loadJobs();
        } 
        catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.detail || "Failed to delete job.");

        }

    };

    

    return (

        <>

            <Helmet>
                <title>Dashboard | HireHub</title>
            </Helmet>

            <Navbar />

            <section className="recruiter-dashboard-page">


                <div className="recruiter-dashboard-header">
                    <div>
                        <h1>Welcome Back 👋</h1>
                        <p>Manage your job postings, review applications, and hire the best talent.</p>
                    </div>
                </div>

                {
                    stats && (

                        <div className="recruiter-dashboard-cards">

                            <div className="recruiter-dashboard-card">

                                <h2>{stats.jobs_posted}</h2>
                                <p>Jobs Posted</p>

                            </div>

                            <div className="recruiter-dashboard-card">

                                <h2>{stats.total_applications}</h2>
                                <p>Total Applications</p>

                            </div>

                            <div className="recruiter-dashboard-card">

                                <h2>{stats.pending}</h2>
                                <p>Pending</p>

                            </div>

                            <div className="recruiter-dashboard-card">

                                <h2>{stats.accepted}</h2>
                                <p>Accepted</p>

                            </div>

                            <div className="recruiter-dashboard-card">

                                <h2>{stats.rejected}</h2>
                                <p>Rejected</p>

                            </div>

                        </div>

                    )
                }

                <div className="recruiter-dashboard-top-actions">

                    <Link to="/recruiter/post-job"
                        className="recruiter-dashboard-post-btn"
                    >
                        Post New Job
                    </Link>

                    <Link to="/company-profile"
                        className="recruiter-dashboard-post-btn"
                    >
                        Company Profile
                    </Link>

                </div>

                <h1 className="recruiter-dashboard-jobs-heading">My Jobs</h1>

                {loading ? (

                    <Loader />

                ) : jobs.length === 0 ? (

                    <p>No jobs posted yet.</p>

                ) : (

                    jobs.map((job) => (

                        <div key={job.id} className="recruiter-dashboard-job-card">

                            <h2>{job.title}</h2>
                            <p>{job.location}</p>
                            <p>{job.job_type}</p>

                            <div className="recruiter-dashboard-job-actions">

                                <Link to={`/recruiter/jobs/${job.id}/edit`}>Edit</Link>

                                <Link to={`/recruiter/jobs/${job.id}/applications`}>Applications</Link>

                                <button onClick={() => handleDelete(job.id)}
                                    className="recruiter-dashboard-delete-btn"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </section>

            <Footer />
        </>

    );

}

export default RecruiterDashboard;