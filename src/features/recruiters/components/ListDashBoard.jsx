import { AvatarImage } from '../../../components/AvatarImage';
import { PiChat, PiEnvelope, PiFileArrowDown, PiMapPinArea, PiReadCvLogo } from "react-icons/pi";
import { GoChevronDown } from "react-icons/go";
import { NameUsers } from '../../../components/NameUsers';
import { useState } from 'react';
import { updateCandidateStatus } from '../../../services/offersServices';
import { CandidateSkills } from './candidateSkills';
import { ChatContext } from '../../../layout/chat/context/ChatContext';
import { useContext } from 'react';


export const ListDashBoard = ({ classProps, offerId, lists, setLists, getCandidates,skillsOffer }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(lists)[0]);
  const {openChat} = useContext(ChatContext);

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
      <div className="flex flex-wrap border-b-2 border-neutral-50 sm:text-md font-medium mb-4  gap-1 justify-center">
        {Object.entries(lists).map(([key]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={` py-2 px-2  sm:px-4 capitalize transition-all text-sm sm:text-md duration-200 rounded-t-md
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
      <div className="flex flex-col gap-4">
        <div className='flex flex-col gap-4'>
            {lists[activeTab]?.length > 0 ? (
              lists[activeTab].map((candidato) => (
    <div key={candidato._id} className="bg-neutral-80 p-4 gap-2 rounded-lg shadow-sm border border-neutral-60 flex flex-col">
                <div
                  
                  className='flex items-center justify-between '
                >
                  {/* Izquierda: avatar + info */}
                  <div className='flex flex-col items-center gap-2 '>
                    <div className='flex flex-col items-center gap-2 '>
                      <div className='flex gap-2 self-start '>
                        <div>
                        <AvatarImage user={candidato?.user} width={10} />
                        </div>
                          <div>
                        <NameUsers
                          user={candidato?.user}
                          align='items-start'
                          classProps={"line-clamp-1 text-sm"}
                        >
                          {candidato?.user?.role?.developer?.location && (
                            <>
                            <p>
                              {candidato?.user?.role?.developer?.professionalPosition}
                            </p>
                            <p className='flex items-center gap-1 text-mds text-neutral-20'>
                              <PiMapPinArea className='size-4' />
                              {candidato?.user?.role?.developer?.location}
                            </p>
                            
                            </>
                          )}
                        </NameUsers>
                        </div>
                      </div>
                      {/* <p className=' self-start flex items-center gap-1 text-xs'>
                        <PiEnvelope />
                        {candidato?.user?.email}
                      </p> */}
                    </div>
                    {/* Tecnologías */}
                  </div>
                          <div className="hidden min-w-20 sm:flex flex-wrap gap-2 mt-2 text-xs">
                     <CandidateSkills skills={candidato?.user?.role?.developer?.skills} skillsOffer={skillsOffer}/>
                   </div>

                        <div className='flex items-center gap-4'>
                                            <div className='relative flex flex-col gap-2'>
                                              <select
                                                value={candidato.status}
                                                onChange={(e) => changeStatusCandidate(e.target.value, candidato._id)}
                                                className={`px-3 py-1 pr-7 rounded-md text-xs md:text-sm capitalize appearance-none
                                                ${fadedColors[candidato.status] || "bg-black/20"} ${
                                                  textColors[candidato.status] || "text-white"
                                                }`}
                                              >
                                                {Object.keys(colors).map((status) => (
                                                  <option
                                                    key={status}
                                                    value={status}
                                                  >
                                                    {status}
                                                  </option>
                                                ))}
                                              </select>
                                              <div className='pointer-events-none absolute right-2 top-1/8 md:top-1/5 lg:top-1/8 transform -translate-y-1/2'>
                                                <GoChevronDown />
                                              </div>
                                                  <div className="flex flex-col md:flex-row  intems-center  gap-1 gap-x-2">
                                                  <div className="flex gap-2">
                        
                                              <button
                                                onClick={() => openChat(candidato.user)}
                                                className='btn btn-md bg-neutral-90 hover:bg-neutral-60'
                                              >
                                                <PiReadCvLogo size={20} />
                                              </button>
                                              <button
                                                onClick={() => openChat(candidato.user)}
                                                className='btn btn-md bg-neutral-90 hover:bg-neutral-60'
                                              >
                                                <PiFileArrowDown size={20} />
                                              </button>
                                                  </div>
                                                  <div className="flex gap-2">
                        
                                                <a className="btn btn-md bg-neutral-90 hover:bg-neutral-60" href={candidato?.user?.email}><PiEnvelope size={20} /></a>
                                              <button
                                                onClick={() => openChat(candidato.user)}
                                                className='btn btn-md bg-linear-135 from-[#37C848] from-10%  to-[#0077ff80] to-90% '
                                              >
                                                <PiChat size={20} />
                                              </button>
                                                  </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                                   <div className="flex flex-wrap sm:hidden gap-2 mt-2 text-xs">
                                             <CandidateSkills skills={candidato?.user?.role?.developer?.skills} skillsOffer={skillsOffer}/>
                                           </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className='text-neutral-50'>No hay candidatos en "{activeTab}".</p>
                                    )}
                                    
                                  </div>
                                </div>
                              </div>

                                    );
};
//                Derecha: ubicación + acciones 
//               <div className="flex items-center gap-4">
//                 <div className="relative">
//                   <select
//                     value={activeTab}
//                     onChange={(e) => changeStatusCandidate(e.target.value, candidato._id)}
//                     className={`px-3 py-1 pr-7 rounded-md text-md capitalize appearance-none
//                     ${activeTab
//                         ? `${fadedColors[activeTab] || 'bg-black/20'} ${textColors[activeTab] || 'text-white'}`
//                         : 'text-neutral-400'
//                       }`}
//                   >
//                     {Object.entries(lists).map(([key]) => (
//                       <option  key={key} value={key}>
//                         {key}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
//                     <GoChevronDown />
//                   </div>
//                 </div>

//                 <button className="bg-neutral-50 text-white px-4 py-1 rounded-md text-md">
//                   Contact
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-neutral-50">No hay candidatos en "{activeTab}".</p>
//         )}
//       </div>
//     </div> 
//   );
// };