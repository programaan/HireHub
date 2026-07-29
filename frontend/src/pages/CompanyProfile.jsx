import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getRecruiterProfile, updateRecruiterProfile } from "../services/companyService";

import { useAuth } from "../context/AuthContext";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function CompanyProfile() {

    const { updateUser } = useAuth();

    const [loading, setLoading] = useState(true);

    const [preview,setPreview]=useState("");

    const [saving,setSaving]=useState(false);

    const [formData, setFormData] = useState({

        full_name: "",
        email: "",

        company_name: "",
        company_description: "",
        company_website: "",
        location: "",

        company_logo: null,

    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {
            const data = await getRecruiterProfile();
            setFormData({
                ...data,
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to load company profile.");
        }
        finally {
            setLoading(false);
        }

    };

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            setFormData(prev => ({
                ...prev,
                company_logo: file,
            }));

            if (preview) {
                URL.revokeObjectURL(preview);
            }

            setPreview(URL.createObjectURL(file));

        } 
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
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
                    data.append(key, formData[key]);
                }

            });

            await updateRecruiterProfile(data);
            const updated = await getRecruiterProfile();
            updateUser({
                full_name: updated.full_name,
                company_logo: updated.company_logo,
            });

            setFormData(updated);

            if (preview) {
                URL.revokeObjectURL(preview);
            }
            setPreview("");
            toast.success("Company Profile Updated!");

        } 
        catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.detail || "Failed to update company profile.");
        }
        finally{
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

            <section className="company-profile-page">

                <div className="company-profile-box">

                    <h1>Company Profile</h1>
                    <p className="profile-subtitle">Keep your company information updated for better visibility.</p>

                    <form onSubmit={handleSubmit} className="company-profile-form">

                        <div className="company-profile-sidebar">

                            <h3>Company Branding</h3>
                            {(preview || formData.company_logo) ? (
                                <img
                                    src={preview || formData.company_logo}
                                    alt="Company Logo"
                                    className="company-preview"
                                />

                            ) : (

                                <div className="company-placeholder">No Logo</div>

                            )}

                            <label htmlFor="company_logo">Upload Logo</label>

                            <input
                                id="company_logo"
                                type="file"
                                name="company_logo"
                                accept="image/*"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="company-profile-content">

                            <div className="company-readonly-fields">

                                <input
                                    value={formData.full_name}
                                    readOnly
                                />

                                <input
                                    value={formData.email}
                                    readOnly
                                />

                            </div>

                            <input
                                required
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                placeholder="Company Name"
                            />

                            <textarea
                                rows="6"
                                name="company_description"
                                value={formData.company_description}
                                onChange={handleChange}
                                placeholder="Tell candidates about your company..."
                            />

                            <input
                                type="url"
                                name="company_website"
                                value={formData.company_website}
                                onChange={handleChange}
                                placeholder="Company Website"
                            />

                            <input
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Location"
                            />

                            <button type="submit" disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>

                        </div>

                    </form>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default CompanyProfile;