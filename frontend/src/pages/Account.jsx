import { useState } from "react";
import { registerUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Helmet } from "react-helmet-async";


function Account() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        full_name: "",
        role: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (
            !formData.full_name ||
            !formData.email ||
            !formData.password ||
            !formData.role
        ) {
            toast.warning("Please fill all fields.");
            return;
        }

        try {
            setLoadingBtn(true);

            await registerUser(formData);
            toast.success("Registration successful! Please verify your email.");

            setIsLogin(true);
            setFormData({
                full_name: "",
                role: "",
                email: "",
                password: "",
            });

            setShowPassword(false);

        } 
        catch (error) {
            console.log(JSON.stringify(error.response?.data, null, 2));
            toast.error(error.response?.data?.detail || "Registration failed.");
        }
        finally{
            setLoadingBtn(false);
        }
    };

    const handleLogin = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
        toast.warning("Please fill all fields.");
        return;
    }

    try {
        setLoadingBtn(true);

        const response = await loginUser({
            email: formData.email,
            password: formData.password,
        });

        console.log(response);
        login(response);
        toast.success("Login Successful!");
        navigate("/");

        setFormData({
            full_name:"",
            role:"",
            email:"",
            password:"",
        });
        
        setShowPassword(false);

    } 
    catch (error) {
        console.log(error.response?.data);
        toast.error(error.response?.data?.detail || "Login failed.");
    }
    finally{
        setLoadingBtn(false);
    }

};

    return (

        <>
            <Helmet>
                <title>Account | HireHub</title>
            </Helmet>

            <section className="account-page">

                <div className="account-box">

                    <h2>
                        {
                            isLogin
                            ? "Welcome Back"
                            : "Create Your Account"
                        }
                    </h2>

                    <p className="account-subtitle">
                        {
                            isLogin
                            ? "Login to continue your career journey."
                            : "Join HireHub and discover opportunities."
                        }
                    </p>

                    <form
                        onSubmit={
                            isLogin
                                ? handleLogin
                                : handleRegister
                        }
                    >

                        {!isLogin && (

                            <>
                                <input
                                    required
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                />

                                <select
                                    required
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Role</option>
                                    <option value="candidate">Candidate</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>

                            </>

                        )}

                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            autoComplete="email"
                        />

                        <div className="password-field">

                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                autoComplete={
                                    isLogin
                                        ? "current-password"
                                        : "new-password"
                                }
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>

                        </div>

                        <div className="account-options">

                            {
                                isLogin && (

                                    <p className="forgot-password"
                                        onClick={() => navigate("/forgot-password")}
                                    >
                                        Forgot Password?
                                    </p>

                                )
                            }

                        </div>

                        <button
                            type="submit"
                            disabled={loadingBtn}
                        >
                            {
                                loadingBtn
                                    ? "Please wait..."
                                    : isLogin
                                    ? "Login"
                                    : "Register"
                            }
                        </button>

                    </form>

                    <p className="account-switch">

                        {
                            isLogin
                                ? "Don't have an account?"
                                : "Already have an account?"
                        }

                        <button type="button" className="toggle-btn"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setShowPassword(false);
                                setFormData({
                                    full_name:"",
                                    role:"",
                                    email:"",
                                    password:"",
                                });

                            }}
                        >

                            {
                                isLogin
                                    ? " Register"
                                    : " Login"
                            }

                        </button>

                    </p>

                </div>

            </section>

        </>

    );

}

export default Account;