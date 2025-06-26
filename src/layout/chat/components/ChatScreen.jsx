import React from 'react'
import { AvatarImage } from '../../../components/AvatarImage'
import { NameUsers } from '../../../components/NameUsers'
import { PiCaretLeft } from 'react-icons/pi'
import { TiDelete } from 'react-icons/ti'
import { CiImageOn } from 'react-icons/ci'
import { IoSend } from 'react-icons/io5'

export const ChatScreen = ({onClose, messages, messageEndRef, userSelected, onlineUsers, profile, backToWelcome, sendMessage, fileInputRef, imagePreview, setMessage, message, removeImage, imageChange}) => {
  return (
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
                  <form onSubmit={sendMessage}>
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
                      onChange={imageChange}
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
  )
}
