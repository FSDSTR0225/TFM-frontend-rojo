
import { AvatarImage } from '../../../components/AvatarImage'
import { NameUsers } from '../../../components/NameUsers'

export const WelcomeScreen = ({ users, user, handleSelectedUser, onClose, notifications, profile }) => {
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
        <button onClick={onClose} className="text-sm cursor-pointer">
          ✕
        </button>
      </div>

      <div className="flex flex-col mt-2 p-2 gap-4 space-x-2 overflow-x-auto bg-neutral-">
       {Array.isArray(users) && users.filter(usuario => usuario && usuario._id).map((usuario) => {
  const roleType = usuario?.role?.type || (Array.isArray(usuario?.roles) ? usuario.roles[0]?.type : usuario?.roles?.type);
  const isRecruiter = roleType === "recruiter";
  const newMessages = Array.isArray(notifications)
  ? notifications.filter(
      (n) =>
        n &&
        usuario?._id &&
      profile?._id &&
        n.senderId === usuario._id &&
        n.type === 1 &&
        n.receiverId === profile?._id
    ).length
  : 0;

          return (
            <button
              key={usuario._id}
              className={`relative btn p-2  py-6 flex items-center justify-between gap-4 mx-2 focus:outline-none ${isRecruiter
                ? "bg-primary-50/10 border-secondary-50 hover:border-secondary-30 shadow-secondary-50"
                : "bg-secondary-50/10 border-primary-50 hover:border-primary-30 shadow-primary-50"
                } hover:scale-105 shadow transition-all duration-200 ease-in-out`}
              onClick={() => handleSelectedUser(usuario)}
              type="button"
            >
            <div className='flex  gap-4'>

              <div>
                <AvatarImage user={usuario} width={8} />
              </div>
              <NameUsers user={usuario} align='items-start' classProps={"text-xs"} >
                <span className={`text-[10px] text-neutral-30 font-normal `}>
                  {isRecruiter ? "Recruiter" : "Developer"}
                </span>
              </NameUsers>
            </div>
              <div className="text-sm items-center ">
                {newMessages > 0 && (
                  <span className="bg-red-500 text-xs px-2 py-0.5 self-end rounded-full animate-pulse inline-block ml-2 ">
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
