import { useState,createContext } from "react";
import { loginUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [profile, setProfile] = useState();

    const getProfile = async (email,password) =>{
        const resp = await loginUser(email,password);
        console.log('datos recibidos: ',resp);
        setProfile(resp.user);
    }

    return (
        <AuthContext.Provider value={{getProfile,profile}}>
            {children}
        </AuthContext.Provider>
    );
}