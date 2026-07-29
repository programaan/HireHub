import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getJobApplications, updateApplicationStatus } from "../services/applicationService";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function JobApplications() {

    const { id } = useParams();

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, [id]);

    const loadApplications = async () => {

        try {
            const data = await getJobApplications(id);
            setApplications(data);

        } 
        catch (error) {
            console.log(error);
            toast.error("Failed to load applications.");

        } 
        finally {
            setLoading(false);

        }

    };

    const changeStatus = async (id, status) => {

        try {
            await updateApplicationStatus(id, status);
            toast.success(`Application ${status} successfully.`);
            loadApplications();

        } 
        catch (error) {
            console.log(error);
            toast.error("Failed to update application status.");

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

            <section className="recruiter-job-applications-page">

                <h1>Applications</h1>

                <p className="recruiter-job-applications-subtitle">Review candidates who applied for this job.</p>

                { applications.length === 0 ? (

                    <div className="recruiter-job-applications-empty">

                        <h3>No Applications Yet</h3>
                        <p>Candidates who apply will appear here.</p>

                    </div>

                ) : (

                    applications.map((application) => (

                        <div key={application.id} className="recruiter-job-applications-card">

                            <div className="recruiter-job-applications-header">

                                <div>
                                    <h2>{application.candidate_name}</h2>
                                    <p>{application.candidate_email}</p>
                                </div>

                                <span className={`recruiter-job-applications-status ${application.status}`}>
                                    {application.status}
                                </span>

                            </div>

                            {application.cover_letter && (

                                <>
                                    <h3>Cover Letter</h3>
                                    <p>{application.cover_letter}</p>
                                </>

                            )}

                            {application.resume && (

                                <a
                                    href={application.resume}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="recruiter-job-applications-resume-btn"
                                >
                                    View Resume
                                </a>

                            )}

                            <div className="recruiter-job-applications-actions">

                                <button className="recruiter-job-applications-accept"
                                    disabled={application.status === "accepted"}
                                    onClick={() =>
                                        changeStatus(application.id, "accepted")
                                    }
                                >
                                    Accept
                                </button>

                                <button className="recruiter-job-applications-reject"
                                    disabled={application.status === "rejected"}
                                    onClick={() =>
                                        changeStatus(application.id, "rejected")
                                    }
                                >
                                    Reject
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

export default JobApplications;