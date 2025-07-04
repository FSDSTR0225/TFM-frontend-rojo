import React from 'react'
import { AvatarImage } from '../../../components/AvatarImage'
import { NameUsers } from '../../../components/NameUsers'

export const WelcomeScreen = ({ users, onlineUsers, user, handleSelectedUser, onClose, notifications, profile }) => {
  console.log("+++++++++++++", notifications)
  return (
    <>
      <div
        className="p-4 border-b border-neutral-80 flex justify-between items-center bg-linear-130 from-[#37c84880] from-30% via-[#37c84880] via-30% to-[#0077ff80] to-70% "
      >
        <div className="flex items-center gap-4">
          {/* Avatar del usuario */}
          <AvatarImage user={user} width={9} />
          <h2 className="text-md font-medium">Messages</h2>
        </div>
        <button onClick={onClose} className="text-sm">
          ✕
        </button>
      </div>

      <div className="flex flex-col mt-2 p-2 gap-4 space-x-2 overflow-x-auto bg-neutral-">
        {users.map((usuario) => {
          // Cuenta notificaciones de tipo 1 que vienen de este usuario y son para el usuario logueado
          const newMessages = notifications.filter(
            n =>
              n.senderId === usuario._id &&
              n.type === 1 &&
              n.receiverId === profile?._id
          ).length;

          return (
            <button
              key={usuario._id}
              className={`relative btn p-2 py-6 flex items-center justify-between mx-2 focus:outline-none ${(usuario?.role?.type || usuario?.roles?.type) === "recruiter"
                ? "bg-primary-50/10 border-primary-50 shadow-primary-50"
                : "bg-secondary-50/10 border-secondary-50 hover:border-secondary-300 shadow-secondary-50"
                } hover:scale-105 shadow transition-all duration-200 ease-in-out`}
              onClick={() => handleSelectedUser(usuario)}
              type="button"
            >
              <div>
                <AvatarImage user={usuario} width={8} />
              </div>
              <NameUsers user={usuario} classProps={"text-xs "} />
              <div className="text-sm relative">
                {newMessages > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse inline-block ml-2">
                    {newMessages}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </>
  )
}
