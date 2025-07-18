import { useState, createContext, useEffect, useRef } from "react";
import { getUserLogged } from "../services/authService";
import { io } from "socket.io-client";

export const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlBackEnd = `${BASE_URL}`;

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(false);

  // Mantén el socket en una ref para que no cause re-render
  const socketRef = useRef(null);
  const infoUserLogged = async () => {
    try {
      setIsCheckingOnboarding(true);
      const resp = await getUserLogged(token);
      setProfile(resp);
    } catch (err) {
      setProfile(null);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setIsCheckingOnboarding(false);
    }
  };

  useEffect(() => {
    if (profile && !socketRef.current) {
      socketRef.current = io(urlBackEnd, {
        query: { userId: profile._id },
      });
      socketRef.current.on("connect", () => {
        
      });
      socketRef.current.on("disconnect", () => {
       
      });
      socketRef.current.on("getOnlineUsers", (users) => {
        
        setOnlineUsers(users);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setOnlineUsers([]);
      }
    };
  }, [profile]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token && !profile) {
      infoUserLogged();
    }
  }, [token]);

  const logout = () => {
    setNotifications([]);
    setProfile(null);
    setToken(null);
    localStorage.removeItem("token");
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
        token,
        setToken,
        logout,
        onlineUsers,
        notifications,
        setNotifications,
        socket: socketRef.current,
        isCheckingOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
