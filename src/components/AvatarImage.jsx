
import { capitalize, getInitials } from '../utils/utils';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useState } from 'react';

export const AvatarImage = ({user, width}) => {
const {onlineUsers} = useContext(AuthContext);
const isDeveloper = user?.role?.type === "developer";
const userOnline = onlineUsers.includes(user?._id);

  // Para usar este componente son necesario 2 Props.
  // user donde le pasaremos la imagen del avatar si es del owner, recruiter. profile
  // width donde pondremos un numero de width
{/* <AvatarImage user={offer.owner} width={8} />
 <AvatarImage user={profile} /> */}

   const sizeClasses = {
    4: 'size-4',
    5: 'size-5',
    6: 'size-6',
    7: 'size-7',
    8: 'size-8',
    9: 'size-9',
    10: 'size-10',
    11: 'size-11',
    12: 'size-12',
    14: 'size-14',
    16: 'size-16',
    20: 'size-20',
    24: 'size-24',
    32: 'size-32',
  };


  const sizeClass = sizeClasses[width] || sizeClasses[10];

    const name = capitalize(user?.name || '');
const surname = capitalize(user?.surname || '');
const completeName = `${name} ${surname}`.trim() || 'Unknown Recruiter';

const [imgError, setImgError] = useState(null);


  return (
    < >
     {( user?.avatar && !imgError) ? (      
                    <div className={`avatar outline-2 outline-neutral-90 rounded-full  ${userOnline && (isDeveloper ? 'avatar-online before:w-[20%] before:h-[20%] before:top-[6%] before:right-[2%]  before:bg-primary-50 outline-primary-50 ' : 'before:w-[20%] before:h-[20%] before:top-[6%] before:right-[2%] outline-secondary-50 avatar-online  before:bg-secondary-50')}`}>
                      <div className={`rounded-full ${sizeClass} `}>
                        <img
                          src={ user?.avatar}
                          alt='Avatar'
                          onError={() => setImgError(true)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={`avatar avatar-placeholder outline-2 outline-neutral-90 rounded-full  ${userOnline && (isDeveloper ? 'avatar-online before:w-[20%] before:h-[20%] before:top-[6%] before:right-[2%]  before:bg-primary-50 outline-primary-50 ' : 'before:w-[20%] before:h-[20%] before:top-[6%] before:right-[2%] outline-secondary-50 avatar-online  before:bg-secondary-50')}`}>
                      <div className={`bg-neutral text-neutral-content rounded-full ${sizeClass}`}>
                        <span className=' font-bold'>{getInitials(completeName)}</span>
                      </div>
                    </div>
                  )}
                  {/* <div className="flex flex-col -space-y-1">
                    <p className='text-sm'>{completeName}</p>
                    <p className="text-xs text-neutral-10 ">{profile?.role?.type || owner?.role?.type}</p>
                  </div> */}
        </>             
  )
}
