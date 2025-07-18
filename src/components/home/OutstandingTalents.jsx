import React from "react";
import { useDevelopers } from "../../hooks/useDevelopers";
import { TalentsCard } from "../TalentsCard";
import { PiCaretRight } from "react-icons/pi";
import { Link } from "react-router";

export const OutstandingTalents = () => {
  const { developers, loading } = useDevelopers();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-neutral-0">
          Outstanding talents
        </h1>
      </div>
      <div className="grid grid-cols-2">
        <span className="text-md font-normal mb-4 text-neutral-30">
          Discover the diverse talents and skills of our expert developers{" "}
        </span>
        <Link
          to={"/developers"}
          className="justify-self-end bg-transparent text-primary-60 rounded-md flex items-center gap-1 text-sm"
        >
          View all
          <PiCaretRight className="text-md" />
        </Link>
      </div>

      <div
        className="
  grid 
  grid-cols-1 
  sm:grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-2 
  xl:grid-cols-4 
  gap-6
"
      >
        {developers.map((developer) => (
          <TalentsCard
            key={developer._id}
            developerId={developer._id}
            developer={developer} // ✅ Esta línea es esencial
            avatar={developer.avatar}
            profession={developer.role?.developer?.professionalPosition}
            experienceYears={developer.role?.developer?.experienceYears}
            location={developer.role?.developer?.location}
            skills={developer.role?.developer?.skills}
            projectImage={developer.coverImage}
          />
        ))}
      </div>
    </div>
  );
};
