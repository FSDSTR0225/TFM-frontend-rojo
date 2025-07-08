import React from "react";
import { Link } from "react-router";
import { NameUsers } from "../components/NameUsers";

export const TalentsCard = ({
  developer,
  avatar,
  profession,
  experienceYears,
  location,
  skills,
  developerId,
  projectImage,
}) => {
  return (
    <Link
      to={`/profile/${developerId}`}
      className="group relative flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-1 hover:border-primary-90 hover:shadow-[0_0_30px_5px_rgba(34,197,94,0.2)] bg-neutral-80 text-inherit no-underline"
    >
      {/* Imagen de proyecto */}
      <div className="relative w-full h-28 flex items-center justify-center overflow-hidden">
        {projectImage ? (
          <figure>
            <img src={projectImage} alt="Project" />
            {/* Capa con degradado */}
            <div className="absolute inset-0 bg-neutral-80/10" />
          </figure>
        ) : (
          <div className="relative w-full h-full">
            <div className="w-full h-full bg-gradient-to-r from-primary-40 to-secondary-40" />
            {/* Capa con degradado encima del degradado */}
            <div className="absolute inset-0 bg-neutral-80/10" />
          </div>
        )}
      </div>

      {/* Avatar flotante */}
      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 z-20">
        <div className="p-0.5 rounded-full bg-gradient-to-br from-primary-40 to-secondary-40">
          <figure>
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full bg-white"
            />
          </figure>
        </div>
      </div>

      {/* Info */}
      <div className="pt-10 mt-2 pb-4 px-4 text-center">
        <div className="text-neutral-0 font-semibold text-lg leading-tight group-hover:text-primary-40">
          <NameUsers
            classProps={
              "font-semibold text-lg leading-tight group-hover:text-primary-40 "
            }
            user={developer}
          />
        </div>

        {/* Profesión + años de experiencia */}
        <div className="text-center text-neutral-10 text-sm">
          {profession && <span>{profession}</span>}
          {profession && experienceYears && (
            <span className="text-neutral-30"> • </span>
          )}
          {experienceYears && (
            <span className="text-neutral-30">{experienceYears} years</span>
          )}
        </div>

        <div className="flex gap-1 mt-4 justify-center flex-wrap max-w-full">
          {skills.length > 0 && (
            <>
              {(() => {
                // Calcular si las dos primeras skills son demasiado largas
                const limitLength = 10; // ajustable
                const shortSkills = skills
                  .slice(0, 3)
                  .filter((s) => s.length <= limitLength);
                const displayedSkills =
                  shortSkills.length < 3
                    ? skills.slice(0, 2)
                    : skills.slice(0, 3);

                return displayedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary-70 text-neutral-00 px-2 py-0.5 rounded-full text-xs whitespace-nowrap items-center flex"
                  >
                    {skill}
                  </span>
                ));
              })()}
              {skills.length > 3 && (
                <span className="bg-neutral-60 text-neutral-30 px-2 py-0.5 rounded-full text-sm">
                  +{skills.length - 3}
                </span>
              )}
            </>
          )}
        </div>
        {/* Location */}
        {location && (
          <div className="text-center text-neutral-20 text-sm mt-4 flex justify-center items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current text-primary-60 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2C8.134 2 5 5.134 5 8c0 3 4 7 7 11 3-4 7-8 7-11 0-2.866-3.134-6-7-6z"
              />
            </svg>
            <span>{location}</span>
          </div>
        )}
      </div>
    </Link>
  );
};
