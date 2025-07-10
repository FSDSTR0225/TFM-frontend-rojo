import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { AvatarImage } from "../../../components/AvatarImage";
import { NameUsers } from "../../../components/NameUsers";
import { useContainerWidth } from "../../../hooks/useContainerWidth";

const DevsCard = ({
  developer,
  profession,
  experienceYears,
  location,
  skills,
  developerId,
}) => {
  const skillsContainerRef = useRef(null);
  const containerWidth = useContainerWidth(skillsContainerRef);
  const [visibleSkills, setVisibleSkills] = useState([]);

  useEffect(() => {
    if (!containerWidth || skills.length === 0) return;

    const estimateSkillWidth = (skill) => {
      const baseWidth = 32; // padding + margin + border approx
      const charWidth = 7; // approx width per char
      return baseWidth + charWidth * skill.length;
    };

    let usedWidth = 0;
    const selected = [];

    for (let i = 0; i < skills.length; i++) {
      const w = estimateSkillWidth(skills[i]);
      if (usedWidth + w <= containerWidth - 40) {
        // 40 px margen para +N
        usedWidth += w + 4; // 4 px margen entre skills
        selected.push(skills[i]);
      } else {
        break;
      }
    }

    setVisibleSkills(selected);
  }, [containerWidth, skills]);

  return (
    <Link
      to={`/profile/${developerId}`}
      className="group relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-4 transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-neutral-90 text-inherit no-underline min-h-[180px]"
    >
      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* Avatar */}
          <div className="flex justify-center mt-1 mb-2">
            <AvatarImage user={developer} width={16} />
          </div>

          {/* Name */}
          <div className="text-center">
            <NameUsers
              classProps={
                "font-semibold text-lg leading-tight group-hover:text-primary-40 "
              }
              user={developer}
            />
          </div>

          {/* Profession + Experience */}
          <div className="text-center text-neutral-10 text-sm">
            {profession && <span>{profession}</span>}
            {profession && experienceYears && (
              <span className="text-neutral-30"> • </span>
            )}
            {experienceYears && (
              <span className="text-neutral-30">{experienceYears} years</span>
            )}
          </div>

          {/* Skills */}
          <div
            className="flex gap-1 mt-4 justify-center flex-nowrap overflow-hidden max-w-full"
            ref={skillsContainerRef}
          >
            {visibleSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-70 text-neutral-00 px-2 py-0.5 rounded-full text-sm whitespace-nowrap items-center flex"
              >
                {skill}
              </span>
            ))}
            {skills.length > visibleSkills.length && (
              <span className="bg-neutral-60 text-neutral-30 px-2 py-0.5 rounded-full text-sm">
                +{skills.length - visibleSkills.length}
              </span>
            )}
          </div>
        </div>

        {/* Location */}
        {location && (
          <div className="text-center text-neutral-20 text-sm mt-auto flex justify-center items-center mb-1 pt-6">
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

export default DevsCard;
