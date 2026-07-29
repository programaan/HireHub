function Filters({
    jobType,
    setJobType,

    experience,
    setExperience,

    ordering,
    setOrdering,

    clearFilters,
}) {

    return (

        <aside className="jobs-sidebar">

            <div className="sidebar-header">

                <h3>Filter By</h3>
                <button onClick={clearFilters}>Clear</button>

            </div>

            <div className="filter-group">

                <label>Job Type</label>

                <select value={jobType}
                    onChange={(e)=>setJobType(e.target.value)}
                >
                    <option value="">All Jobs</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                </select>

            </div>

            <div className="filter-group">

                <label>Experience</label>

                <select value={experience}
                    onChange={(e)=>setExperience(e.target.value)}
                >
                    <option value="">Any</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3 Years">3+ Years</option>
                </select>

            </div>

            <div className="filter-group">

                <label>Sort By</label>

                <select value={ordering}
                    onChange={(e)=>setOrdering(e.target.value)}
                >
                    <option value="-created_at">Latest Jobs</option>
                    <option value="deadline">Deadline</option>
                </select>

            </div>

        </aside>

    );

}

export default Filters;