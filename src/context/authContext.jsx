import { useState, createContext, useEffect } from "react";
import { getUserLogged, loginUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState();
    const [token, setToken] = useState();

    const getProfile = async (email, password) => {
        const resp = await loginUser(email, password); 
        localStorage.setItem('token', resp.token);
        setToken(resp.token);
        return resp.token;
    };

    // Cargar perfil si ya hay sesión guardada
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        getUserLogged(storedToken)
            .then(user => setProfile(user))
            .catch(() => {
                localStorage.removeItem('token');
                setToken(null);
                setProfile(null);
            });
    }, [token]);

    return (
        <AuthContext.Provider value={{ getProfile, profile, token }}>
            {children}
        </AuthContext.Provider>
    );
}