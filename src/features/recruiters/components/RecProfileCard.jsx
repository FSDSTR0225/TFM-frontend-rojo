import { PiBuildingOffice, PiEnvelope, PiGlobe, PiMapPinArea, PiPhone } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { EditButton } from "../../../components/EditButton";
import { useNavigate } from "react-router";
import { AvatarImage } from '../../../components/AvatarImage';
import { NameUsers } from '../../../components/NameUsers'
import { RecModalEdit } from './RecModalEdit';
import { getUserLogged } from '../../../services/authService';
export const RecProfileCard = ({ recruiter, profile, id, token, setProfile, onRecruiterUpdate, stats}) => {
  const navigate = useNavigate();
  const [isRecModalOpen, setIsRecModalOpen] = useState(false);
  const isOwner = profile?._id === id;

  useEffect(() => {
    console.log('Profile updated:', profile);
  }, [profile]);

  const updateProfile = async() => {
    let freshProfile = await getUserLogged(token);
    setProfile(freshProfile);
    if (onRecruiterUpdate) {
      await onRecruiterUpdate();
    }
  }

  const handleOpenModal = () => {
    setIsRecModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/2">
      <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col text-sm md:text-lg w-full md:max-w-100">
        <div className="card-body gap-3 items-center">
          {isOwner && profile?.role?.type === 'recruiter' &&
            <div className="w-full flex justify-end mb-2">
              <EditButton onClick={handleOpenModal} />
            </div>
          }
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center rounded-full w-32 h-32 text-8xl">
              <AvatarImage user={recruiter} width={32} />
            </div>
            <h1 className="text-xl font-bold mt-4 text-center">
              <NameUsers user={recruiter} classProps="text-lg font-semibold">
                {recruiter?.role.type}
              </NameUsers>
            </h1>
          </div>

          <ul className="text-gray-300 space-y-1 mb-4">
            {/* Solo muestra si companyName está disponible */}
            {recruiter?.role?.recruiter?.companyName && (
              <li className="flex gap-2 items-center">
                <PiBuildingOffice size={20} />
                {recruiter?.role?.recruiter?.companyName}
              </li>
            )}

            {/* Solo muestra si location está disponible */}
            {recruiter?.role?.recruiter?.location && (
              <li className="flex gap-2 items-center">
                <PiMapPinArea size={20} />
                {recruiter?.role?.recruiter?.location}
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
                {recruiter?.role?.recruiter?.contact?.phone}
              </li>
            )}

            {/* Solo muestra si website está disponible */}
            {recruiter?.role?.recruiter?.website && (
              <li className="flex gap-2 items-center">
                <a
                  href={recruiter?.role?.recruiter?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center hover:underline"
                >
                  <PiGlobe size={20} />
                  {recruiter?.role?.recruiter?.website}
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
        </div>
      </div>
      {isOwner && profile?.role?.type === 'recruiter' && <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col text-sm md:text-lg w-full md:max-w-100">
        <div className="flex flex-col p-4 ">
          <h2 className="text-center text-md mb-6 self-center">Total data since</h2>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col justify-between bg-[#2e2e2e] p-4 rounded-lg text-center">
              <h3 className="text-sm">Offers</h3>
            <p className="text-2xl">{stats?.totalOffers}</p>
            <p className="text-sm text-neutral-20">Active Offers</p>
            </div>
            <div className="flex flex-col justify-between bg-[#2e2e2e] p-4 rounded-lg text-center">
               <h3 className="text-sm">Applications</h3>
            <p className="text-2xl">{stats?.totalApplicants}</p>
            <p className="text-sm text-neutral-20">{stats?.avgDailyApplicationsLast7Days}% Last 7 days</p>
            </div>
            <div className="flex flex-col justify-between bg-[#2e2e2e] p-4 rounded-lg text-center">
               <h3 className="text-sm font-bold">Average</h3>
            <p className="text-2xl text-secondary-50">{stats?.avgApplicationsPerOffer}</p>
            <p className="text-sm text-neutral-20">Applications per offer</p>
            </div>
            <div className="flex flex-col justify-between bg-[#2e2e2e] p-4 rounded-lg text-center">
              <h3 className="text-sm ">Recent</h3>
            <p className="text-2xl">{stats?.applicationsLast7Days}</p>
            <p className="text-sm text-neutral-20">Aplications last week</p>
            </div>
          </div>

          {/* Botón */}
          {(isOwner && profile?.role?.type === 'recruiter') && (
            <button
              onClick={() => navigate('/private-rec/offers')}
              className="bg-secondary-50 text-sm w-full py-3 rounded-lg font-semibold hover:bg-secondary-40 transition cursor-pointer"
            >
              Offers Dashboard
            </button>
          )}
        </div>
    
        {isRecModalOpen && (
          <RecModalEdit
            token={token}
            openModal={isRecModalOpen}
            setOpenModal={setIsRecModalOpen}
            profile={profile}
            onProfileUpdate={updateProfile}
            setProfile={setProfile}
          />
        )}

      </div>  }

    </div>
  )
}
