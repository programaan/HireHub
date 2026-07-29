import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { createJob } from "../services/jobService";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function PostJob() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        job_type: "full-time",
        experience: "",
        skills: "",
        deadline: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);
            await createJob(formData);
            toast.success("Job posted successfully!");
            navigate("/recruiter/dashboard");
        } 
        catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.detail || "Failed to post job.");

        } 
        finally {
            setLoading(false);
        }

    };

    return (
        <>

            <Helmet>
                <title>Dashboard | HireHub</title>
            </Helmet>

            <Navbar />

            <section className="post-job-page">

                <div className="post-job-box">

                    <h1>Post a New Job</h1>
                    <p className="post-job-subtitle">Fill in the details below to publish your vacancy and start receiving applications.</p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-section">

                            <h3>Job Details</h3>

                            <div className="post-job-row">

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

                            <div className="post-job-row">

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

                            <div className="post-job-row">

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

                        <button type="submit" disabled={loading}>
                            {loading ? "Posting..." : "Publish Job"}
                        </button>

                    </form>

                </div>

            </section>

            <Footer />
        </>
    );

}

export default PostJob;