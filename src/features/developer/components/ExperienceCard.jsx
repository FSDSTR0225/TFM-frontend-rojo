import React from 'react';
import { PiPlus } from "react-icons/pi";
import { Link } from 'react-router';

function ExperienceCard({ profileInfo }) {
    if (!profileInfo) return <p>Error al cargar las experiencias</p>;
    return (
        <div className="">
            <div className="flex justify-end mb-2">
            <Link 
                to={profileInfo.role.developer.github} 
                className=" flex flex-row w-8 mb-2 justify-center bg-primary-60 hover:bg-primary-70 rounded-full hover:shadow-lg text-sm"
                aria-label="Create experience">
                <PiPlus className="text-xl font-bold text-white"/>
            </Link>
            </div>
            <div className="grid grid-cols-3 bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md">
                <h3 className="col-span-2 text-xl uppercase font-bold">Senior Frontend Developer</h3>
                <span className="grid justify-items-end pr-4 ">2020 - Present</span>
                <span className="col-span-2 text-gray-400">Tech Solutions Inc.</span>
                <span className="col-start-1 col-end-4">Leading frontend development for enterprise applications. Implemented design systems and improved performance optimization.</span>
            </div>
        </div>

    )
};

export default ExperienceCard;