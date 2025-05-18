import React, { useState } from 'react';
import { NewProjectModal } from '../components/NewProjectModal';
import { PiPlus, PiArrowSquareOut, PiGithubLogo, PiEye} from "react-icons/pi";
import { Link } from 'react-router';

function OwnProjectCard({ profileInfo }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitProject = (projectData) => {
    console.log("Proyecto enviado al backend:", projectData);
    // Aquí puedes llamar a tu API con fetch o axios si lo deseas
  };
    
    if (!profileInfo) return <p>Error al cargar los proyectos</p>;
    return (
    <div>
      <div className="flex justify-end mb-2">
        <Link
          onClick={handleOpenModal}
          className="btn btn-primary bg-primary-60 hover:bg-primary-70 rounded-md hover:shadow-lg text-sm"
          aria-label="Create project"
        >
          Create project
          {/* <PiPlus className="text-xl font-bold text-white"/> */}
        </Link>
      </div>

      {isModalOpen && (
        <NewProjectModal
          onSubmitProject={handleSubmitProject}
          onClose={handleCloseModal}
        />
      )}

      {/* ///////////////////////////// */}

      <div class="card lg:card-side bg-base-100 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="ProjectImage" />
          </figure>
          
          <div class="card-body">
            <div className="grid grid-cols-2">
              <h2 class="card-title">E-commerce Platform</h2> 
              <span className="justify-self-end bg-primary-60 text-neutral-90 rounded-md px-2 py-0.5">
                Website
              </span>                 
            </div>
            
            <span>Full-featured online store with cart, payment integration, and admin dashboard.</span>
            <span>2018</span>

            <div className="flex flex-wrap col-span-3 gap-2 mt-4">
                {profileInfo.role.developer.skills.map((skill, index) => (
                <span key={index} className="bg-primary-60 rounded-md px-2 py-0.5 text-sm">
                {skill}
                </span>
                ))}
            </div>

            <div class="card-actions justify-end">
              <button class="btn btn-primary bg-neutral-90 hover:bg-neutral-60 border border-neutral-60 rounded-md ">
                <PiGithubLogo className="text-xl" />
                Github
              </button>
              <button class="btn btn-primary  bg-transparent border-2 border-primary-50 text-primary-50  hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0 rounded-md hover:shadow-lg">
                <PiEye className="text-xl" />
                View Project
              </button>
              <button class="btn btn-primary bg-primary-60 hover:bg-primary-70 text-neutral-90 rounded-md">
                <PiArrowSquareOut className="text-xl" />
                Project Details
              </button>
            </div>
          </div>
      </div>

    </div>  
    )
};

export default OwnProjectCard;