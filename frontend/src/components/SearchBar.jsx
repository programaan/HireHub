import { Search, MapPin, Briefcase } from "lucide-react";

function SearchBar({
    search,
    setSearch,

    location,
    setLocation,

    jobType,
    setJobType,

    onSearch,
}) {

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            onSearch();
        }

    };

    return (

        <div className="searchbar">

            <div className="search-item">

                <Search size={20} />
                <input type="text"
                    placeholder="Job title, keyword or company"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

            </div>

            <div className="search-divider"></div>

            <div className="search-item">

                <MapPin size={20} />
                <input type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

            </div>

            <div className="search-divider"></div>

            <button className="search-btn" onClick={onSearch}>
                Search Jobs
            </button>

        </div>

    );

}

export default SearchBar;