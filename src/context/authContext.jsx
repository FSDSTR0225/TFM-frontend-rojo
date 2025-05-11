import { useState, createContext, useEffect } from "react";
import { getUserLogged } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [token, setToken] = useState(null);

    const infoUserLogged = async () => {
        try {
            const resp = await getUserLogged(token);
            setProfile(resp);
        } catch (err) {
            setProfile(null);
            setToken(null);
            localStorage.removeItem('token');
        }
    };

    const logout = () => {
        setProfile(null);
        setToken(null);
        localStorage.removeItem('token');
    };


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token && !profile) {
            infoUserLogged();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ profile, setProfile, token, setToken,logout }}>
            {children}
        </AuthContext.Provider>
    );
};