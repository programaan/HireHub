import { Trash2 } from "lucide-react";

function SavedJobCard({ job, onRemove }) {

    return (

        <div className="saved-job-card">

            <div className="saved-left">

                {job.company_logo ? (
                    <img src={job.company_logo} alt={job.company_name} className="saved-company-logo"/>

                ) : (

                    <div className="saved-company-placeholder">
                        {job.company_name?.charAt(0)}
                    </div>

                )}

                <div className="saved-info">

                    <h3>{job.title}</h3>
                    <p>
                        {job.company_name}
                        <span> • </span>
                        {job.location}
                    </p>

                    <div className="saved-meta">

                        <span>{job.job_type}</span>
                        <span>{job.salary}</span>

                    </div>

                </div>

            </div>

            <div className="saved-right">

                <button type="button" className="remove-saved-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(job.id);
                    }}
                >
                    <Trash2 size={18} />
                    Remove
                </button>

            </div>

        </div>

    );

}

export default SavedJobCard;