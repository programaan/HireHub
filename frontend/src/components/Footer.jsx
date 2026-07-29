import { Link } from "react-router-dom";

import { BriefcaseBusiness, ArrowRight } from "lucide-react";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {

    return (

        <footer className="footer">

            <div className="container footer-container">

                <div className="footer-about">

                    <div className="footer-logo">

                        <BriefcaseBusiness size={28} />

                        <span>HireHub</span>

                    </div>

                    <p>Your gateway to the best job opportunities around the world.</p>

                    <div className="footer-social">

                        <FaFacebookF />
                        <FaTwitter />
                        <FaLinkedinIn />
                        <FaInstagram />

                    </div>

                </div>

                <div className="footer-links">

                    <h4>For Job Seekers</h4>
                    <Link to="/jobs">Browse Jobs</Link>
                    <Link to="/companies">Browse Companies</Link>

                </div>

                <div className="footer-links">

                    <h4>For Employers</h4>
                    <Link to="/recruiter/post-job">Post a Job</Link>
                    <Link to="/account">Employer Login</Link>

                </div>

                <div className="footer-links">

                    <h4>Company</h4>
                    <Link to="/">About Us</Link>
                    <Link to="/">Contact Us</Link>
                    <Link to="/">Terms & Conditions</Link>
                    <Link to="/">Privacy Policy</Link>

                </div>

                

            </div>

            <div className="footer-bottom">

                © 2026 HireHub. All Rights Reserved.

            </div>

        </footer>

    );

}

export default Footer;