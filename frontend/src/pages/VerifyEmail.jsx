import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

import Loader from "../components/Loader";

function VerifyEmail() {

    const { uid, token } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        const verify = async () => {

            try {
                await axios.get(`http://127.0.0.1:8000/api/verify-email/${uid}/${token}/`);
                toast.success("Email verified successfully!");
                navigate("/account");
            } 
            catch (error) {
                toast.error("Verification failed or link has expired.");
                navigate("/account");
            }

        };

        verify();

    }, [uid, token, navigate]);

return (

    <>

        <Helmet>
            <title>Verify Email | HireHub</title>
        </Helmet>

        <section className="verify-email-page">
            <Loader />
            <h2>Verifying your email...</h2>
        </section>
        
    </>

);

}

export default VerifyEmail;