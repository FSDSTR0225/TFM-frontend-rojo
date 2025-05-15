import React from 'react';
import { PiGithubLogo, PiEye, PiArrowSquareOut } from "react-icons/pi";
import { Link } from 'react-router';

function OwnProjectCard({ profileInfo }) {
    if (!profileInfo) return <p>Error al cargar los proyectos</p>;
    return (
        <div>
            <div className="flex justify-end mb-2">
            <Link 
                to={profileInfo.role.developer.github} 
                className=" flex flex-row w-28 mb-2 justify-center bg-primary-60 hover:bg-primary-70 rounded-full hover:shadow-lg text-sm"
                aria-label="Create project">
                Create project
            </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 bg-neutral-80 border border-neutral-60 p-8 rounded-md">
                <div className="ml-4">
                    <img
                    src="https://www.codedonostia.com/wp-content/uploads/2022/12/Diseno-web-de-un-negocio-1.jpg"
                    className=" w-80 h-60 rounded-md"
                    alt="projectImages"
                    />
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-3 gap-4 rounded-md">
                        <h3 className="col-span-2 text-xl uppercase font-bold">E-commerce Platform</h3>
                        <span className="flex flex-row justify-center w-24 bg-primary-60 p-1 rounded-full text-sm ">Website</span>
                        <span className="col-span-2  ">2018</span>
                        <span className="col-span-3 ">Full-featured online store with cart, payment integration, and admin dashboard.</span>
                        <div className="flex flex-wrap col-span-3 gap-2 mt-4">
                            {profileInfo.role.developer.skills.map((skill, index) => (
                            <span key={index} className="bg-primary-60 px-3 py-1 rounded-full text-sm">
                            {skill}
                            </span>
                            ))}
                        </div>
                        <div className="flex space-x-2 col-span-2">
                            <Link 
                                to={profileInfo.role.developer.github} 
                                className="flex flex-row p-2 m-2 bg-neutral-90 hover:bg-neutral-60 border border-neutral-60 rounded-md "
                                aria-label="GitHub Profile">
                                <PiGithubLogo className="text-xl" />Github
                            </Link>
                            <Link 
                                to={profileInfo.role.developer.github} 
                                className="flex flex-row h-8 px-3 py-1 m-2 bg-transparent border-2 border-primary-50 text-primary-50  hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0 rounded-full hover:shadow-lg"
                                aria-label="View Profile">
                                <PiEye className="text-xl" />View Project
                            </Link>
                            <Link 
                                to={profileInfo.role.developer.github} 
                                className="flex flex-row p-2 m-2 bg-primary-60 hover:bg-primary-70 text-neutral-90 rounded-full"
                                aria-label="View Profile">
                                <PiArrowSquareOut className="text-xl" />Project Details
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>  
    )
};

export default OwnProjectCard;