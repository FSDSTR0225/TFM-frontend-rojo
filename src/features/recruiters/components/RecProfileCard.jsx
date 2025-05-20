import { PiBuildingOffice, PiEnvelope, PiGlobe, PiMapPinArea, PiPhone } from 'react-icons/pi';
import { capitalize, getInitials } from '../../../utils/utils';
import { useNavigate } from "react-router";

export const RecProfileCard = ({ recruiter, profile, id }) => {
  const navigate = useNavigate();
  const name = capitalize(recruiter?.name || '');
  const surname = capitalize(recruiter?.surname || '');
  const completeName = `${name} ${surname}`.trim() || 'Unknown Recruiter';
  const isOwner = profile?._id === id;
  return (
    <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col text-sm md:text-lg w-full md:max-w-100">

      <div className="card-body">
        <div className="flex  flex-col items-center">
          {recruiter?.role?.recruiter?.logo ? (
            <div className='avatar'>
              <div className='size-20 rounded-full'>
                <img
                  src={recruiter?.role.recruiter.logo}
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
          <h2 className="text-lg font-semibold">{completeName}</h2>
          <p className="text-sm text-gray-400 mb-4">{recruiter?.role.type}</p>
        </div>
        <ul className="text-gray-300 space-y-1 mb-4">
          {/* Solo muestra si companyName está disponible */}
          {recruiter?.role?.recruiter?.companyName && (
            <li className="flex gap-2 items-center">
              <PiBuildingOffice size={20} />
              {recruiter.role.recruiter.companyName}
            </li>
          )}

          {/* Solo muestra si location está disponible */}
          {recruiter?.role?.recruiter?.location && (
            <li className="flex gap-2 items-center">
              <PiMapPinArea size={20} />
              {recruiter.role.recruiter.location}
            </li>
          )}

          {/* Solo muestra si contact.email está disponible */}
          {recruiter?.role?.recruiter?.contact?.email && (
            <li className="flex gap-2 items-center">
              <PiEnvelope size={20} />
              {recruiter.role.recruiter.contact.email}
            </li>
          )}

          {/* Solo muestra si contact.phone está disponible */}
          {recruiter?.role?.recruiter?.contact?.phone && (
            <li className="flex gap-2 items-center">
              <PiPhone size={20} />
              {recruiter.role.recruiter.contact.phone}
            </li>
          )}

          {/* Solo muestra si website está disponible */}
          {recruiter?.role?.recruiter?.website && (
            <li className="flex gap-2 items-center">
              <a
                href={recruiter.role.recruiter.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center hover:underline"
              >
                <PiGlobe size={20} />
                {recruiter.role.recruiter.website}
              </a>
            </li>
          )}
        </ul>
        <div>
          <h3 className="text-white font-semibold mb-1">About the recruiter:</h3>
          <p className="text-sm text-gray-400">
            {recruiter?.description}
          </p>
        </div>
        <div className='flex justify-center mt-4'>
          {(isOwner && profile?.role?.type === 'recruiter') && (<button onClick={() => navigate('/private-rec/dashboard')} className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer text-sm">
            dashboard
          </button>)}
        </div>
      </div>


    </div>
  )
}
