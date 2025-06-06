
import { EditButton } from '../../../components/EditButton';

import { MainRecButton } from '../../../components/MainRecButton';
import { PiMapPinArea } from 'react-icons/pi';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router';

export const OfferInfo = ({offer, isOpen, setIsOpen, handleApply}) => {
const navigate = useNavigate();
  const { profile } = useContext(AuthContext);
  const isOwner = offer.owner?._id === profile?._id;
  const isRecruiter = profile?.role.type === "recruiter";
  
const handleDashboard = () => {
   navigate(`/private-rec/dashboard/${offer._id}`);
}

  return (
    <article  className=' card bg-neutral-80 shadow-xl border border-neutral-70 flex-col  w-full '>
            <div className='card-body gap-6'>
              {isOwner && <EditButton classProps={"self-end"} onClick={() => setIsOpen(!isOpen)} />}
              <div className='space-y-4'>
              <h2 className='text-xl md:text-2xl  font-bold m'>{offer.position}</h2>
              <p className='text-neutral-10'>{offer.role}</p>
              </div>
              
              <div className='flex items-center gap-4 m-4'>
                <PiMapPinArea className='size-6' />
                {offer.location}
                <span className='badge badge-soft badge-info'>{offer.contractType}</span>
              </div>
              <p className="whitespace-pre-line break-words">{offer.description}</p>
              <h3>Necessary Skills:</h3>
              <div className='flex gap-5 flex-wrap'>
                {offer.skills.map((skill, index) => {
                  return <span key={index} className='badge badge-soft badge-accent"'>{skill}</span>;
                })}
              </div>
              {offer.language && (
                <>
                  <p>Language: {offer.language}</p>
                </>
              )}
              {offer.salary && (
                <>
                  <p>Salary: {offer.salary}</p>
                </>
              )}
              {!isRecruiter && <MainRecButton classProps='w-25 self-end' onClick={handleApply}> 
                Apply Now
              </MainRecButton>}
              {isOwner && <MainRecButton classProps='w-30 self-end' onClick={handleDashboard} > 
                Dashboar offer
              </MainRecButton>}
            </div>
          </article>
  )
}
