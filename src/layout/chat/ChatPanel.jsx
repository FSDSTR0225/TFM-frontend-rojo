// src/components/ChatPanel.jsx
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { getMessages, getUsers, sendMessage, suscribeToMessages, unsubscribeFromMessages } from "../../services/messagesService";
import { ChatScreen } from "./components/ChatScreen";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ChatContext } from "./context/ChatContext";




export default function ChatPanel({ onClose, user }) {
  const { profile, onlineUsers, socket, notifications, setNotifications } = useContext(AuthContext);
  const { selectedUser, backToWelcome, handleSelectedUser, screen } = useContext(ChatContext);
  const SENDER_NAME = profile?.name || 'Anonymous';
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([])
  const [usuariosConectados, setUsuariosConectados] = useState([]);

  const messageEndRef = useRef(null);
  const handlerRef = useRef(null);
  const token = localStorage.getItem('token');

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

  // useEffect(() => {
  //   if (usuariosConectados.includes(selectedUser)) {
  //     setUsuariosConectados(usuariosConectados.filter(user => user._id !== selectedUser._id));
  //   }
  // }, [message])


  useEffect(() => {
    if (!socket || !selectedUser) return;

    fetchMessage(selectedUser._id);

    // Desuscribimos el anterior si existía
    if (handlerRef.current) {
      unsubscribeFromMessages(socket, handlerRef.current);
      handlerRef.current = null;
    }

    // Nos suscribimos y guardamos el handler
    handlerRef.current = suscribeToMessages(selectedUser._id, socket, setMessages);
    // Cleanup automático al desmontar o cambiar usuario
    return () => {
      if (handlerRef.current) {
        unsubscribeFromMessages(socket, handlerRef.current);
        handlerRef.current = null;
      }
    };
  }, [selectedUser, socket]);

  useEffect(() => {
    console.log('🔔 Notificaciones actualizadas:', notifications);
  }, [notifications]);

  useEffect(() => {
    getUsersConect()
  }, [])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);




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
      const resp = await sendMessage(token, message, imagePreview, selectedUser._id);
      setMessages((prevMessages) => [...prevMessages, resp]);
      //Emitir evento de socket para enviar la notificación
      socket.emit("sendNotification", {
        senderId: profile._id,           // <--- agrega esto
        senderName: SENDER_NAME,
        receiverId: selectedUser._id,
        receiverName: selectedUser.name,
        type: 1,
        user: {
    _id: profile._id,
    name: profile.name,
    role: profile.role,
    roles: profile.roles,
    avatar: profile.avatar,
    // cualquier otra propiedad útil
  }
      });

       setUsuariosConectados((prev) => {
      if (!prev.some(user => user._id === selectedUser._id)) {
        return [...prev, selectedUser];
      }
      return prev;
    });

      //Clear input fields after sending the message
      setMessage('');
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message: ", error);
    }
  }

  useEffect(() => {
    if (!socket) return;

    const handler = (data) => {
      console.log("🔔 Nueva notificación:", data);
      setNotifications((prev) => [...prev, { ...data, createdAt: Date.now() }]);
      if (data.type === 1) {
        setUsuariosConectados((prev) => {
          if (!prev.some(user => user._id === data.senderId)) {
            return [...prev, data.user];
          }
          return prev;
        });
      }
    };

    socket.on("getNotification", handler);

    return () => {
      socket.off("getNotification", handler);
    };
  }, [socket]);


  return (
    <div className="flex flex-col h-full">


      {/* Sección de usuarios conectados */}


      {screen === "welcome" && (
        <WelcomeScreen users={usuariosConectados}
          handleSelectedUser={handleSelectedUser}
          onlineUsers={onlineUsers}
          user={user}
          notifications={notifications}
          profile={profile}
          onClose={onClose} />
      )}

      {screen === "chat" && (
        <ChatScreen onClose={onClose}
          messages={messages}
          messageEndRef={messageEndRef}
          userSelected={selectedUser}
          onlineUsers={onlineUsers}
          profile={profile}
          backToWelcome={backToWelcome}
          sendMessage={handleSendMessage}
          fileInputRef={fileInputRef}
          imagePreview={imagePreview}
          setMessage={setMessage}
          message={message}
          removeImage={removeImage}
          imageChange={handleImageChange} />
      )}


    </div>
  );
}
