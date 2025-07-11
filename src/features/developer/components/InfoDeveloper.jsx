import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import RightPanel from "./RightPanel";
import { EditButton } from "../../../components/EditButton";
import { AvatarImage } from "../../../components/AvatarImage";
import { PiGithubLogo, PiLinkedinLogo, PiChatCenteredDots, PiTranslate, PiCodeSimple, PiCodeBlock, PiEnvelope, PiReadCvLogo,PiChatText,
} from "react-icons/pi";
import DevModal from "./devModal";
import { ChatContext } from '../../../layout/chat/context/ChatContext';
import { SectionContainer } from "../../../components/SectionContainer";
import { getProjectsByDeveloper } from "../../../services/projectService";
import { AuthContext } from "../../../context/authContext";

function InfoDeveloper({
  profileInfo,
  token,
  setProfileData,
  onProfileUpdated,
}) {
  const {openChat} = useContext(ChatContext);
  const { profile: currentUser, setProfile } = useContext(AuthContext);
  const isCurrentUser = currentUser?._id === profileInfo?._id;

  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const [mostViewedProjects, setMostViewedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const handleOpenModal = () => {
    setIsDevModalOpen(true);
  };

  // Función para descargar el PDF
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

  useEffect(() => {
    if (!profileInfo?._id) {
      setLoadingProjects(false);
      return;
    }

    setLoadingProjects(true);
    getProjectsByDeveloper(profileInfo._id, token)
      .then((res) => {
        const projects = res.error
          ? []
          : Array.isArray(res.projects)
          ? res.projects
          : res;

        // Ordena por vistas descendentes
        const sortedByViews = [...projects].sort(
          (a, b) => (Number(b.views) || 0) - (Number(a.views) || 0)
        );

        setMostViewedProjects(sortedByViews.slice(0, 3));
      })
      .catch(() => {
        setMostViewedProjects([]);
      })
      .finally(() => {
        setLoadingProjects(false);
      });
  }, [profileInfo?._id, token]);

  if (!profileInfo) return <p>Error al cargar el profile</p>;

  // Verificar si hay LinkedIn y GitHub
  const hasLinkedIn = profileInfo.role.developer.linkedin && profileInfo.role.developer.linkedin.trim() !== '';
  const hasGitHub = profileInfo.role.developer.github && profileInfo.role.developer.github.trim() !== '';
  const hasResume = profileInfo.role.developer.resume && profileInfo.role.developer.resume.trim() !== '';

  return (
    <SectionContainer classProps="lg:flex-row flex-col-reverse gap-4 lg:items-start">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* PARTE IZQUIERDA INFO PERSONAL */}
        <div className="flex flex-col items-center bg-neutral-80 border border-neutral-60 p-6 rounded-md h-fit mb-6 lg:mb-0">
          {isCurrentUser && (
            <div className="w-full flex justify-end mb-2">
              <EditButton onClick={handleOpenModal} />
            </div>
          )}

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center rounded-full w-32 h-32 text-8xl">
              <AvatarImage user={profileInfo} width={32} />
            </div>
            <h1 className="text-xl font-bold mt-4 text-center">
              {profileInfo.name} {profileInfo.surname}
            </h1>
            <h3 className="text-lg mb-2 text-center">
              {profileInfo.role.developer.professionalPosition}
            </h3>
            <span className="text-center">
              {profileInfo.role.developer.location}
            </span>
          </div>

          {/* MEDIA */}
          <div className="flex justify-center w-full">
            <div className="flex justify-center gap-2 my-4 w-full">
              {/* EMAIL */}
              <Link
                to={`mailto:${profileInfo.email}`}
                onClick={async (e) => {
                  e.preventDefault(); // evita la recarga o navegación inmediata
                  const mailtoLink = `mailto:${profileInfo.email}`;
                  try {
                    await navigator.clipboard.writeText(profileInfo.email);
                    // abre el cliente de correo en una pestaña nueva
                    window.location.href = mailtoLink;
                  } catch {
                    alert("No se pudo copiar el email");
                    // aunque falle el copiado, permite al usuario abrir el mail
                    window.location.href = mailtoLink;
                  }
                }}
                className="btn btn-circle bg-transparent border-2 border-primary-50 text-primary-50 hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0"
                aria-label="Enviar correo"
              >
                <PiEnvelope className="text-xl" />
              </Link>
              
              {/* LINKEDIN */}
              {hasLinkedIn ? (
                <Link
                  to={profileInfo.role.developer.linkedin}
                  className="btn btn-circle bg-transparent border-2 border-primary-50 text-primary-50 hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0"
                  aria-label="Linkedin"
                >
                  <PiLinkedinLogo className="text-xl" />
                </Link>
              ) : (
                <button
                  onClick={isCurrentUser ? handleOpenModal : undefined}
                  disabled={!isCurrentUser}
                  className="btn btn-circle bg-transparent border-2 border-neutral-40 text-neutral-40 cursor-not-allowed disabled:cursor-not-allowed"
                  aria-label="Linkedin"
                >
                  <PiLinkedinLogo className="text-xl" />
                </button>
              )}
              
              {/* GITHUB */}
              {hasGitHub ? (
                <Link
                  to={profileInfo.role.developer.github}
                  className="btn btn-circle bg-transparent border-2 border-primary-50 text-primary-50 hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0"
                  aria-label="GitHub"
                >
                  <PiGithubLogo className="text-xl" />
                </Link>
              ) : (
                <button
                  onClick={isCurrentUser ? handleOpenModal : undefined}
                  disabled={!isCurrentUser}
                  className="btn btn-circle bg-transparent border-2 border-neutral-40 text-neutral-40 cursor-not-allowed disabled:cursor-not-allowed"
                  aria-label="GitHub"
                >
                  <PiGithubLogo className="text-xl" />
                </button>
              )}
            </div>
          </div>

          {/* CONTACT Y DOWNLOAD CV */}
          <div className="grid grid-cols-1 gap-2 w-full my-4">
            {!isCurrentUser && (
              <Link
                onClick={() => openChat(profileInfo)}
                className="btn w-full bg-neutral-90 hover:bg-neutral-60 border border-neutral-60 rounded-md"
              >
                <PiChatText className="text-xl" />
                Contact
              </Link>
            )}

            {/* CV BUTTON */}
            {(hasResume || isCurrentUser) && (
              <button
                onClick={hasResume ? () =>
                  handleDownloadCV(
                    profileInfo.role.developer.resume,
                    `${profileInfo.name}_${profileInfo.surname}_CV.pdf`
                  ) : (isCurrentUser ? handleOpenModal : undefined)
                }
                disabled={!hasResume && !isCurrentUser}
                className={`btn w-full border rounded-md ${
                  hasResume 
                    ? "bg-neutral-90 hover:bg-neutral-60 border-neutral-60" 
                    : "bg-neutral-70 border-neutral-50 text-neutral-40 cursor-not-allowed"
                }`}
              >
                <PiReadCvLogo className="text-xl" />
                {hasResume ? "Download CV" : (isCurrentUser ? "Add your CV!" : "No CV available")}
              </button>
            )}
          </div>

          {/* MOST VIEWED PROJECTS */}
          <div className="w-full my-2">
            <h2 className="flex font-bold mb-3">
              <PiCodeBlock className="text-xl mr-2 text-primary-50" />
              Most Viewed Projects
            </h2>
            {loadingProjects ? (
              <p>Loading projects...</p>
            ) : mostViewedProjects.length === 0 ? (
              <p>There are no projects to show</p>
            ) : (
              <ol className="list-decimal list-inside">
                {mostViewedProjects.map((proj) => (
                  <li
                    key={proj._id}
                    className="truncate mb-1 flex justify-between items-center gap-2"
                  >
                    <Link
                      to={`/projects/${proj._id}`}
                      className="hover:underline truncate mr-2"
                    >
                      {proj.title}
                    </Link>
                    <span className="text-sm text-neutral-400">
                      {Math.floor((proj.views || 0) / 2)} views
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* LANGUAGES */}
          <div className="w-full mt-4">
            <h2 className="flex font-bold mb-3">
              <PiTranslate className="text-xl mr-2 text-primary-50" />
              Languages
            </h2>
            <div className="flex flex-col gap-2">
              {profileInfo.role.developer.languages.map((lang, index) => (
                <span key={index} className="block">
                  {lang.language} ({lang.languageLevel})
                </span>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div className="w-full mt-6">
            <h2 className="flex font-bold mb-3">
              <PiCodeSimple className="text-xl mr-2 text-primary-50" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileInfo.role.developer.skills.map((skill, index) => (
                <span
                  key={index}
                  className=" bg-primary-70 text-neutral-0 rounded-full px-2 py-0.5 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ABOUT ME */}
          <div className="w-full mt-6">
            <h2 className="flex font-bold mb-3">
              <PiChatCenteredDots className="text-xl mr-2 text-primary-50" />
              About Me
            </h2>
            <span>{profileInfo.description}</span>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="col-span-1 lg:col-span-2">
          <RightPanel
            profileInfo={profileInfo}
            token={token}
            onProfileUpdated={onProfileUpdated}
          />
        </div>

        {/* Modal para editar perfil */}
        {isDevModalOpen && (
          <DevModal
            open={isDevModalOpen}
            setOpen={setIsDevModalOpen}
            token={token}
            profileData={{ ...profileInfo }}
            onProfileUpdate={(updatedProfile) => {
              setProfile(updatedProfile);
              setProfileData(updatedProfile);
              onProfileUpdated?.(updatedProfile);
            }}
          />
        )}
      </div>
    </SectionContainer>
  );
}

export default InfoDeveloper;