
import { capitalize, getInitials } from '../../../utils/utils'
import { FiExternalLink } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { Link } from 'react-router';

export const RecContactCard = ({owner}) => {

  const name = capitalize(owner?.name || '');
const surname = capitalize(owner?.surname || '');
const completeName = `${name} ${surname}`.trim() || 'Unknown Recruiter';

  return (
    <aside className='card bg-base-200 shadow-xl border border-base-100 flex-col text-sm md:text-lg lg:min-w-60'>
            <div className='card-body flex-row lg:flex-col  gap-4 items-center'>
              <Link to={`../recruiter/${owner._id}`} className='avatar'>
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
              </Link>
              <div>
                {owner?.role?.recruiter?.companyName || owner?.role?.recruiter?.company ? (
                  <>
                    <p className='font-bold text-md md:text-xl'>{completeName}</p>
                    <p>{owner?.role?.recruiter?.companyName || owner?.role?.recruiter?.company}</p>
                  </>
                ) : (
                  <p>{completeName}</p>
                )}
                {owner?.role?.recruiter?.website &&(<a
                  href='goole.com'
                  className='flex items-center gap-2'
                >
                  <FiExternalLink />
                  {owner?.role?.recruiter?.website}
                </a>)}
                {owner?.role?.recruiter?.contact[0]?.email &&(<a
                  href='goole.com'
                  className='flex items-center gap-2'
                >
                  <MdOutlineMailOutline />
                  {owner?.role?.recruiter?.contact[0].email}
                </a>)}
                <button className="btn w-full btn-sm lg:btn-md mt-2 lg:mt-6">Contact</button>
              </div>
            </div>
          </aside>
  )
}
