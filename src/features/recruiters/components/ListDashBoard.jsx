import { getDaysSince } from '../../../utils/utils';
import { AvatarImage } from '../../../components/AvatarImage';
import { PiMapPinArea } from "react-icons/pi";
import { NameUsers } from '../../../components/NameUsers';
import { useState } from 'react';
export const ListDashBoard = ({ classProps, offerId, lists, setLists }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(lists)[0]);
  const colors = {
    pending: 'bg-blue-500',
    reviewed: 'bg-purple-500',
    interviewed: 'bg-yellow-500',
    accepted: 'bg-green-500',
    rejected: 'bg-red-500',
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
                  <AvatarImage user={candidato.user} />
                  <div>
                    <NameUsers user={candidato.user} align='items-start' classProps={'line-clamp-1 text-md'} />
                    <p className="text-xs">
                      {candidato.user.email}
                    </p>
                  </div>
                </div>
                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mt-2 text-md">
                  {["React", "Javascript", "Vue", "Angular"].map((tech) => (
                    <span
                      key={tech}
                      className="border px-2 py-0.5 rounded-full border-neutral-40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-md gap-1">
                  <PiMapPinArea className='size-4' />
                  Madrid
                </div>
              </div>

              {/* Derecha: ubicación + acciones */}
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1 rounded-md text-md capitalize
                ${activeTab
                  ? `${colors[activeTab] || 'bg-black'} text-white`
                  : 'text-neutral-400'
                  }`}>
                  {activeTab}
                </span>
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