import React from 'react';
import Badge from '../../../components/Badge';
import { Link } from 'react-router'; // corregido

const DevsCard = ({ 
  name, 
  surname, 
  avatar, 
  profession, 
  experienceYears, 
  location, 
  skills, 
  developerId, 
  badgeText 
}) => {
  return (
    <Link
      to={`/profile/${developerId}`}
      className="group relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-4 transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-neutral-90 text-inherit no-underline" // ajusta min-h según tu diseño
    >
      {/* Badge positioned to the right */}
      {badgeText && (
        <div className="absolute top-0 right-2 mt-2">
          <Badge text={badgeText} color="border-primary-50" textColor="text-primary-50" />
        </div>
      )}

      {/* Main content with spacing between skills and location */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* Avatar */}
          <div className="flex justify-center mt-1 mb-2 relative">
            <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-neutral-60" />
          </div>

          {/* Name and Surname */}
          <div className="text-center">
            <span className="text-neutral-0 font-semibold text-lg leading-tight group-hover:text-primary-40">
              {name} {surname}
            </span>
          </div>

          {/* Profession, Year of Experience */}
          <div className="text-center text-neutral-10 text-sm">
            {profession && <span>{profession} </span>}
            {experienceYears && <span className="text-neutral-30">• {experienceYears} years</span>}
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-6 justify-center">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary-70 text-neutral-00 px-2 py-0.5 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="bg-neutral-60 text-neutral-30 px-2 py-0.5 rounded-full text-sm">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          )}

        </div>

        {/* Location at bottom */}
        <div className="text-center text-neutral-20 text-sm mt-6 flex justify-center items-center mb-1">
          {location && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-4 w-4 stroke-current text-primary-60 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2C8.134 2 5 5.134 5 8c0 3 4 7 7 11 3-4 7-8 7-11 0-2.866-3.134-6-7-6z"
                />
              </svg>
              <span>{location}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DevsCard;
