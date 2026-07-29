import { Link } from "react-router-dom";

function FeaturedJobCard({ job }) {

    return (

        <Link to={`/jobs/${job.id}`} className="featured-job-card">

            <div className="featured-left">

                {
                    job.company_logo ? (

                        <img
                            src={job.company_logo}
                            alt={job.company_name}
                            className="featured-company-logo"
                        />

                    ) : (

                        <div className="featured-company-placeholder">
                            {job.company_name?.charAt(0)}
                        </div>
                    )
                }

                <div className="featured-info">

                    <h3>{job.title}</h3>
                    <p>
                        {job.company_name}
                        <span> • </span>
                        {job.location}
                    </p>

                    <span className="featured-badge">
                        {job.job_type}
                    </span>

                </div>

            </div>


            <div className="featured-right">


                <div className="featured-top">
                    <h4>{job.salary}</h4>
                </div>

                <p className="featured-date">
                    {new Date(job.created_at).toLocaleDateString()}
                </p>

            </div>

        </Link>

    );

}

export default FeaturedJobCard;