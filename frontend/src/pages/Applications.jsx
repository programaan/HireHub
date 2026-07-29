import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getMyApplications } from "../services/applicationService";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function Applications() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try{
            const data = await getMyApplications();
            setApplications(data);
        }
        catch(error){
            console.log(error);
            toast.error("Failed to load applications.");
        }
        finally{
            setLoading(false);
        }

    };

    if(loading){

        return(

            <>
                <Navbar/>

                <section className="candidate-applications-page">

                    <h2>Loading Applications...</h2>

                </section>

                <Footer/>

            </>

        );

    }

    return(

        <>

            <Helmet>
                <title>Dashboard | HireHub</title>
            </Helmet>

            <Navbar/>

            <section className="candidate-applications-page">

                <h1>My Applications</h1>

                <p className="candidate-applications-subtitle">
                    Track every job you've applied for.
                </p>

                {

                    applications.length===0 ? (

                        <div className="candidate-applications-empty">

                            <h3>No Applications Yet</h3>
                            <p>Start applying to jobs.</p>

                            <Link to="/jobs"
                                className="candidate-applications-browse-btn"
                            >
                                Browse Jobs
                            </Link>

                        </div>

                    ) : (

                        applications.map((application)=>(

                            <div key={application.id} className="candidate-applications-card">

                                <div className="candidate-applications-header">

                                    <div>

                                        <h2>{application.job_title}</h2>

                                        <p>{application.company_name}</p>

                                        <p>
                                            Applied :
                                            {" "}
                                            {
                                                new Date(
                                                    application.applied_at
                                                ).toLocaleDateString()
                                            }
                                        </p>

                                    </div>

                                    <span className={`candidate-applications-status ${application.status}`}>
                                        {application.status}
                                    </span>

                                </div>

                                <Link to={`/jobs/${application.job}`}
                                    className="candidate-applications-view-btn"
                                >
                                    View Job
                                </Link>

                            </div>
                        ))

                    )

                }

            </section>

            <Footer/>

        </>

    );

}

export default Applications;