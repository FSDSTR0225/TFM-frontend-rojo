import React, { useState } from 'react';
import { Link } from 'react-router';
import OwnProjectCard from './OwnProjectCard';
import { StudyCard } from './StudyCard';
import ExperienceCard from './ExperienceCard';

function InfoDeveloper({ profileInfo }) {
  const [activeTab, setActiveTab] = useState('experiences');

  if (!profileInfo) return <p>Error al cargar el profile</p>;
  console.log("activeTab:", activeTab);

    return (
    <div className="grid grid-cols-3 gap-4 mx-15 p-10">
        
        {/* PARTE IZQUIERDO INFO PERSONAL */}
        <div className="grid justify-items-center bg-sky-950  p-6 rounded-md">
            <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            className=" w-40 h-40 mb-4 rounded-full"
            alt="Perfil"
            />
            <h1 className="text-xl font-bold text-white mt-4 mb-2">
            {profileInfo.name} {profileInfo.surname}
            </h1>
            <h3 className="text-xl text-white mb-2">{profileInfo.roles.developer.professionalPosition}</h3>
            <span className="mb-2">{profileInfo.roles.developer.location}</span>

            {/* MEDIA */}
            <div className="mt-4">
                <button className=" bg-sky-500/70 rounded-full">
                    <Link to={`${profileInfo.roles.developer.github}`}>
                        <img
                            src="https://pixsector.com/cache/dc0ee776/avd5c445f01ca4712be88.png"
                            className="w-8 h-8 rounded-full"
                            alt="Perfil"
                        />
                    </Link>
                </button>
                <button className=" bg-sky-500/70  mx-4 rounded-full">
                    <Link to={`${profileInfo.roles.developer.linkedin}`}>
                        <img
                            src="https://pixsector.com/cache/dc0ee776/avd5c445f01ca4712be88.png"
                            className="w-8 h-8 rounded-full"
                            alt="Perfil"
                        />
                    </Link>
                </button>
                <button className=" bg-sky-500/70 rounded-full">
                    <Link to={`${profileInfo.roles.developer.github}`}>
                        <img
                            src="https://pixsector.com/cache/dc0ee776/avd5c445f01ca4712be88.png"
                            className="w-8 h-8 rounded-full"
                            alt="Perfil"
                        />
                    </Link>
                </button>
            </div>

            {/* IDIOMA */}
            <h2 className="mt-4 mb-2">Languages</h2>
            
            <div className="flex flex-wrap gap-2 mt-4 mb-4">
                {profileInfo.roles.developer.languages.map((lang, index) => (
                <span key={index} className="bg-sky-700 text-white px-3 py-1 rounded-full text-sm">
                    {lang.language} ({lang.languageLevel})
                </span>
                ))}
            </div>

            {/* SKILLS */}
            <h2 className="mt-4 mb-2">Skills</h2>

            <div className="flex flex-wrap gap-2 mt-4 mb-4">
                {profileInfo.roles.developer.skills.map((skill, index) => (
                <span key={index} className="bg-sky-700 text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                </span>
                ))}
            </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="col-span-2 pl-3 ">
            {/* ABOUT ME */}
            <div className="about-me bg-sky-900 p-8 mb-4 rounded-md">
                <h2 className='text-xl font-bold text-white mt-4 mb-4'>About Me</h2>
                <span className='mt-4 mb-4'>
                    {profileInfo.roles.developer.aboutme}
                </span>
            </div>

            {/* TABS (Experiences, Projects, Studies) */}
            <div className="bg-sky-950 rounded-t-lg p-2 mb-4 rounded-md">
            <div className="tabs tabs-lifted">
                <button
                className={`tab ${activeTab === 'experiences' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('experiences')}
                >
                Experiences
                </button>
                <button
                className={`tab ${activeTab === 'projects' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('projects')}
                >
                Projects
                </button>
                <button
                className={`tab ${activeTab === 'studies' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('studies')}
                >
                Studies
                </button>
            </div>
            </div>

            {/* CONTENIDO DE LAS TABS */}
            <div className="tab-content">
            {activeTab === 'experiences' && (
                <div>
                    <ExperienceCard/>
                </div>
            )}

            {activeTab === 'projects' && (
                <div>
                    <OwnProjectCard/>
                </div>
            )}

            {activeTab === 'studies' && (
                <div>
                    <StudyCard/>
                </div>
            )}
            </div>
        </div>
    </div>
    );
}

export default InfoDeveloper;

