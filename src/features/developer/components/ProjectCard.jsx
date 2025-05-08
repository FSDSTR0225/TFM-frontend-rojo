import React from 'react';
import Badge from '../../../components/Badge';
import { Link } from 'react-router';

const ProjectCard = ({ name, surname, avatar, image, projectLink, title, badgeText, category, developerId }) => {
  return (
    <div className="h-[256px] bg-neutral-80 flex flex-col rounded-lg shadow-md relative overflow-hidden border border-neutral-70">
      
      <div className="flex items-center gap-2 mb-2 px-2 pt-2 z-10 relative">
        <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full" />

        <Link to={`/profile/${developerId}`} className="text-neutral-0 font-semibold leading-tight hover:text-primary-40">
          {name} {surname}
        </Link>

      
        {category && (
          <span className="text-sm text-neutral-30 mx-2">• {category}</span>
        )}

      
        {badgeText && (
          <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
            <Badge text={badgeText} color="border-green-500" textColor="text-green-500" />
          </div>
        )}
      </div>

      
      <div className="relative flex-grow overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-auto h-auto object-contain "
        />
      
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
          <div className="absolute inset-0 bg-primary-60 bg-opacity-50" />
          <div className="absolute top-2 left-2 text-lg font-semibold text-neutral-0 z-40">
            {title}
          </div>
          <Link
            to={`/projects/${projectLink}`}
            className="z-40 border border-neutral-0 text-neutral-0 font-semibold py-2 px-4 rounded pointer-events-auto bg-transparent transition-colors duration-300 hover:border-neutral-90 hover:text-neutral-90"
          >
            View project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;