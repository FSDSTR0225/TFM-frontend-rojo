// src/components/ChatPanel.jsx
import { useContext, useState, useEffect, useRef } from "react";
import { AvatarImage } from "../../components/AvatarImage"; // ajusta la ruta si hace falta
import { AuthContext } from "../../context/authContext";
import { CiImageOn } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { IoSend } from "react-icons/io5";
import { getMessages, getUsers, sendMessage, suscribeToMessages, unsubscribeFromMessages } from "../../services/messagesService";
import { NameUsers } from "../../components/NameUsers";
import { PiCaretLeft } from "react-icons/pi";

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
    console.log('Usuario seleccionado: ', usuario);
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

  {usuariosConectados.map((usuario) => {
    console.log('Usuarios conectados: ', usuario);
  
  })}


  return (
    <div className="flex flex-col h-full">
      
      
        {/* Sección de usuarios conectados */}
        

        {screen === "welcome" && (
          <>
          <div
        className="p-4 border-b border-neutral-70 flex justify-between items-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(55, 200, 72, 0.5) 10%, rgba(0, 119, 255, 0.5) 100%)",
        }}
      >
        <div className="flex items-center space-x-2">
          {/* Avatar del usuario */}
            <AvatarImage user={user} width={9} />
          <h2 className="text-md font-medium">Messages</h2>
        </div>
        <button onClick={onClose} className="text-sm">
          ✕
        </button>
      </div>
          
         <div className="flex flex-col mt-2 p-2 gap-4 space-x-2 overflow-x-auto bg-neutral-90">
          {usuariosConectados.map((usuario) => (
            <button
              key={usuario._id}
              className={`btn  p-2 py-6 flex items-center justify-between mx-2 focus:outline-none ${ ( usuario?.role?.type || usuario?.roles?.type ) === "recruiter" ? "bg-primary-50/10 border-primary-50 shadow-primary-50" : "bg-secondary-50/10 border-secondary-50 hover:border-secondary-30 shadow-secondary-50 " } hover:scale-105  shadow   transition-all duration-200 ease-in-out`}
              onClick={() => handleSelectedUser(usuario)}
              type="button"
            >
              <div className="">
              <AvatarImage user={usuario} width={8} />
                
              </div>
              <NameUsers user={usuario} classProps={"text-xs "} />
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(usuario._id) ? "online" : "offline"}
              </div>
            </button>
          ))}
        </div>
        </>
        )}

        {screen === "chat" && (
          <div className="flex flex-col h-full bg-neutral-100 rounded-xl shadow-lg overflow-hidden border border-zinc-700">
            {/* Encabezado */}
            <div className="flex items-center p-3 px-4 justify-between border-b border-zinc-700 bg-gradient-to-r from-green-500 to-blue-500">
            <div className="flex items-center gap-4">
            <button className="" onClick={backToWelcome} aria-label="Close"><PiCaretLeft /></button>
              <AvatarImage user={userSelected} width={8} />
              <div>
                <NameUsers user={userSelected} classProps={"text-sm font-bold"} />
                <span className="text-xs text-zinc-200">
                  {onlineUsers.includes(userSelected?._id) ? "online" : "offline"}
                </span>
              </div>
              </div>

              <button onClick={onClose} className="text-sm">
          ✕
        </button>
            </div>

            {/* Lista de mensajes */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-neutral-100">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${message.senderId === profile._id ? "chat-end" : "chat-start"} `}
                  ref={messageEndRef}>
                  <div className="chat-image avatar border rounded-full border-neutral-50">
                      {
                        message.senderId === profile._id
                          ? <AvatarImage user={profile} width={8} /> || "/avatar.png"
                          : <AvatarImage user={userSelected} width={8} /> || "/avatar.png"
                      }
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
  );
}
