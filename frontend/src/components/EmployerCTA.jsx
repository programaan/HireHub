import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";

function EmployerCTA() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const handlePostJob = () => {

        if (!user) {
            toast.warning("Please login first.");
            navigate("/account");
            return;
        }

        if (user.role !== "recruiter") {
            toast.warning("Only recruiters can post jobs.");
            return;
        }

        navigate("/recruiter/post-job");
    };

    return (

        <section className="employer-cta">

            <div className="container employer-container">

                <div className="employer-left">

                    <div className="employer-icon">

                        <BriefcaseBusiness size={34} />

                    </div>

                    <div>
                        <h2>Are you an employer?</h2>
                        <p>Post jobs, find top talent and build your dream team.</p>
                    </div>

                </div>

                <button type="button" className="cta-btn" onClick={handlePostJob}>
                    Post a Job
                </button>

            </div>

        </section>

    );

}

export default EmployerCTA;