import React from 'react'
import { AvatarImage } from '../../../components/AvatarImage'
import { NameUsers } from '../../../components/NameUsers'

export const WelcomeScreen = ({users, onlineUsers, user, handleSelectedUser, onClose}) => {
  return (
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
              {users.map((usuario) => (
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
  )
}
