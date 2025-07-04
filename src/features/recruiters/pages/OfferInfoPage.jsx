import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { SectionContainer } from "../../../components/SectionContainer";
import { OfferInfo } from "../components/OfferInfo";
import {
  getCandidatesByOfferId,
  getCoverLetter,
  getOffersById,
  updateCandidateStatus,
} from "../../../services/offersServices";
import { RecContactCard } from "../components/RecContactCard";
import { OfferModal } from "../components/OfferModal";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { ApplyModal } from "../components/ApplyModal";
import { AvatarImage } from "../../../components/AvatarImage";
import { NameUsers } from "../../../components/NameUsers";
import { CandidateSkills } from "../components/candidateSkills";
import { PiChat, PiEnvelope, PiFileArrowDown, PiMapPinArea, PiReadCvLogo } from "react-icons/pi";
import { GoChevronDown } from "react-icons/go";
import { ChatContext } from "../../../layout/chat/context/ChatContext";
import { capitalize } from "../../../utils/utils";

export const OfferInfoPage = () => {
  const [offer, setOffer] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenApplyModal, setIsOpenApplyModal] = useState(false);
  const { profile, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { openChat } = useContext(ChatContext);

  const [activeTab, setActiveTab] = useState("");
  const [skillsOffer, setSkillsOffer] = useState([]);
  const [lists, setLists] = useState([]);

  const { id } = useParams();

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

  const changeStatusCandidate = async (status, idCandidato) => {
    await updateCandidateStatus(id, idCandidato, status, localStorage.getItem("token"));
    setActiveTab(status);
    getCandidates(); // Actualiza la lista de candidatos
  };

  const isOwnerRecruiter = offer?.owner?._id === profile?._id && profile?.role.type === "recruiter";

  const hasApplied =
    Array.isArray(offer?.applicants) &&
    profile?._id &&
    offer?.applicants?.some((applicant) => applicant?.user === profile._id);

  const getCandidates = async () => {
    const data = await getCandidatesByOfferId(id, localStorage.getItem("token"));
    setSkillsOffer(data.skills);
    const candidates = data.applicants;
    console.log("candidatos", candidates);
    //Crea grouped, un objeto vacío con las cinco claves.
    setLists(candidates);
  };

  const fetchOffer = async () => {
    try {
      const offerData = await getOffersById(id);
      setOffer(offerData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(lists[1]);
    getCandidates();
    fetchOffer();
  }, [id]);

  const handleApplyModal = (e) => {
    e.stopPropagation();
    if (!token) {
      console.log("por aqui no pasaras");
      navigate("/login", { state: { from: location.pathname } });
    }

    setIsOpenApplyModal(true);
  };

  const colors = {
    pending: "bg-blue-500",
    reviewed: "bg-purple-500",
    interviewed: "bg-yellow-500",
    accepted: "bg-green-500",
    rejected: "bg-red-500",
  };

  const fadedColors = {
    pending: "bg-blue-500/20",
    reviewed: "bg-purple-500/20",
    interviewed: "bg-yellow-500/20",
    accepted: "bg-green-500/20",
    rejected: "bg-red-500/20",
  };
  const textColors = {
    pending: "text-blue-500",
    reviewed: "text-purple-500",
    interviewed: "text-yellow-500",
    accepted: "text-green-500",
    rejected: "text-red-500",
  };

  if (isLoading) {
    return (
      <SectionContainer classProps='lg:flex-row flex-col-reverse gap-4 lg:items-start'>
        <div className='w-full p-4 space-y-6'>
          <div className='h-8 bg-base-200 rounded-lg skeleton'></div>
          <div className='h-4 bg-base-200 rounded-lg skeleton w-3/4'></div>
          <div className='h-4 bg-base-200 rounded-lg skeleton w-2/3'></div>
        </div>
        <div className='w-full p-4 space-y-4 border rounded-lg'>
          <div className='h-6 bg-base-200 rounded-full skeleton w-1/2'></div>
          <div className='h-4 bg-base-200 rounded-lg skeleton w-4/6'></div>
          <div className='h-4 bg-base-200 rounded-lg skeleton w-5/6'></div>
        </div>
      </SectionContainer>
    );
  }
  if (error) return <p>Error al cargar las ofertas: {error}</p>;
  return (
    <SectionContainer classProps={"lg:flex-row flex-col-reverse gap-4 lg:items-start"}>
      <OfferInfo
        offer={offer}
        isOpen={isOpenModalEdit}
        setIsOpen={setIsOpenModalEdit}
        token={token}
        handleApply={handleApplyModal}
        hasApplied={hasApplied}
      />
      {isOwnerRecruiter && (
        <aside className='lg:w-1/1 lg:overflow-auto'>
          <div className='flex flex-col gap-4'>
            {lists?.length > 0 ? (
              lists.map((candidato) => {
                const name = capitalize(candidato?.user?.name || '');
                          const surname = capitalize(candidato?.user?.surname || '');
                          const completeName = `${name} ${surname}`.trim() || 'Unknown Profile';
                          const isResume = candidato?.user?.role?.developer?.resume;
                return (
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
                  {/* Derecha: ubicación + acciones */}
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
                          <div className="flex flex-col md:flex-row lg:flex-col intems-center  gap-1 gap-x-2">
                          <div className="flex gap-2">

                      <button 
                                                onClick={() =>
                  handleDownloadCV(
                    candidato.user.role.developer.resume,
                    `${completeName}_CV.pdf`
                  )
                }
                                                className={`btn btn-md  bg-neutral-90 hover:bg-neutral-60 ${!isResume && 'btn-disabled'} `}
                                              >
                                                <PiReadCvLogo size={20} />
                                              </button>
                      <button
                        onClick={() => handleDownloadCoverLetter(offer._id, candidato._id)}
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
              )})
            ) : (
              <p className='text-neutral-50'>No hay candidatos en "{activeTab}".</p>
            )}
            
          </div>
       
        </aside>
      )}
      {!isOwnerRecruiter && <RecContactCard owner={offer?.owner} />}

      {isOpenModalEdit && (
        <OfferModal
          idOffer={id}
          isOpen={isOpenModalEdit}
          setIsOpen={setIsOpenModalEdit}
          token={token}
          reloadPage={fetchOffer}
        />
      )}
      {isOpenApplyModal && (
        <ApplyModal
          idOffer={id}
          isOpen={isOpenApplyModal}
          setIsOpen={setIsOpenApplyModal}
          token={token}
          handleApply={handleApplyModal}
        />
      )}
    </SectionContainer>
  );
};
