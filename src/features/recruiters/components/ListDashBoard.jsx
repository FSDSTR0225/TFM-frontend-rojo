import { AvatarImage } from '../../../components/AvatarImage';
import { PiChat, PiEnvelope, PiFileArrowDown, PiMapPinArea, PiReadCvLogo } from "react-icons/pi";

import { useState } from 'react';
import { updateCandidateStatus } from '../../../services/offersServices';
import { TabsDashboard } from './TabsDashboard';
import { ListDashBoardCard } from './ListDashBoardCard';


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
      <TabsDashboard lists={lists} ActiveTab={activeTab} colors={colors} setActiveTab={setActiveTab}/>
      

      {/* Contenido de la pestaña activa */}
      <ListDashBoardCard lists={lists} activeTab={activeTab} setActiveTab={setActiveTab} skillsOffer={skillsOffer} colors={colors} fadedColors={fadedColors} textColors={textColors} changeStatusCandidate={changeStatusCandidate} />
      
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