// src/components/ChatPanel.jsx
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { getMessages, getUsers, sendMessage, suscribeToMessages, unsubscribeFromMessages } from "../../services/messagesService";
import { ChatScreen } from "./components/ChatScreen";
import { WelcomeScreen } from "./components/WelcomeScreen";

export default function ChatPanel({ onClose, user }) {
  const { profile, onlineUsers, socket } = useContext(AuthContext);
  const SENDER_NAME = profile?.name || 'Anonymous';
  const [screen, setScreen] = useState("welcome");
  const [message, setMessage] = useState('');
  // const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([])
  const [usuariosConectados, setUsuariosConectados] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const messageEndRef = useRef(null);
  const handlerRef = useRef(null);
  const token = localStorage.getItem('token');

  // const goTo = (next) => setScreen(next);

const backToWelcome = () => {
  setScreen("welcome");
  setUserSelected(null);
}



  const getUsersConect = async () => {
    try {
      const users = await getUsers(token);
      setUsuariosConectados(users)
    } catch (error) {
      throw new Error(error);
    }
  }

  const fetchMessage = async (userId) => {
    try {
      const messages = await getMessages(token, userId); //falta user select
      setMessages(messages)
    } catch (error) {
      throw new Error(error);
    }
  }

  const handleSelectedUser = (usuario) => {
    setScreen("chat");
    setUserSelected(usuario);
  }

  useEffect(() => {
    if (!socket || !userSelected) return;

    fetchMessage(userSelected._id);

    // Desuscribimos el anterior si existía
    if (handlerRef.current) {
      unsubscribeFromMessages(socket, handlerRef.current);
      handlerRef.current = null;
    }

    // Nos suscribimos y guardamos el handler
    handlerRef.current = suscribeToMessages(userSelected._id, socket, setMessages);

    // Cleanup automático al desmontar o cambiar usuario
    return () => {
      if (handlerRef.current) {
        unsubscribeFromMessages(socket, handlerRef.current);
        handlerRef.current = null;
      }
    };
  }, [userSelected, socket]);

  useEffect(() => {
    getUsersConect()
  }, [])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])




  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      // toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !imagePreview) return;
    try {
      const resp = await sendMessage(token, message, imagePreview, userSelected._id);
      setMessages((prevMessages) => [...prevMessages, resp]);
      //Clear input fields after sending the message
      setMessage('');
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message: ", error);
    }
  }

  return (
    <div className="flex flex-col h-full">
      
      
        {/* Sección de usuarios conectados */}
        

        {screen === "welcome" && (
          <WelcomeScreen users={usuariosConectados} handleSelectedUser={handleSelectedUser} onlineUsers={onlineUsers} user={user} onClose={onClose} />
        )}

        {screen === "chat" && (
          <ChatScreen onClose={onClose} messages={messages} messageEndRef={messageEndRef} userSelected={userSelected} onlineUsers={onlineUsers} profile={profile} backToWelcome={backToWelcome} sendMessage={handleSendMessage} fileInputRef={fileInputRef} imagePreview={imagePreview} setMessage={setMessage} message={message}  removeImage={removeImage} imageChange={handleImageChange}/>
        )}

     
    </div>
  );
}
