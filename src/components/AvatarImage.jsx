import React from 'react'

import { capitalize, getInitials } from '../utils/utils';

export const AvatarImage = ({user, width}) => {

  // Para usar este componente son necesario 2 Props.
  // user donde le pasaremos la imagen del avatar si es del owner, recruiter. profile
  // width donde pondremos un numero de width
{/* <AvatarImage user={offer.owner} width={8} />
 <AvatarImage user={profile} /> */}

    const name = capitalize(user?.name || '');
const surname = capitalize(user?.surname || '');
const completeName = `${name} ${surname}`.trim() || 'Unknown Recruiter';

  return (
    < >
     {( user?.avatar) ? (      
                    <div className='avatar'>
                      <div className={`rounded-full size-${width || 10} `}>
                        <img
                          src={ user?.avatar}
                          alt='Logo'
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='avatar avatar-placeholder'>
                      <div className={`bg-neutral text-neutral-content rounded-full size-${width || 10}`}>
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
