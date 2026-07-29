import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getJob, updateJob } from "../services/jobService";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        job_type: "",
        experience: "",
        skills: "",
        deadline: "",
    });

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {

        try {
            const data = await getJob(id);
            setFormData({
                title: data.title,
                description: data.description,
                location: data.location,
                salary: data.salary,
                job_type: data.job_type,
                experience: data.experience,
                skills: data.skills,
                deadline: data.deadline,
            });
        } 
        catch (error) {
            console.log(error);
            toast.error("Failed to load job details.");
        } 
        finally {
            setLoading(false);
        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setSaving(true);
            await updateJob(id, formData);
            toast.success("Job updated successfully!");
            navigate("/recruiter/dashboard");
        } 
        catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.detail || "Failed to update job.");
        } 
        finally {
            setSaving(false);
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

            <section className="edit-job-page">

                <div className="edit-job-box">

                    <h1>Edit Job</h1>

                    <p className="edit-job-subtitle">Update your job posting and keep it fresh for applicants.</p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-section">

                            <h3>Job Details</h3>

                            <div className="edit-job-row">

                                <div className="input-group">

                                    <label>Job Title <span>*</span></label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Frontend Developer"
                                        required
                                    />

                                </div>

                                <div className="input-group">

                                    <label>Employment Type <span>*</span></label>

                                    <select
                                        name="job_type"
                                        value={formData.job_type}
                                        onChange={handleChange}
                                    >
                                        <option value="full-time">Full Time</option>
                                        <option value="part-time">Part Time</option>
                                        <option value="internship">Internship</option>
                                        <option value="contract">Contract</option>
                                    </select>

                                </div>

                            </div>

                            <div className="edit-job-row">

                                <div className="input-group">

                                    <label>Location <span>*</span></label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Delhi, India"
                                        required
                                    />

                                </div>

                                <div className="input-group">

                                    <label>Experience <span>*</span></label>

                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="2+ Years"
                                        required
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="form-section">

                            <h3>Compensation</h3>

                            <div className="edit-job-row">

                                <div className="input-group">

                                    <label>Salary <span>*</span></label>

                                    <input
                                        type="text"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        placeholder="₹8 LPA"
                                        required
                                    />

                                </div>

                                <div className="input-group">

                                    <label>Application Deadline <span>*</span></label>

                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="form-section">

                            <h3>Required Skills</h3>

                            <div className="input-group">

                                <label>Skills <span>*</span></label>

                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="React, Node.js, SQL, Tailwind CSS..."
                                    required
                                />

                            </div>

                        </div>

                        <div className="form-section">

                            <h3>Job Description</h3>

                            <div className="input-group">

                                <label>Description <span>*</span></label>

                                <textarea
                                    rows="8"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the role, responsibilities, requirements, benefits and any additional information..."
                                    required
                                />

                            </div>

                        </div>

                        <button type="submit" disabled={saving}>
                            {saving ? "Updating..." : "Update Job"}
                        </button>

                    </form>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default EditJob;