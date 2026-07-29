import { useState } from "react";
import { Link } from "react-router-dom";

import { forgotPassword } from "../services/authService";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email) {
            toast.warning("Please enter your email.");
            return;

        }

        try {
            setLoading(true);
            await forgotPassword(email);
            toast.success("Password reset link has been sent to your email.");
            setEmail("");

        } 
        catch (error) {
            toast.error(error.response?.data?.detail || "Unable to send reset email.");

        } 
        finally {

            setLoading(false);
        }

    };

    return (

        <>

            <Helmet>
                <title>Forgot Password | HireHub</title>
            </Helmet>

            <section className="account-page">

                <div className="account-box">

                    <h2>Forgot Password</h2>
                    <p className="account-subtitle">Enter your registered email address. We'll send you a password reset link.</p>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                    </form>


                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                        <Link to="/account" className="toggle-btn">
                            ← Back to Login
                        </Link>
                    </p>

                </div>

            </section>


        </>

    );

}

export default ForgotPassword;