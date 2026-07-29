import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { applyJob, getMyApplications } from "../services/applicationService";
import { getJob, toggleSaveJob } from "../services/jobService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

import { ArrowLeft, MapPin, BriefcaseBusiness, IndianRupee, Building2, Globe, Bookmark } from "lucide-react";


function JobDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [saved, setSaved] = useState(false);

    const [applying, setApplying] = useState(false);

    const [alreadyApplied, setAlreadyApplied] = useState(false);

    useEffect(() => {

        fetchJob();
        checkApplication();

    }, [id]);

    const fetchJob = async () => {

        try {
            const data = await getJob(id);
            setJob(data);
        } 
        catch {
            setError("Failed to load job.");
            toast.error("Failed to load job.");
        } 
        finally {
            setLoading(false);
        }

    };

    const checkApplication = async () => {

        if (!user || user.role !== "candidate") return;

        try {
            const data = await getMyApplications();
            const applications = data.results || data;
            const applied = applications.some((application) => application.job === Number(id));
            setAlreadyApplied(applied);
        } 
        catch (error) {
            console.log(error);
        }

    };

    const handleApply = async () => {

        if (!user) {
            toast.warning("Please login first.");
            navigate("/account");
            return;
        }

        if (user.role !== "candidate") {
            toast.warning("Only candidates can apply.");
            return;
        }

        try {
            setApplying(true);
            await applyJob(job.id);
            toast.success("Application submitted successfully.");
            setAlreadyApplied(true);
        } 
        catch (error) {
            toast.error(error.response?.data?.detail || "Application failed.");
        } 
        finally {
            setApplying(false);
        }

    };

    const handleSave = async () => {

        if (!user) {
            toast.warning("Please login first.");
            return;
        }

        if (user.role !== "candidate") {
            toast.warning("Only candidates can save jobs.");
            return;
        }

        try {
            const data = await toggleSaveJob(job.id);
            setSaved(data.saved);
            toast.success(data.saved ? "Job saved." : "Job removed from saved.");
        } 
        catch (error) {
            console.log(error);
            toast.error("Failed to save job.");
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

    if (error) return <h2>{error}</h2>;

    return (

    <>

        <Helmet>
            <title>{job?.title || "Job Details"} | HireHub</title>

            <meta
                name="description"
                content={job?.description || "View job details on HireHub."}
            />
        </Helmet>

        <Navbar />

        <section className="job-details-page">

            <div className="container">

                <div className="job-details-breadcrumb">

                    <button className="job-details-back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        Back to Jobs
                    </button>
                    <span>/</span>
                    <p>{job.title}</p>

                </div>

                <div className="job-details-layout">

                    <div className="job-details-main">

                        <div className="job-details-card-main">

                            <div className="job-details-top">

                                <div className="job-details-company">

                                    {job.company_logo ? (

                                        <img src={job.company_logo} alt={job.company_name}
                                            className="job-details-company-logo"
                                        />

                                    ) : (

                                        <div className="job-details-company-placeholder">
                                            <Building2 size={40} />
                                        </div>

                                    )}

                                    <div>

                                        <h1>{job.title}</h1>
                                        <p>
                                            {job.company_name}
                                            <span> • </span>
                                            {job.job_type}
                                            <span> • </span>
                                            {job.location}
                                        </p>

                                    </div>

                                </div>

                                <div className="job-details-actions">

                                    <button className="job-details-apply-btn"
                                        onClick={handleApply}
                                        disabled={alreadyApplied || applying}
                                    >
                                        {alreadyApplied
                                            ? "Applied ✓"
                                            : applying
                                            ? "Applying..."
                                            : "Apply Now"}
                                    </button>

                                    <button className="job-details-save-btn" onClick={handleSave}>
                                        <Bookmark size={18} />
                                        {saved ? "Saved" : "Save Job"}
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div className="job-details-card">

                            <h2>Job Description</h2>
                            <p>{job.description}</p>

                        </div>

                        <div className="job-details-card">

                            <h2>Required Skills</h2>

                            <div className="job-details-skills">

                                {job.skills.split(",").map((skill, index) => (
                                    <span
                                        key={index}
                                        className="job-details-skill-tag"
                                    >
                                        {skill.trim()}
                                    </span>
                                ))}

                            </div>

                        </div>

                        {job.company_description && (

                            <div className="job-details-card">

                                <h2>About Company</h2>
                                <p>{job.company_description}</p>

                            </div>

                        )}

                    </div>

                    <aside className="job-details-sidebar">

                        <div className="job-details-sidebar-card">

                            <h3>About Company</h3>
                            <h2>{job.company_name}</h2>
                            <p>{job.company_location}</p>

                            {job.company_website && (

                                <a
                                    href={job.company_website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="job-details-company-link"
                                >
                                    <Globe size={16} />
                                    Visit Website
                                </a>

                            )}

                        </div>

                        <div className="job-details-sidebar-card">

                            <div className="job-details-info-row">

                                <BriefcaseBusiness size={20} />

                                <div>

                                    <h4>Job Type</h4>
                                    <p>{job.job_type}</p>

                                </div>

                            </div>

                            <div className="job-details-info-row">

                                <MapPin size={20} />

                                <div>

                                    <h4>Location</h4>
                                    <p>{job.location}</p>

                                </div>

                            </div>

                            <div className="job-details-info-row">

                                <Building2 size={20} />

                                <div>

                                    <h4>Experience</h4>
                                    <p>{job.experience}</p>

                                </div>

                            </div>

                            <div className="job-details-info-row">

                                <IndianRupee size={20} />

                                <div>

                                    <h4>Salary</h4>
                                    <p>{job.salary}</p>

                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>

        </section>

        <Footer />
    </>

    );

}

export default JobDetails;