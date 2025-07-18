import { useEffect, useState } from "react";
import { RecDashBoar } from "./RecDashBoar";
import { Link, useParams } from "react-router";
import { PiDotsNine, PiDotsThreeVertical, PiListBullets } from "react-icons/pi";
import { ListDashBoard } from "../components/ListDashBoard";
import { getCandidatesByOfferId, getCoverLetter, getOffersById, updateCandidateStatus } from "../../../services/offersServices";
import { useContext } from "react";
import { ChatContext } from "../../../layout/chat/context/ChatContext";
import { DashBoardUserModal } from "../components/DashBoardUserModal";


export const DashBoarPage = () => {
  const { offerId } = useParams();
  const [viewList, setViewList] = useState(false);
  const [skillsOffer, setSkillsOffer] = useState([]);
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenApplicantsModal, setIsOpenApplicantsModal] = useState(false);
  const [candidate, setCandidate] = useState();


const handleDownloadCoverLetter = async (offerId, userId) => {
    try {
     await getCoverLetter(offerId, userId);
    } catch (error) {
      new Error("Error downloading PDF"); throw error;
    }
  }
  
  const handleDownloadCV = async (resumeUrl, fileName = 'CV.pdf') => {
  try {
    const response = await fetch(resumeUrl);
    const blob = await response.blob();
    
    // Crear un enlace temporal para la descarga
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar el CV:', error);
    // Fallback: abrir en nueva pestaña
    window.open(resumeUrl, '_blank');
  }
};

    const {openChat} = useContext(ChatContext);


  //objeto con cinco arrays, uno por cada columna del Kanban.
  const [lists, setLists] = useState({
    pending: [],
    reviewed: [],
    interviewed: [],
    accepted: [],
    rejected: [],
  });
  const [activeTab, setActiveTab] = useState(Object.keys(lists)[0]);

  const getCandidates = async()=>{
    const data = await getCandidatesByOfferId(offerId, localStorage.getItem('token'));
    setSkillsOffer(data.skills);
    const candidates = data.applicants;
   
    //Crea grouped, un objeto vacío con las cinco claves.
    const grouped = { pending: [], reviewed: [], interviewed: [], accepted: [], rejected: [] };
    //Recorre cada candidato (data.forEach) y, según su status, lo añade al array correspondiente.
    candidates.forEach(c => grouped[c.status]?.push(c));
    //Llama a setLists(grouped), que actualiza el estado con los candidatos ya clasificados.
    setLists(grouped);
  } 
  useEffect(() => {
  getCandidates(); // Aquí llamas a getCandidates
}, [offerId]);

    const changeStatusCandidate = async (status, idCandidato) => {
      await updateCandidateStatus(offerId, idCandidato, status, localStorage.getItem('token'));
      setActiveTab(status);
      getCandidates(); // Actualiza la lista de candidatos
    }

  const fetchOfferByid = async () => {
    try {
      const offer = await getOffersById(offerId);
      setOffer(offer);
    } catch (error) {
      setError(error);
      console.error('Error fetching offer:', error);
    }finally{
      setIsLoading(false);
    }
  };
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

  const handleOpenApplicantsModal = (candidate) => {
    setCandidate(candidate);
    setIsOpenApplicantsModal(true);
  };

  const handleCloseApplicantsModal = () => {
    setIsOpenApplicantsModal(false);
  };

  // 1. Carga candidatos
  useEffect(() => {
    getCandidates(
    fetchOfferByid()
    );
  }, [offerId]);

  if (isLoading) {
    return (<>

  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
  
    </>
  )}

  return (
    <>
      <div className="flex flex-col gap-4 mb-4 items-center sm:items-stretch">
        <h1 className="text-2xl font-bold">{offer?.position}</h1>
        <div className="flex flex-col md:flex-row justify-between  gap-2">
        <div className="flex flex-col gap-2 md:max-w-md border border-neutral-70 p-4 self-start">

        <p className="text-neutral-10 text-sm line-clamp-4">{offer?.description}</p>
        <Link to={`/offers/${offerId}`} className="text-secondary-60 hover:underline text-sm self-end">View complete description</Link>
        </div>
        <aside className={`flex flex-wrap gap-2 items-center justify-center`}>
          <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col items-center min-w-30">
            <div className="card-body p-4">
              <h3 className="text-md font-bold ">New Applicants</h3>
              <p className="text-xs text-neutral-20">Pending</p>
              <p className="text-xl">{lists?.pending?.length}</p>
              
            </div>
          </div>
          <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col items-center min-w-35">
            <div className="card-body p-4">
              <h3 className="text-md font-bold ">Reviewed</h3>
              <p className="text-xs text-neutral-20">Pending</p>
              <p className="text-xl">{lists?.reviewed?.length}</p>
              
            </div>
          </div>
          <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col items-center min-w-35">
            <div className="card-body p-4">
              <h3 className="text-md font-bold ">Interviewed</h3>
              <p className="text-xs text-neutral-20">Pending</p>
              <p className="text-xl">{lists?.interviewed?.length}</p>
             
            </div>
          </div>
          <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col items-center min-w-35">
            <div className="card-body p-4">
              <h3 className="text-md font-bold ">Accepted</h3>
              <p className="text-xs text-neutral-20">Pending</p>
              <p className="text-xl">{lists?.accepted?.length}</p>
              
            </div>
          </div>
          <div className="card bg-neutral-80 shadow-xl border border-neutral-70 flex-col items-center min-w-35">
            <div className="card-body p-4">
              <h3 className="text-md font-bold ">Rejected</h3>
              <p className="text-xs text-neutral-20">Pending</p>
              <p className="text-xl">{lists?.rejected?.length}</p>
              
            </div>
          </div>
        </aside>
        </div>
      </div>
      {/* Botón solo visible en lg y superiores */}
      <button
        className="btn font-bold text-2xl btn-square self-end hidden lg:inline-flex"
        onClick={() => setViewList(!viewList)}
      >
        {viewList ? <PiDotsNine /> : <PiListBullets />}
      </button>

      {/* En pantallas lg y superiores: muestra según el estado del botón */}
      {/* En pantallas menores a lg: siempre muestra ListDashBoard */}
      <div className="lg:hidden">
        <ListDashBoard offerId={offerId}
          openChat={openChat}
          handleDownloadCoverLetter={handleDownloadCoverLetter}
          handleDownloadCV={handleDownloadCV}
          skillsOffer={skillsOffer}
          lists={lists}
          setLists={setLists}
          getCandidates={getCandidates} />
      </div>

      <div className="hidden lg:block">
        {viewList ? <ListDashBoard offerId={offerId}
          openChat={openChat}
          handleDownloadCoverLetter={handleDownloadCoverLetter}
          handleDownloadCV={handleDownloadCV}
          skillsOffer={skillsOffer}
          lists={lists}
          setLists={setLists}
          getCandidates={getCandidates} /> : <RecDashBoar offerId={offerId}
            setIsOpenApplicantsModal={handleOpenApplicantsModal}
            
            lists={lists}
            setLists={setLists} />}
      </div>
      {isOpenApplicantsModal && <DashBoardUserModal offerId={offerId}
       key={candidate._id}
      candidate={candidate}
      handleCloseApplicantsModal={handleCloseApplicantsModal}
       openChat={openChat}
        handleDownloadCoverLetter={handleDownloadCoverLetter}
        handleDownloadCV={handleDownloadCV}
        skillsOffer={skillsOffer}
        getCandidates={getCandidates}
        setIsOpenApplicantsModal={setIsOpenApplicantsModal}
        colors={colors}
        fadedColors={fadedColors}
        textColors={textColors}
        changeStatusCandidate={changeStatusCandidate}
        />}
    </>
  )
}
