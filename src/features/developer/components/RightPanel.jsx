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
      <div className="ml-0 lg:ml-4">
        {/* TABS */}
        <div className="tabs tabs-border">
          {/* Navbar EXP, PRO Y STU */}
          <input type="radio" name="my_tabs_2" className="tab" aria-label="Portfolio" defaultChecked/>
          <div className="tab-content  rounded-md pb-4">
            <div className="flex items-center rounded-md">
              <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4 p-2 bg-neutral-60 rounded-md">
                {tabs.map(tab => (
                  <label 
                    key={tab.key}
                    className={`cursor-pointer select-none rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center w-full sm:flex-1 hover:bg-primary-60  ${
                      activeTab === tab.key 
                        ? 'bg-neutral-90' 
                        : 'bg-neutral-60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tab_toggle"
                      checked={activeTab === tab.key}
                      onChange={() => setActiveTab(tab.key)}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center gap-2">
                      {tab.icon}
                      {tab.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-transparent rounded-md flex-1 mt-2">
              {activeTab === 'experiences' && <ExperienceCard profileInfo={profileInfo} />}
              {activeTab === 'projects' && <OwnProjectCard profileInfo={profileInfo} token={token} onProfileUpdated={onProfileUpdated} />}
              {activeTab === 'studies' && <StudyCard profileInfo={profileInfo} />}
            </div>
          </div>

          {/* MIS OFERTAS */}
          <input type="radio" name="my_tabs_2" className="tab" aria-label="My Offers" />
          <div className="tab-content pt-2 rounded-md">
            <MyOffersCard />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ml-0 lg:ml-4">
        <div className="rounded-md">
          <div className="flex items-center rounded-md">
            <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4 p-2 bg-neutral-60 rounded-md">
              {tabs.map(tab => (
                <label 
                  key={tab.key}
                  className={`cursor-pointer select-none rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center w-full sm:flex-1 hover:bg-primary-60  ${
                    activeTab === tab.key 
                      ? 'bg-neutral-90' 
                      : 'bg-neutral-60'
                  }`}
                >
                  <input
                    type="radio"
                    name="tab_toggle_visitor"
                    checked={activeTab === tab.key}
                    onChange={() => setActiveTab(tab.key)}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-transparent rounded-md flex-1 mt-2">
          {activeTab === 'experiences' && <ExperienceCard profileInfo={profileInfo} />}
          {activeTab === 'projects' && <OwnProjectCard profileInfo={profileInfo} token={token} onProfileUpdated={onProfileUpdated} />}
          {activeTab === 'studies' && <StudyCard profileInfo={profileInfo} />}
        </div>
      </div>
    );
  }
}

export default RightPanel;