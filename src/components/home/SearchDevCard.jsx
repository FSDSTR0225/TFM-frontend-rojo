import React from "react";
import { Link } from "react-router";
import { PiMapPin, PiBriefcase } from "react-icons/pi";

export const SearchDevCard = ({
  name,
  surname,
  avatar,
  profession,
  experienceYears,
  location,
  developerId,
}) => {
  return (
    <Link
      to={`/profile/${developerId}`}
      className="group relative bg-neutral-80 flex flex-row rounded-lg shadow-md overflow-hidden border border-neutral-70 px-3 py-4 transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-neutral-90 text-inherit no-underline"
    >
      {/* Avatar a la izquierda */}
      <div className="flex-shrink-0">
        <img
          src={avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-neutral-60"
        />
      </div>

      {/* Contenido a la derecha con 3 bloques verticales y espacio uniforme entre ellos */}
      <div className="flex flex-col flex-1 ml-3 text-left overflow-hidden gap-y-1.5">
        {/* Nombre y Apellido */}
        <div>
          <span className="text-neutral-0 font-semibold text-md leading-tight group-hover:text-primary-40 truncate block whitespace-nowrap">
            {name} {surname}
          </span>
        </div>

        {/* Profesión */}
        {profession && (
          <div className="flex items-center text-neutral-10 text-xs truncate space-x-1">
            <PiBriefcase className="w-3.5 h-3.5 text-primary-60" />
            <span className="truncate">{profession}</span>
          </div>
        )}

        {/* Location + ExperienceYears */}
        {(location || experienceYears) && (
          <div className="text-neutral-20 text-xs flex items-center space-x-1 truncate">
            {location && (
              <>
                <PiMapPin className="w-3.5 h-3.5 text-primary-60" />
                <span className="truncate">{location}</span>
              </>
            )}
            {location && experienceYears && (
              <span className="text-neutral-30 select-none">•</span>
            )}
            {experienceYears && (
              <span className="text-neutral-30 truncate">
                {experienceYears} years
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
