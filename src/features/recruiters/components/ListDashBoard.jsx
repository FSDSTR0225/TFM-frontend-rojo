import { AvatarImage } from '../../../components/AvatarImage';
import { PiMapPinArea } from "react-icons/pi";
import { GoChevronDown } from "react-icons/go";
import { NameUsers } from '../../../components/NameUsers';
import { useState } from 'react';
import { updateCandidateStatus } from '../../../services/offersServices';
import { CandidateSkills } from './candidateSkills';


export const ListDashBoard = ({ classProps, offerId, lists, setLists, getCandidates,skillsOffer }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(lists)[0]);

  const changeStatusCandidate = async (status, idCandidato) => {
    await updateCandidateStatus(offerId, idCandidato, status, localStorage.getItem('token'));
    setActiveTab(status);
    getCandidates(); // Actualiza la lista de candidatos
  }

  const colors = {
    pending: 'bg-blue-500',
    reviewed: 'bg-purple-500',
    interviewed: 'bg-yellow-500',
    accepted: 'bg-green-500',
    rejected: 'bg-red-500',
  };
  const fadedColors = {
    pending: 'bg-blue-500/20',
    reviewed: 'bg-purple-500/20',
    interviewed: 'bg-yellow-500/20',
    accepted: 'bg-green-500/20',
    rejected: 'bg-red-500/20',
  };
  const textColors = {
    pending: 'text-blue-500',
    reviewed: 'text-purple-500',
    interviewed: 'text-yellow-500',
    accepted: 'text-green-500',
    rejected: 'text-red-500',
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border-b-2 border-neutral-50 text-md font-medium mb-4">
        {Object.entries(lists).map(([key]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-2 px-4 capitalize transition-all duration-200 rounded-t-md
          ${activeTab === key
                ? `${colors[key] || 'bg-black'} text-white`
                : 'text-neutral-40'
              }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="space-y-4">
        {lists[activeTab]?.length > 0 ? (
          lists[activeTab].map((candidato) => (
            <div
              key={candidato._id}
              className="bg-neutral-80 p-4 rounded-lg shadow-sm border border-neutral-60 flex items-center justify-between"
            >
              {/* Izquierda: avatar + info */}
              <div className="flex items-center gap-15">
                <div className='flex gap-4 w-70'>
                  <AvatarImage user={candidato?.user} />
                  <div>
                    <NameUsers user={candidato?.user} align='items-start' classProps={'line-clamp-1 text-md'} />
                    <p className="text-xs">
                      {candidato?.user?.email}
                    </p>
                  </div>
                </div>
                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mt-2 text-md">
                  <CandidateSkills skills={candidato?.user?.role?.developer?.skills} skillsOffer={skillsOffer}/>
                </div>
                <div className="flex items-center text-md gap-1">
                  <PiMapPinArea className='size-4' />
                  Madrid
                </div>
              </div>

              {/* Derecha: ubicación + acciones */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={activeTab}
                    onChange={(e) => changeStatusCandidate(e.target.value, candidato._id)}
                    className={`px-3 py-1 pr-7 rounded-md text-md capitalize appearance-none
                    ${activeTab
                        ? `${fadedColors[activeTab] || 'bg-black/20'} ${textColors[activeTab] || 'text-white'}`
                        : 'text-neutral-400'
                      }`}
                  >
                    {Object.entries(lists).map(([key]) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <GoChevronDown />
                  </div>
                </div>

                <button className="bg-neutral-50 text-white px-4 py-1 rounded-md text-md">
                  Contact
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-50">No hay candidatos en "{activeTab}".</p>
        )}
      </div>
    </div>
  );
};