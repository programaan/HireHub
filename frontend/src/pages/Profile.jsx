import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getCandidateProfile, updateCandidateProfile } from "../services/candidateService";

import { useAuth } from "../context/AuthContext";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function Profile() {

    const { updateUser } = useAuth();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({

        full_name: "",
        email: "",

        bio: "",
        phone: "",
        location: "",

        skills: "",
        education: "",
        experience: "",

        linkedin: "",
        github: "",
        portfolio: "",

        resume: null,
        profile_picture: null,

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {
            const data = await getCandidateProfile();
            setFormData({
                ...data,
                resume: data.resume,
                profile_picture: data.profile_picture,
            });

        } 
        catch (error) {
            console.log(error);
            toast.error("Failed to load profile.");
        } 
        finally {
            setLoading(false);
        }

    };

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (files) {
            setFormData({
                ...formData,
                [name]: files[0],
            });

            if (name === "profile_picture") {
                setPreview(
                    URL.createObjectURL(files[0])
                );

            }

        } 
        else {
            setFormData({
                ...formData,
                [name]: value,
            });

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setSaving(true);
            const data = new FormData();
            Object.keys(formData).forEach((key) => {

                if (
                    formData[key] !== null &&
                    formData[key] !== ""
                ) {
                    data.append(
                        key,
                        formData[key]
                    );
                }

            });

            await updateCandidateProfile(data);

            const updated = await getCandidateProfile();

            updateUser({
                full_name: updated.full_name,
                profile_picture: updated.profile_picture,
            });

            setFormData({
                ...updated,
                resume: updated.resume,
                profile_picture: updated.profile_picture,
            });

            toast.success("Profile updated successfully!");

        } 
        catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.detail || "Failed to update profile.");

        } 
        finally {
            setSaving(false);
        }

    };

    useEffect(() => {

        return () => {

            if (preview) {
                URL.revokeObjectURL(preview);
            }

        };

    }, [preview]);

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

            <section className="candidate-profile-page">

                <div className="candidate-profile-box">

                    <h1>Candidate Profile</h1>

                    <p className="profile-subtitle">Build a strong profile to attract recruiters.</p>

                    <form onSubmit={handleSubmit} className="candidate-profile-form">

                        <div className="candidate-profile-left">

                            {(preview || formData.profile_picture) ? (

                                <img
                                    src={preview || formData.profile_picture}
                                    alt="Profile"
                                    className="candidate-preview"
                                />

                            ) : (

                                <div className="candidate-preview-placeholder">No Image</div>

                            )}

                            <label htmlFor="profile_picture">Upload Profile Picture</label>

                            <input
                                id="profile_picture"
                                type="file"
                                name="profile_picture"
                                accept="image/*"
                                onChange={handleChange}
                            />

                            <label htmlFor="resume">Resume</label>

                            {formData.resume && typeof formData.resume === "string" && (

                                <a
                                    href={formData.resume}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="resume-btn"
                                >
                                    View Resume
                                </a>

                            )}

                            <input
                                id="resume"
                                type="file"
                                name="resume"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="candidate-profile-right">

                            <div className="candidate-readonly-fields">

                                <input
                                    value={formData.full_name}
                                    readOnly
                                />

                                <input
                                    value={formData.email}
                                    readOnly
                                />

                            </div>

                            <textarea
                                name="bio"
                                rows="4"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Tell recruiters about yourself..."
                            />

                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                            />

                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Location"
                            />

                            <input
                                name="skills"
                                rows="3"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="Skills (Comma separated)"
                            />

                            <textarea
                                name="education"
                                rows="3"
                                value={formData.education}
                                onChange={handleChange}
                                placeholder="Education"
                            />

                            <textarea
                                name="experience"
                                rows="3"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="Experience"
                            />

                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="LinkedIn URL"
                            />

                            <input
                                type="url"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="GitHub URL"
                            />

                            <input
                                type="url"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="Portfolio Website"
                            />


                            <button type="submit" disabled={saving}>
                                { saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                    </form>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Profile;