import React from 'react';
import Badge from '../../../components/Badge';
import { Link } from 'react-router';

const ProjectCard = ({ name, surname, avatar, image, projectLink, title, badgeText, category }) => {
    return (
        <div className="h-[256px] bg-[#1c1c1c] flex flex-col rounded-lg shadow-md relative group overflow-hidden border border-[#222222]">
          {/* Avatar, nombre del usuario y badge */}
          <div className="flex items-center gap-2 mb-2 px-2 pt-2 z-10 relative">
            <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
            <h4 className="text-base font-semibold leading-tight">
          {name} {surname}
        </h4> {/* Nombre completo del usuario */}

            {/* Mostrar categoría solo si estamos en la pestaña "All" */}
            {category && (
              <span className="text-sm text-[#606a79] mx-2">• {category}</span> // Mostrar categoría
            )}
    
            {/* Badge, centrado en el contenedor de avatar y userName */}
            {badgeText && (
              <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
                <Badge text={badgeText} color="border-green-500" textColor="text-green-500" />
              </div>
            )}
          </div>

          {/* Imagen que ocupa el resto */}
          <div className="flex-grow overflow-hidden z-0">
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-contain "
            />
          </div>

          {/* Hover overlay con botón */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
            {/* Capa oscura */}
            <div className="absolute inset-0 bg-[#32B441] bg-opacity-50" />
            {/* Nombre del proyecto en el hover */}
            <div className="absolute top-2 left-2 text-lg font-semibold text-white z-40 ">
                {title} {/* Título del proyecto en el hover */}
            </div>
            {/* Botón con hover */}
            <Link
              to={`/projects/${projectLink}`}
              className="z-40 border border-white text-white font-semibold py-2 px-4 rounded pointer-events-auto bg-transparent transition-colors duration-300 hover:border-[#171717] hover:text-[#171717]"
            >
              View project
            </Link>
          </div>
        </div>
    );
};

export default ProjectCard;
