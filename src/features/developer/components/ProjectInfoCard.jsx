// src/components/ProjectInfoCard.js
import React, { useState } from "react";
import { PiUser, PiCalendar, PiClock, PiGithubLogo } from "react-icons/pi";

const ProjectInfoCard = ({ project }) => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  if (!project) return null;

  const {
    category,
    projectSkills,
    professionalRole,
    duration,
    year,
    liveLink,
    githubProjectLink,
    owner,
  } = project;

  const skillsToShow = showAllSkills ? projectSkills : projectSkills?.slice(0, 5) || [];

  return (
    <div className="relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-8 text-inherit no-underline w-full max-w-xs">
      {/* Badge opcional arriba a la derecha */}
      {category && (
        <div className="absolute top-0 right-2 mt-2">
          <span className="border border-primary-50 text-primary-50 px-2 py-0.5 rounded-full text-sm">
            {category}
          </span>
        </div>
      )}

      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* Owner Avatar */}
          {owner && (
            <div className="flex justify-center mt-1 mb-2 relative">
              <img
                src={owner.avatar}
                alt={`${owner.name} ${owner.surname}`}
                className="w-16 h-16 rounded-full border-2 border-neutral-60"
              />
            </div>
          )}

          <hr className="border-t border-neutral-60 my-4" />

        <div className="flex flex-col gap-2 text-neutral-10 text-sm">
            {professionalRole && (
                <div className="flex items-center gap-2">
                <PiUser className="text-primary-50" size={18} />
                <span className="text-neutral-0">{professionalRole}</span>
                </div>
            )}
            {year && (
                <div className="flex items-center gap-2">
                <PiCalendar className="text-primary-50" size={18} />
                <span className="text-neutral-0">{year}</span>
                </div>
            )}
            {duration && (
                <div className="flex items-center gap-2">
                <PiClock className="text-primary-50" size={18} />
                <span className="text-neutral-0">{duration}</span>
                </div>
            )}

            {/* GitHub link justo debajo de Duration */}
            {githubProjectLink && (
              <div className="flex items-center gap-2">
                <PiGithubLogo className="text-primary-50" size={18} />
                <a
                  href={githubProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-50 underline hover:text-primary-30"
                >
                  {githubProjectLink}
                </a>
              </div>
            )}

            {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full bg-neutral-90 text-neutral-0 hover:bg-primary-60 focus:bg-primary-70 text-center mt-2"
                >
                  Live Project
                </a>
            )}

            <hr className="border-t border-neutral-60 my-4" />

            {/* Skills */}
            {projectSkills && projectSkills.length > 0 && (
                <div>
                <div className="flex flex-wrap justify-start gap-1">
                    {skillsToShow.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-primary-70 text-neutral-0 px-2 py-0.5 rounded-full text-sm"
                    >
                        {skill}
                    </span>
                    ))}

                    {!showAllSkills && projectSkills.length > 5 && (
                    <button
                        type="button"
                        onClick={() => setShowAllSkills(true)}
                        className="bg-neutral-60 text-neutral-30 px-2 py-0.5 rounded-full text-sm cursor-pointer"
                        aria-label={`Show ${projectSkills.length - 5} more skills`}
                    >
                        +{projectSkills.length - 5}
                    </button>
                    )}
                </div>
                </div>
            )}
          </div>
        </div>
        </div>
      </div>
  );
};

export default ProjectInfoCard;
