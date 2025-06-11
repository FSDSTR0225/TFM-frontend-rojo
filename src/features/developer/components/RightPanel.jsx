import React, { useState, useContext } from 'react';
import ExperienceCard from './ExperienceCard';
import StudyCard from './StudyCard';
import MyOffersCard from './MyOffersCard';
import OwnProjectCard from './OwnProjectCard';
import { PiBriefcase, PiCodeSimple, PiMedal } from 'react-icons/pi';
import { AuthContext } from '../../../context/authContext';

function RightPanel({ profileInfo, token, onProfileUpdated }) {
  const { profile: currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('projects');

  if (!profileInfo) return <p>Error al cargar el panel de la derecha</p>;

  const isCurrentUser = currentUser?._id === profileInfo?._id;

  const tabs = [
    { key: 'experiences', label: 'Experiences', icon: <PiBriefcase className="inline mr-1" /> },
    { key: 'projects', label: 'Projects', icon: <PiCodeSimple className="inline mr-1" /> },
    { key: 'studies', label: 'Studies', icon: <PiMedal className="inline mr-1" /> },
  ];

  if (isCurrentUser) {
  return (
    <div className="ml-2">
      {/* TABS */}
      <div className="tabs tabs-border">
        {/* Navbar EXP, PRO Y STU */}
        <input type="radio" name="my_tabs_2" className="tab" aria-label="Portfolio" defaultChecked/>
        <div className="tab-content border border-neutral-60 p-6 rounded-md">
          <div className="navbar flex items-center rounded-md mb-4">
            <ul className="menu menu-horizontal flex items-center w-full">
              {tabs.map(tab => (
                <li key={tab.key} className="flex items-center justify-center flex-1 mx-1">
                  <button
                    onClick={() => setActiveTab(tab.key)}
                    className="w-full flex items-center justify-center py-2 bg-neutral-60"
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

        {/* MIS OFERTAS */}
        <input type="radio" name="my_tabs_2" className="tab" aria-label="My Offers"  />
        <div className="tab-content border border-neutral-60 p-6 rounded-md">
            <MyOffersCard />
        </div>
      </div>
    </div>
  );
  } else { 
  return (
        <div className="ml-2 ">
          <div className="navbar rounded-md mb-4">
            <ul className="menu menu-horizontal w-full">
              {tabs.map(tab => (
                <li key={tab.key} className={`flex-1 text-center mx-1`}>
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
}

export default RightPanel;

