import React from 'react'
import { capitalize, getInitials } from '../../../utils/utils'
import { FiExternalLink } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'

export const RecContactCard = ({owner}) => {

  const completeName = `${capitalize(owner?.name)} ${capitalize(owner?.surname)}`

  return (
    <aside className='card bg-base-200 shadow-xl border border-base-100 flex-col text-sm md:text-lg lg:min-w-60'>
            <div className='card-body flex-row lg:flex-col  gap-4 items-center'>
              <div className='avatar'>
                {owner?.role?.recruiter?.logo ? (
                  <div className='avatar'>
                  <div className='size-18 sm:size-24 rounded-full'>
                    <img src={owner.role.recruiter.logo} alt="Logo" />
                  </div>
                  </div>
                ) : (
                  <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full size-18 sm:size-24">
                    <span className="text-4xl font-bold">{getInitials(completeName)}</span>
                  </div>
                  </div>
                  
                )}
              </div>
              <div>
                {owner.role.recruiter.companyName ? (
                  <>
                    <p className='font-bold text-md md:text-xl'>{completeName}</p>
                    <p>{owner.role.recruiter.companyName}</p>
                  </>
                ) : (
                  <p>{owner.name}</p>
                )}
                {owner.role.recruiter.website &&(<a
                  href='goole.com'
                  className='flex items-center gap-2'
                >
                  <FiExternalLink />
                  {owner.role.recruiter.website}
                </a>)}
                {owner?.role?.recruiter?.contact[0]?.email &&(<a
                  href='goole.com'
                  className='flex items-center gap-2'
                >
                  <MdOutlineMailOutline />
                  {owner.role.recruiter.contact[0].email}
                </a>)}
                <button className="btn w-full btn-sm lg:btn-md mt-2 lg:mt-6">Contact</button>
              </div>
            </div>
          </aside>
  )
}
