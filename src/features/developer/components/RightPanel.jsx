import React from 'react';
import ExperienceCard from "./ExperienceCard";
import StudyCard from "./StudyCard";
import OwnProjectCard from "./OwnProjectCard";



function RightPanel({ profileInfo }) {

    if (!profileInfo) return <p>Error al cargar el panel de la derecha</p>;
    return (

    <div className="tabs tabs-border flex justify-around">
                {/* EXPERIENCES */}
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Experiences" defaultChecked />
                    <div className="tab-content bg-transparent p-4 rounded-md">
                        <ExperienceCard profileInfo={profileInfo}/>

                    </div>

                {/* PROJECTS */}
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Projects" />
                    <div className="tab-content bg-transparent p-4 rounded-md">
                        <OwnProjectCard profileInfo={profileInfo}/>
                    </div>
                
                {/* STUDIES */}
                
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Studies" />
                    <div className="tab-content  bg-transparent p-4 rounded-md">
                        <StudyCard profileInfo={profileInfo}/>
                    </div>
    </div>
    );
}

export default RightPanel;
