// src/components/ChatPanel.jsx
import { useContext, useState, useEffect, useRef } from "react";
import { AvatarImage } from "../../components/AvatarImage"; // ajusta la ruta si hace falta
import { io } from 'socket.io-client'
import { AuthContext } from "../../context/authContext";
import { CiImageOn } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { IoSend } from "react-icons/io5";
import { getMessages, getUsers, sendMessage } from "../../services/messagesService";
const socket = io('http://localhost:3000');

export default function ChatPanel({ onClose, user }) {
  const { profile, onlineUsers } = useContext(AuthContext);
  // const SENDER_NAME = profile?.name || 'Anonymous';
  const [screen, setScreen] = useState("welcome");
  const [message, setMessage] = useState('');
  // const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([])
  const [usuariosConectados, setUsuariosConectados] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const messageEndRef = useRef(null);

  const token = localStorage.getItem('token');

  // const goTo = (next) => setScreen(next);

  console.log('Hola mundo: ', onlineUsers);

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
    if (userSelected) {
      console.log('userSelected', userSelected);
      fetchMessage(userSelected._id)
    }
  }, [userSelected])

  useEffect(() => {
    getUsersConect()
  }, [])

  useEffect(() => {
    // socket.emit('register, SENDER_NAME')
    socket.on('chat message', (msg) => {
      console.log('mensaje recibido', msg);
      setMessages((prevMessages) => [...prevMessages, msg])
    })
    console.log('mensaje recibido', messages.length);
    return () => {
      socket.off('chat message');
    };
  }, [])


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

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (message.trim()) {
  //     socket.emit('chat message', {
  //       text: message,
  //       sender: SENDER_NAME
  //     })
  //     setMessage('')
  //   }
  // }


  return (
    <div className="flex flex-col h-full">
      <div
        className="p-4 border-b border-neutral-60 flex justify-between items-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(55, 200, 72, 0.5) 10%, rgba(0, 119, 255, 0.5) 100%)",
        }}
      >
        <div className="flex items-center space-x-2">
          {/* Avatar del usuario */}
          {user?.avatar ? (
            <AvatarImage user={user} width={9} />

          ) : (
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-0 text-sm font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <h2 className="text-md font-medium">Messages</h2>
        </div>
        <button onClick={onClose} className="text-sm">
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {/* Sección de usuarios conectados */}
        <div className="p-2 border-b border-neutral-200 bg-neutral-50 flex space-x-2 overflow-x-auto">
          {usuariosConectados.map((usuario) => (
            <button
              key={usuario._id}
              className="flex flex-col items-center mx-2 focus:outline-none"
              onClick={() => handleSelectedUser(usuario)}
              type="button"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold mb-1 relative">
                {usuario.avatar ? (
                  <AvatarImage user={usuario} width={10} />
                ) : (
                  usuario.name.charAt(0).toUpperCase()
                )}
                
              </div>
              <span className="text-xs">{usuario.name}</span>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(usuario._id) ? "online" : "offline"}
              </div>
            </button>
          ))}
        </div>

        {screen === "welcome" && (
          <div>
            <h1>Codepply</h1>
          </div>
        )}

        {screen === "chat" && (
          <div className="flex flex-col w-[360px] h-[500px] bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-700">
            {/* Encabezado */}
            <div className="flex items-center gap-3 p-3 border-b border-zinc-700 bg-gradient-to-r from-green-500 to-blue-500">
              {userSelected?.avatar ? (
                <img
                  src={userSelected.avatar}
                  alt={userSelected.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-neutral-100 text-black font-bold flex items-center justify-center">
                  {userSelected?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="text-white text-sm font-semibold">{userSelected?.name}</h2>
                <span className="text-xs text-zinc-200">
                  {onlineUsers.includes(userSelected?._id) ? "online" : "offline"}
                </span>
              </div>
            </div>

            {/* Lista de mensajes */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-zinc-950">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${message.senderId === profile._id ? "chat-end" : "chat-start"}`}
                  ref={messageEndRef}>
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border">
                      <img src={
                        message.senderId === profile._id
                          ? profile.avatar || "/avatar.png"
                          : userSelected.avatar || "/avatar.png"
                      } alt="profile pic" />
                    </div>
                  </div>
                  <time className="text-xs opacity-50 ml-1">
                    {message.createdAt}
                  </time>
                  <div className="chat-bubble flex flex-col">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Preview de la imagen (fuera del input box) */}
            {imagePreview && (
              <div className="p-3 border-t border-zinc-800 bg-zinc-950">
                <div className="relative w-fit">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-zinc-700"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-800 text-white flex items-center justify-center"
                  >
                    <TiDelete />
                  </button>
                </div>
              </div>
            )}

            {/* Input y botones */}
            <div className="p-3 border-t border-zinc-700 bg-zinc-900 flex items-center gap-2">
              <form onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-3 py-2 rounded-lg text-sm bg-zinc-800 text-white border border-zinc-600 focus:outline-none"
                />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`text-xl ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                >
                  <CiImageOn />
                </button>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  <IoSend size={15} />
                </button>
              </form>
            </div>
          </div>

        )}

      </div>
    </div>
  );
}
