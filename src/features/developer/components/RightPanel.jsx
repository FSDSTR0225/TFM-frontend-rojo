import React, { useState } from 'react';
import ExperienceCard from './ExperienceCard';
import StudyCard from './StudyCard';
import OwnProjectCard from './OwnProjectCard';
import { PiBriefcase, PiCodeSimple, PiMedal } from 'react-icons/pi';

function RightPanel({ profileInfo, token, onProfileUpdated }) {
  const [activeTab, setActiveTab] = useState('projects');

  if (!profileInfo) return <p>Error al cargar el panel de la derecha</p>;

  const tabs = [
    { key: 'experiences', label: 'Experiences', icon: <PiBriefcase className="inline mr-1" /> },
    { key: 'projects', label: 'Projects', icon: <PiCodeSimple className="inline mr-1" /> },
    { key: 'studies', label: 'Studies', icon: <PiMedal className="inline mr-1" /> },
  ];

  return (
    <div className="ml-2">
      {/* Navbar DaisyUI */}
      <div className="navbar bg-neutral-80 rounded-md mb-4">
        <ul className="menu menu-horizontal w-full">
          {tabs.map(tab => (
            <li key={tab.key} className={`flex-1 text-center ${activeTab === tab.key ? 'rounded-md mx-1' : ''}`}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className="w-full flex justify-center items-center py-2 bg-neutral-60"
              >
                {tab.icon}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="bg-transparent rounded-md">
        {activeTab === 'experiences' && <ExperienceCard profileInfo={profileInfo} />}
        {activeTab === 'projects' && <OwnProjectCard profileInfo={profileInfo} token={token} onProfileUpdated={onProfileUpdated} />}
        {activeTab === 'studies' && <StudyCard profileInfo={profileInfo} />}
      </div>
    </div>
  );
}

export default RightPanel;

