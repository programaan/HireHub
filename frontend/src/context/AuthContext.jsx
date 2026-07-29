import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {

            const token = localStorage.getItem("access");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const me = await getMe();
                setUser(me);

            } catch (error) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                setUser(null);
            }

            setLoading(false);
        };

        loadUser();

    }, []);

    const login = (data) => {

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        setUser(data.user);
    };

    const updateUser = (newData) => {

        setUser((prev) => ({
            ...prev,
            ...newData,
        }));

    };

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);