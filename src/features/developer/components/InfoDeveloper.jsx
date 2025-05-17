
import { Link } from 'react-router';
import RightPanel from "./RightPanel";
import { EditButton } from '../../../components/EditButton';
import { PiGithubLogo, PiLinkedinLogo, PiEye } from "react-icons/pi";
import { DevModal } from './devModal';
// import { SectionContainer } from "../../../components/SectionContainer";

function InfoDeveloper({ profileInfo, token, onProfileUpdated }) {
  // Estado para controlar si el modal está visible
  

  const handleOpenModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

    if (!profileInfo) return <p>Error al cargar el profile</p>;

    return (
    <div className="grid grid-cols-3 gap-4 mx-15 p-10">

          {/* <SectionContainer classProps="lg:flex-row flex-col-reverse gap-4 lg:items-start">

          </SectionContainer> */}
        
        {/* PARTE IZQUIERDO INFO PERSONAL */}
        <div className="grid justify-items-center bg-neutral-80 border border-neutral-60  p-6 rounded-md">
            <EditButton 
                onClick={handleOpenModal} 
                classProps={"self-end"} 
            />
            <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            className=" w-40 h-40 mb-4 rounded-full"
            alt="Perfil"
            />
            <h1 className="text-xl font-bold mt-4 mb-2">
            {profileInfo.name} {profileInfo.surname}
            </h1>
            <h3 className="text-xlmb-2">{profileInfo.role.developer.professionalPosition}</h3>
            <span className="mb-2">{profileInfo.role.developer.location}</span>

            {/* MEDIA */}
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
                <Link 
                    to={profileInfo.role.developer.instagram} 
                    className="p-2 m-2 bg-primary-60 hover:bg-primary-70 rounded-full hover:shadow-lg"
                    aria-label="Linkedin">
                    <PiGithubLogo className="text-xl" />
                </Link>
                <Link 
                    to={profileInfo.role.developer.linkedin} 
                    className="p-2 m-2 bg-primary-60 hover:bg-primary-70 rounded-full hover:shadow-lg"
                    aria-label="Linkedin">
                    <PiLinkedinLogo className="text-xl" />
                </Link>
                <Link 
                    to={profileInfo.role.developer.github} 
                    className="p-2 m-2 bg-primary-60 hover:bg-primary-70 rounded-full hover:shadow-lg"
                    aria-label="GitHub">
                    <PiGithubLogo className="text-xl" />
                </Link>
            </div>

            {/* IDIOMA */}
            <h2 className="mt-2 mb-2">Languages</h2>
            
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {profileInfo.role.developer.languages.map((lang, index) => (
                <span key={index} className="bg-primary-60 px-3 py-1 rounded-full text-sm">
                    {lang.language} ({lang.languageLevel})
                </span>
                ))}
            </div>

            {/* SKILLS */}
            <h2 className="mt-4 mb-2">Skills</h2>

            <div className="flex flex-wrap justify-center gap-2 mt-4 mb-4">
                {profileInfo.role.developer.skills.map((skill, index) => (
                <span key={index} className="flex flex-row justify-center w-24 bg-primary-60 p-1 rounded-full text-sm">
                    {skill}
                </span>
                ))}
            </div>
        </div>

        
        <div className="col-span-2">
                {/* ABOUT ME */}
            <div className="about-me bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md">
                <h2 className='text-xl font-bold mb-4'>About Me</h2>
                <span className='mt-4 mb-4'>
                    {profileInfo.description}
                </span>
            </div>
            <div>
            {/* PANEL DERECHO */}        
                <RightPanel profileInfo={profileInfo} />
            </div>
        </div>
        {/* Modal para editar perfil */}
        <dialog id="my_modal_1" className="modal">
          <DevModal 
            token={token} 
            profileData={{
            ...profileInfo
            }}
            onProfileUpdated={onProfileUpdated} 
          />
        </dialog>
        
    </div>
    );
}

export default InfoDeveloper;
