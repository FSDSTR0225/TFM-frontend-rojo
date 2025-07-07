import { useEffect, useState } from "react";
import { RecDashBoar } from "./RecDashBoar";
import { useParams } from "react-router";
import { PiDotsNine, PiDotsThreeVertical, PiListBullets } from "react-icons/pi";
import { ListDashBoard } from "../components/ListDashBoard";
import { getCandidatesByOfferId, getCoverLetter } from "../../../services/offersServices";
import { useContext } from "react";
import { ChatContext } from "../../../layout/chat/context/ChatContext";

export const DashBoarPage = () => {
  const { offerId } = useParams();
  const [viewList, setViewList] = useState(false);
  const [nameOffer, setNameOffer] = useState('');
  const [skillsOffer, setSkillsOffer] = useState([]);

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

  // 1. Carga candidatos
  useEffect(() => {
    getCandidates();
  }, [offerId]);


  return (
    <>
      <div>
        <h1>{nameOffer}</h1>
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
