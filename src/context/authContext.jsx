import { useState, createContext, useEffect, useRef } from "react";
import { getUserLogged } from "../services/authService";
import { io } from "socket.io-client";

export const AuthContext = createContext();
const BASE_URL='http://localhost:3000';
export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    

    // Mantén el socket en una ref para que no cause re-render
    const socketRef = useRef(null);
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

    useEffect(() => {
        if (profile && !socketRef.current) {
            socketRef.current = io(BASE_URL, {
                query: { userId: profile._id }
            });
            socketRef.current.on("connect", () => {
                console.log("Socket conectado con id:", socketRef.current.id);
            });
            socketRef.current.on("disconnect", () => {
                console.log("Socket desconectado");
            });
            socketRef.current.on("getOnlineUsers", (users) => {
                console.log('getOnlineUsers',users);
                setOnlineUsers(users);
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setOnlineUsers([]);
            }
        }
    }, [profile])


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token && !profile) {
            console.log("🚀 ~ useEffect ~ token:", token)
            infoUserLogged();

        }
    }, [token]);

    const logout = () => {
        setProfile(null);
        setToken(null);
        localStorage.removeItem('token');
        if (socketRef.current) {
            
            socketRef.current.disconnect();
            socketRef.current = null;
            
        }
    };


    return (
        <AuthContext.Provider value={{ profile, setProfile, token, setToken, logout, onlineUsers, socket: socketRef.current }}>
            {children}
        </AuthContext.Provider>
    );
};