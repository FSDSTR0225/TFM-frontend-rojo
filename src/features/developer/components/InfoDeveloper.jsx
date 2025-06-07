import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import RightPanel from "./RightPanel";
import { EditButton } from '../../../components/EditButton';
import { PiGithubLogo, PiLinkedinLogo, PiChatCenteredDots, PiTranslate, PiCodeSimple, PiCodeBlock, PiEnvelope, PiReadCvLogo, PiChatText  } from 'react-icons/pi';
import DevModal  from './devModal';
import { SectionContainer } from "../../../components/SectionContainer";
import { getProjectsByDeveloper } from '../../../services/projectService';
import { AuthContext } from '../../../context/authContext';

function InfoDeveloper({ profileInfo, token, setProfileData, onProfileUpdated }) {
  const { profile: currentUser } = useContext(AuthContext);
  const isCurrentUser = currentUser?._id === profileInfo?._id;

  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const [lastProjects, setLastProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

    const handleOpenModal = () => {
      setIsDevModalOpen(true);
    };

    useEffect(() => {
    if (!profileInfo?._id) {
      setLoadingProjects(false);
      return;
    }

    setLoadingProjects(true);
    getProjectsByDeveloper(profileInfo._id, token)
      .then(res => {
        console.log('ultimos proyectos:', res);
        if (res.error) {
          setLastProjects([]);
        } else {
          const projects = Array.isArray(res.projects) ? res.projects : res;
          const sorted = [...projects].sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
          setLastProjects(sorted.slice(0, 3));
        }
      })
    .catch(() => {
      setLastProjects([]);
    })
    .finally(() => {
      setLoadingProjects(false);
    });
  }, [profileInfo?._id, token]);

  if (!profileInfo) return <p>Error al cargar el profile</p>;

  return (
    <SectionContainer classProps="lg:flex-row flex-col-reverse gap-4 lg:items-start">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* PARTE IZQUIERDA INFO PERSONAL */}
        <div className="flex flex-col items-center bg-neutral-80 border border-neutral-60 p-6 rounded-md h-fit">

          {isCurrentUser && (
            <div className="w-full flex justify-end mb-2">
              <EditButton onClick={handleOpenModal}  />
            </div>
          )}

          <div className="flex flex-col items-center">
            <img
              src={profileInfo.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'}
              className="w-32 h-32 rounded-full border-4 border-primary-60"
              alt="Perfil"
            />
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
                <Link 
                to={"#"}
                onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await navigator.clipboard.writeText(profileInfo.email);
                      alert('Email copiado al portapapeles');
                    } catch {
                      alert('No se pudo copiar el email');
                    }
                }} 
                className="btn btn-circle bg-transparent border-2 border-primary-50 text-primary-50  hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0 "
                aria-label="Linkedin">
                <PiEnvelope className="text-xl" />
                </Link>
                <Link 
                to={profileInfo.role.developer.linkedin} 
                className="btn btn-circle bg-transparent border-2 border-primary-50 text-primary-50  hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0 "
                aria-label="Linkedin">
                <PiLinkedinLogo className="text-xl" />
                </Link>
                <Link 
                to={profileInfo.role.developer.github} 
                className="btn btn-circle bg-transparent border-2 border-primary-50 text-primary-50  hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0 "
                aria-label="GitHub">
                <PiGithubLogo className="text-xl" />
                </Link>
              </div>
          </div>

          {/* CONTACT Y DOWNLOAD CV */}
          <div className="grid grid-cols-1 gap-2 w-full my-4">
            <Link
              to={profileInfo.role.developer.github}
              className="btn w-full bg-neutral-90 hover:bg-neutral-60 border border-neutral-60 rounded-md"
            >
              <PiChatText className="text-xl"/>
              Contact
            </Link>
            <Link
              to={profileInfo.role.developer.github}
              className="btn w-full bg-neutral-90 hover:bg-neutral-60 border border-neutral-60 rounded-md"
            >
              <PiReadCvLogo className="text-xl" />
              Download CV
            </Link>
          </div>

          {/* LAST PROJECTS */}
          <div className="w-full my-2">
            <h2 className="flex font-bold mb-3">
              <PiCodeBlock  className="text-xl mr-2 text-primary-50" />
              Last Projects
            </h2>
            {loadingProjects ? (
              <p>Cargando proyectos...</p>
            ) : lastProjects.length === 0 ? (
              <p>No hay proyectos para mostrar</p>
            ) : (
              <ol className="list-decimal list-inside">
                {lastProjects.map(proj => (
                  <li key={proj._id} className="truncate mb-1">
                    <Link to={`/projects/${proj._id}`} className="hover:underline">
                      {proj.title}
                    </Link>
                  </li>
                ))}
              </ol>

            )}
          </div>

          {/* ABOUT ME */}
          <div className="w-full mt-2">
            <h2 className="flex font-bold mb-3">
              <PiChatCenteredDots className="text-xl mr-2 text-primary-50" />
              About Me
            </h2>
            <span>{profileInfo.description}</span>
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
                <span key={index} className=" bg-primary-70 text-neutral-0 rounded-full px-2 py-0.5 text-sm">
                {skill}
                </span>
                ))}
            </div>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="col-span-1 lg:col-span-2">
          <RightPanel profileInfo={profileInfo} token={token} onProfileUpdated={onProfileUpdated} />
        </div>

        {/* Modal para editar perfil */}
        {isDevModalOpen && (
          <DevModal
            open={isDevModalOpen}
            setOpen={setIsDevModalOpen}
            token={token}
            profileData={{ ...profileInfo }}
            onProfileUpdate={updatedProfile => {
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
