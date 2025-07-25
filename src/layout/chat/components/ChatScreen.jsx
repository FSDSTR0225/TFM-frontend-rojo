
import { AvatarImage } from '../../../components/AvatarImage'
import { NameUsers } from '../../../components/NameUsers'
import { PiCaretLeft } from 'react-icons/pi'
import { TiDelete } from 'react-icons/ti'
import { CiImageOn } from 'react-icons/ci'
import { IoSend } from 'react-icons/io5'
import { formatMessageTime } from '../../../utils/utils'

export const ChatScreen = ({ onClose, onlineUsers,messages, messageEndRef, userSelected, profile, backToWelcome, sendMessage, fileInputRef, imagePreview, setMessage, message, removeImage, imageChange }) => {
  return (
<div className="flex flex-col h-dvh max-h-dvh bg-neutral-100 rounded-xl shadow-lg overflow-hidden border border-zinc-700">
  {/* Encabezado */}
  <div className="p-4 border-b border-neutral-80 flex justify-between items-center bg-gradient-to-r from-[#37c848cc] via-[#37c848cc] to-[#0077ffcc]">
    <div className="flex items-center gap-4">
      <button onClick={backToWelcome} aria-label="Close">
        <PiCaretLeft />
      </button>
      <AvatarImage user={userSelected} width={8} />
      <div>
        <NameUsers user={userSelected} classProps="text-sm font-bold" />
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
  <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-neutral-100 scroll-smooth">
    {messages.map((message) => (
      <div
        key={message._id}
        className={`chat ${message.senderId === profile._id ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image">
          {message.senderId === profile._id
            ? <AvatarImage user={profile} width={8} />
            : <AvatarImage user={userSelected} width={8} />}
        </div>
        <time className="text-xs opacity-50 ml-1">
          {formatMessageTime(message.createdAt)}
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
    {/* Ancla para hacer scroll al último mensaje */}
    <div ref={messageEndRef} />
  </div>

  {/* Preview de imagen (si hay) */}
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

  {/* Input de texto y botones */}
  <div className="sticky bottom-0 left-0 right-0 p-3 border-t border-zinc-700 bg-zinc-900 flex items-center gap-2 z-10">
    <form
      onSubmit={sendMessage}
      className="flex items-center justify-between bg-zinc-800 border border-zinc-600 rounded-lg px-2 py-1 space-x-2 w-full"
    >
      {/* Campo de texto */}
      <div className="flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="w-full bg-transparent text-white text-sm px-2 py-1 focus:outline-none"
        />
      </div>

      {/* Input de imagen oculto */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={imageChange}
      />

      {/* Botones */}
      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`text-xl hover:text-emerald-500 transition-colors ${
            imagePreview ? "text-emerald-500" : "text-zinc-400"
          }`}
        >
          <CiImageOn />
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
        >
          <IoSend size={16} />
        </button>
      </div>
    </form>
  </div>
</div>
  )
}
