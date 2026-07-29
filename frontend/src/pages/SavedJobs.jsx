import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SavedJobCard from "../components/SavedJobCard";
import Loader from "../components/Loader";

import { getSavedJobs, toggleSaveJob } from "../services/jobService";

function SavedJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {
            const data = await getSavedJobs();
            setJobs(data);
        } 
        catch (error) {
            console.log(error);
            toast.error("Failed to load saved jobs.");
        } 
        finally {
            setLoading(false);
        }

    };

    const removeSaved = async (id) => {

        try {
            await toggleSaveJob(id);
            setJobs((prev) => prev.filter((job) => job.id !== id));
            toast.success("Job removed from saved jobs.");
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to remove saved job.");
        }

    };

    return (

        <>

            <Helmet>
                <title>Dashboard | HireHub</title>
            </Helmet>

            <Navbar />

            <section className="saved-jobs-page">

                <div className="saved-jobs-header">

                    <h1>Saved Jobs</h1>
                    <p>All the jobs you've bookmarked.</p>

                </div>

                {loading ? (
                    <Loader />

                ) : jobs.length === 0 ? (

                    <div className="saved-empty-state">

                        <h3>No Saved Jobs</h3>
                        <p>Save jobs to quickly access them later.</p>

                    </div>

                ) : (

                    <div className="saved-jobs-grid">

                        {jobs.map((job) => (

                            <SavedJobCard key={job.id} job={job} onRemove={removeSaved}/>

                        ))}

                    </div>

                )}

            </section>

            <Footer />
        </>

    );

}

export default SavedJobs;