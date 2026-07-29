import { useEffect, useState } from "react";

import { getJobs } from "../services/jobService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Loader from "../components/Loader";

import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");

    const [query, setQuery] = useState("");
    const [queryLocation, setQueryLocation] = useState("");

    const [jobType, setJobType] = useState("");
    const [experience, setExperience] = useState("");
    const [ordering, setOrdering] = useState("-created_at");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchJobs();
    }, [
        page,
        query,
        queryLocation,
        jobType,
        experience,
        ordering,
    ]);

    useEffect(() => {
        setPage(1);
    }, [
        query,
        queryLocation,
        jobType,
        experience,
        ordering,
    ]);

    const fetchJobs = async () => {

        setLoading(true);

        try {
            const data = await getJobs({
                page,
                search: query,
                location: queryLocation,
                job_type: jobType,
                experience,
                ordering,
            });
            setJobs(data.results);
            setTotalPages(Math.ceil(data.count / 5));
            setError("");
        }
        catch {
            setError("Failed to load jobs.");
            toast.error("Failed to load jobs.");
        }
        finally {
            setLoading(false);
        }

    };

    const handleSearch = () => {

        setQuery(search);
        setQueryLocation(location);
        setPage(1);

    };

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
                <title>Jobs | HireHub</title>

                <meta
                    name="description"
                    content="Browse the latest job openings from trusted companies."
                />
            </Helmet>

            <Navbar />

            <section className="jobs-page">

                <div className="jobs-header">

                            <h1>All Jobs</h1>
                            <p>Showing {jobs.length} jobs</p>

                        </div>

                <div className="container jobs-layout">

                    <Filters
                        jobType={jobType}
                        setJobType={setJobType}

                        experience={experience}
                        setExperience={setExperience}

                        ordering={ordering}
                        setOrdering={setOrdering}

                        clearFilters={() => {
                            setSearch("");
                            setLocation("");

                            setQuery("");
                            setQueryLocation("");

                            setJobType("");
                            setExperience("");
                            setOrdering("-created_at");
                            setPage(1);
                        }}
                    />

                    <div className="jobs-content">

                        <SearchBar
                            search={search}
                            setSearch={setSearch}

                            location={location}
                            setLocation={setLocation}

                            onSearch={handleSearch}
                        />

                        {
                            error ? (
                                <h2>{error}</h2>

                            ) : (

                                <div className="jobs-list">

                                    {
                                        jobs.map((job) => (
                                            <JobCard key={job.id} job={job}/>
                                        ))
                                    }

                                </div>

                            )

                        }

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}
                        />

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Jobs;