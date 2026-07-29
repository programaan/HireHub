import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const mobileMenuRef = useRef(null);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(e) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target) &&
                !e.target.closest(".menu-toggle")
            ) {
                setMobileMenuOpen(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const handleLogout = () => {

        setOpen(false);
        setMobileMenuOpen(false);

        logout();
        navigate("/");

    };

    return (

        <header className="header">

            <div className="container navbar">

                <div className="logo">

                    <Link to="/" onClick={() => {
                            setOpen(false);
                            setMobileMenuOpen(false);
                        }}
                    >
                        <span>Hire</span>Hub
                    </Link>

                </div>

                <nav className="nav-links">

                    <Link to="/" onClick={() => {
                            setOpen(false);
                            setMobileMenuOpen(false);
                        }}
                    >
                        Home
                    </Link>

                    <Link to="/jobs" onClick={() => {
                            setOpen(false);
                            setMobileMenuOpen(false);
                        }}
                    >
                        Jobs
                    </Link>

                    <Link to="/companies" onClick={() => {
                            setOpen(false);
                            setMobileMenuOpen(false);
                        }}
                    >
                        Companies
                    </Link>

                </nav>

                <div className="nav-right">

                    {!user ? (

                        <Link to="/account" className="signup-btn"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Account
                        </Link>

                    ) : (

                        <div className="profile-dropdown" ref={dropdownRef}>

                            <button type="button" className="profile-btn"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    setOpen(!open);
                                }}
                            >

                                <div className="profile-avatar">

                                    {user.role === "candidate" && user.profile_picture ? (

                                        <img
                                            src={user.profile_picture}
                                            alt={user.full_name}
                                            className="avatar-img"
                                        />

                                    ) : user.role === "recruiter" && user.company_logo ? (

                                        <img
                                            src={user.company_logo}
                                            alt={user.full_name}
                                            className="avatar-img"
                                        />

                                    ) : (

                                        (user.full_name || user.email)
                                            ?.charAt(0)
                                            .toUpperCase()

                                    )}

                                </div>

                                <ChevronDown size={18} />

                            </button>

                            {open && (

                                <div className="dropdown-menu">

                                    {user.role === "candidate" ? (
                                        <>
                                            <Link to="/profile"
                                                onClick={() => setOpen(false)}
                                            >
                                                My Profile
                                            </Link>

                                            <Link to="/candidate/dashboard"
                                                onClick={() => setOpen(false)}
                                            >
                                                Dashboard
                                            </Link>

                                            <Link to="/applications"
                                                onClick={() => setOpen(false)}
                                            >
                                                Applications
                                            </Link>

                                            <Link to="/saved-jobs"
                                                onClick={() => setOpen(false)}
                                            >
                                                Saved Jobs
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/company-profile"
                                                onClick={() => setOpen(false)}
                                            >
                                                Company Profile
                                            </Link>

                                            <Link to="/recruiter/dashboard"
                                                onClick={() => setOpen(false)}
                                            >
                                                Dashboard
                                            </Link>

                                            <Link to="/recruiter/post-job"
                                                onClick={() => setOpen(false)}
                                            >
                                                Post Job
                                            </Link>

                                        </>
                                    )}

                                    <button type="button" className="logout-btn"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                </div>

                            )}

                        </div>

                    )}

                    <button
                        className="menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>

                </div>

            </div>

            {mobileMenuOpen && (
                <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {mobileMenuOpen && (

                <div className="mobile-menu" ref={mobileMenuRef}>

                    <Link to="/" onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>

                    <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}
                    >
                        Jobs
                    </Link>

                    <Link to="/companies" onClick={() => setMobileMenuOpen(false)}
                    >
                        Companies
                    </Link>

                    {!user ? (

                        <Link to="/account" onClick={() => setMobileMenuOpen(false)}
                        >
                            Account
                        </Link>

                    ) : (

                        <>

                            <div className="mobile-menu-divider"></div>

                            {user.role === "candidate" ? (
                                <>
                                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                                        My Profile
                                    </Link>

                                    <Link to="/candidate/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                        Dashboard
                                    </Link>

                                    <Link to="/applications" onClick={() => setMobileMenuOpen(false)}>
                                        Applications
                                    </Link>

                                    <Link to="/saved-jobs" onClick={() => setMobileMenuOpen(false)}>
                                        Saved Jobs
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/company-profile" onClick={() => setMobileMenuOpen(false)}>
                                        Company Profile
                                    </Link>

                                    <Link to="/recruiter/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                        Dashboard
                                    </Link>

                                    <Link to="/recruiter/post-job" onClick={() => setMobileMenuOpen(false)}>
                                        Post Job
                                    </Link>
                                </>
                            )}

                            <button className="mobile-logout-btn"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    handleLogout();
                                }}
                            >
                                Logout
                            </button>

                        </>

                    )}

                </div>

            )}

        </header>

    );

}

export default Navbar;