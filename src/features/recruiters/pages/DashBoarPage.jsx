import { useEffect, useState } from "react";
import { RecDashBoar } from "./RecDashBoar";
import { useParams } from "react-router";
import { PiDotsNine, PiDotsThreeVertical, PiListBullets } from "react-icons/pi";
import { ListDashBoard } from "../components/ListDashBoard";
import { getCandidatesByOfferId, getCoverLetter, getOffersById } from "../../../services/offersServices";
import { useContext } from "react";
import { ChatContext } from "../../../layout/chat/context/ChatContext";


export const DashBoarPage = () => {
  const { offerId } = useParams();
  const [viewList, setViewList] = useState(false);
  const [nameOffer, setNameOffer] = useState('');
  const [skillsOffer, setSkillsOffer] = useState([]);
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


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

  const getCandidates = async()=>{
    const data = await getCandidatesByOfferId(offerId, localStorage.getItem('token'));
    setNameOffer(data.nameOffer);
    setSkillsOffer(data.skills);
    const candidates = data.applicants;
    console.log('candidatos',candidates);
    //Crea grouped, un objeto vacío con las cinco claves.
    const grouped = { pending: [], reviewed: [], interviewed: [], accepted: [], rejected: [] };
    //Recorre cada candidato (data.forEach) y, según su status, lo añade al array correspondiente.
    candidates.forEach(c => grouped[c.status]?.push(c));
    //Llama a setLists(grouped), que actualiza el estado con los candidatos ya clasificados.
    console.log(grouped);
    setLists(grouped);
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
        <div className="md:max-w-md border border-neutral-70 p-4">

        <p className="text-neutral-10 text-sm line-clamp-5">{offer?.description}</p>
        </div>
        <asside className={`flex flex-wrap gap-2 items-center justify-center`}>
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
        </asside>
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
            lists={lists}
            setLists={setLists} />}
      </div>
    </>
  )
}
