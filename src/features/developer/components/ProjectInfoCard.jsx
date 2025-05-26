// src/components/ProjectInfoCard.js
import React, { useState } from "react";
import { Link } from "react-router";
import { PiUser, PiCalendar, PiClock, PiGithubLogo, PiHeartStraight, PiEye, PiArrowSquareOut, PiChatText  } from "react-icons/pi";

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
    <div className="relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-8 text-inherit no-underline w-full max-w-full">

      {category && (
        <div className="absolute top-0 left-8 right-8 mt-8 flex justify-between items-center">
            <span className="bg-primary-60/20 text-primary-50 px-2 py-0.5 rounded-md text-sm">
                {category}
            </span>
            <div className="flex items-center gap-4 text-neutral-0">
                <div className="flex items-center gap-1">
                <PiHeartStraight className="text-primary-80" />
                <span>{project.likes || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                <PiEye className="text-primary-80" />
                <span>{project.views || 0}</span>
                </div>
            </div>
        </div>
      )}

      <div className="flex flex-col justify-between flex-1">
        <div>
          {owner && (
            <div className="flex flex-col justify-center items-center mt-4 mb-2 relative">
              <Link to={`/profile/${owner._id}`} className="relative group">
                <img
                  src={owner.avatar}
                  alt={`${owner.name} ${owner.surname}`}
                  className="w-16 h-16 rounded-full border-2 border-neutral-60 hover:border-primary-50 transition-colors duration-300"
                />
              </Link>

              <Link
                to={`/profile/${owner._id}`}
                className="mt-2 text-neutral-0 text-lg font-semibold hover:text-primary-50 transition-colors duration-300"
              >
                {owner.name} {owner.surname}
              </Link>
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
                <div className="flex gap-2 mt-2">
                    <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn flex-1 bg-neutral-90 border-neutral-80 text-neutral-0 hover:bg-neutral-60 focus:bg-neutral-100 text-center flex items-center justify-center gap-2"
                    >
                    <PiArrowSquareOut size={18} /> Live Project 
                    </a>
                    <button
                    type="button"
                    onClick={() => alert("Chat not created yet")} // Aquí pones la acción real
                    className="btn flex-1 bg-primary-60 text-neutral-0 hover:bg-primary-70 focus:bg-primary-80 flex items-center justify-center gap-2"
                    >
                    <PiChatText size={18} /> Contact 
                    </button>
                </div>
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
