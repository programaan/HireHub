import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "../services/authService";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function ResetPassword() {

    const navigate = useNavigate();

    const { uid, token } = useParams();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await resetPassword({
                uid,
                token,
                password: formData.password,
                confirm_password: formData.confirmPassword,
            });
            toast.success("Password updated successfully.");
            navigate("/account");
        }
        catch (error) {
            toast.error(
                error.response?.data?.detail ||
                "Password reset failed."
            );
        }
        finally {
            setLoading(false);
        }

    };

    return (

        <>

            <Helmet>
                <title>Reset Password | HireHub</title>
            </Helmet>

            <section className="account-page">

                <div className="account-box">

                    <h2>Create New Password</h2>

                    <p className="account-subtitle">Enter your new password below.</p>

                    <form onSubmit={handleSubmit}>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="New Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <button type="button" className="show-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide Password" : "Show Password"}
                        </button>

                        <button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Reset Password"}
                        </button>

                    </form>

                </div>

            </section>


        </>

    );

}

export default ResetPassword;