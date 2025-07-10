import React from "react";
import { Link } from "react-router";
import { PiMapPin, PiBriefcase } from "react-icons/pi";
import { NameUsers } from "../NameUsers";
import { AvatarImage } from "../AvatarImage";

export const SearchDevCard = ({
  developer,
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
      <AvatarImage user={developer} width={16} />

      {/* Contenido a la derecha con 3 bloques verticales y espacio uniforme entre ellos */}
      <div className="flex flex-col flex-1 ml-3 text-left overflow-hidden gap-y-1.5">
        {/* Nombre y Apellido */}
        <div
          className="flex flex-col flex-1 text-left gap-y-1.5"
          style={{ minWidth: 0 }}
        >
          <div
            className="overflow-hidden whitespace-nowrap"
            style={{ textOverflow: "ellipsis" }}
          >
            <NameUsers
              classProps="font-semibold text-md leading-tight group-hover:text-primary-40 truncate block"
              user={developer}
              align="items-start"
            />
          </div>
          {/* resto de bloques */}
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
