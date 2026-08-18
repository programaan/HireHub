import { useEffect, useState } from "react";

import { getJobs } from "../services/jobService";

import FeaturedJobCard from "./FeaturedJobCard";

import Loader from "./Loader";

function FeaturedJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try{
            setLoading(true);

            const data = await getJobs();
            setJobs(data.results.slice(0,4));
        }

        catch(error){
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    };

    return(

        <section className="featured-jobs">

            <div className="container">

                <h2 className="section-title">Featured Jobs</h2>

                <div className="featured-grid">

                    {loading ? (
                        <Loader />
                    ) : (
                        jobs.map((job) => (
                            <FeaturedJobCard
                                key={job.id}
                                job={job}
                            />
                        ))
                    )}

                </div>

            </div>

        </section>

    );

}

export default FeaturedJobs;