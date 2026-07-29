import { Link } from "react-router-dom";

function JobCard({ job }) {
    return (
        <Link to={`/jobs/${job.id}`} className="job-card">
            <div className="job-left">

                {job.company_logo ? (
                    <img src={job.company_logo} alt={job.company_name} className="job-company-logo"/>
                ) : (
                    <div className="job-company-placeholder">
                        {job.company_name?.charAt(0)}
                    </div>
                )}

                <div className="job-info">

                    <h3>{job.title}</h3>
                    <p>
                        {job.company_name}
                        <span> • </span>
                        {job.location}
                    </p>
                    <span className="job-badge">
                        {job.job_type}
                    </span>

                </div>

            </div>

            <div className="job-right">

                <div className="job-top">
                    <h4>{job.salary}</h4>
                </div>

                <p className="job-date">
                    {new Date(job.created_at).toLocaleDateString()}
                </p>

            </div>
        </Link>
    );
}

export default JobCard;