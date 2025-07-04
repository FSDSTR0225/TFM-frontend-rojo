import { useState } from 'react';
import { updateCandidateStatus } from '../../../services/offersServices';
import { TabsDashboard } from './TabsDashboard';
import { ListDashBoardCard } from './ListDashBoardCard';


export const ListDashBoard = ({ classProps, offerId, lists, setLists, getCandidates,skillsOffer, openChat, handlerDownloadCV, handlerDownloadCoverLetter }) => {
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
      <ListDashBoardCard lists={lists} activeTab={activeTab} 
      handlerDownloadCV={handlerDownloadCV} handlerDownloadCoverLetter={handlerDownloadCoverLetter} openChat={openChat}
      setActiveTab={setActiveTab} skillsOffer={skillsOffer} colors={colors} fadedColors={fadedColors} textColors={textColors} changeStatusCandidate={changeStatusCandidate} offerId={offerId} />
      
                              </div>

                                    );
};
