import React from 'react'

import { capitalize, getInitials } from '../utils/utils';

export const AvatarCard = ({owner, profile}) => {


    const name = capitalize(owner?.name || profile?.name || '');
const surname = capitalize(owner?.surname || profile?.surname || '');
const completeName = `${name} ${surname}`.trim() || 'Unknown Recruiter';

  return (
    < >
     {( profile?.avatar || owner?.avatar) ? (      
                    <div className='avatar'>
                      <div className='size-10 rounded-full'>
                        <img
                          src={profile?.avatar || owner?.avatar}
                          alt='Logo'
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='avatar avatar-placeholder'>
                      <div className='bg-neutral text-neutral-content rounded-full size-20'>
                        <span className=' font-bold'>{getInitials(completeName)}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col -space-y-1">
                    <p className='text-sm'>{completeName}</p>
                    <p className="text-xs text-neutral-10 ">{profile?.role?.type || owner?.role?.type}</p>
                  </div>
        </>             
  )
}
