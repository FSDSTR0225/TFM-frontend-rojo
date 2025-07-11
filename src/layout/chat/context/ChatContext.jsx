import { useContext, useState } from 'react';
import { createContext } from 'react';
import { AuthContext } from "../../../context/authContext";
export const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState("welcome");
  const { setNotifications } = useContext(AuthContext);

  const toggleChat = () => {
    setScreen("welcome");
    setIsOpen(!isOpen);
  };

  const backToWelcome = () => {
    setScreen("welcome");
    setSelectedUser(null);
  }
  const openChat = (user) => {
    toggleChat();
    setScreen("chat");
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setScreen("welcome");
    setSelectedUser(null);
    setIsChatOpen(false);
  };

  const handleSelectedUser = (usuario) => {
    setNotifications((prev) =>
      prev.filter(n => String(n.senderId) !== String(usuario._id))
    );
    setScreen("chat");
    setSelectedUser(usuario);
  }

  return (
    <ChatContext.Provider value={{ isChatOpen, selectedUser, setSelectedUser, openChat, closeChat, toggleChat, isOpen, backToWelcome, handleSelectedUser, screen }}>
      {children}
    </ChatContext.Provider>
  )
}
