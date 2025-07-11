import { React, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/authContext";

export const ReadySkills = () => {
  const { profile: currentUser } = useContext(AuthContext);

  const renderSection = () => {
    // Si no hay usuario o no tiene rol, mostrar ambos botones
    if (!currentUser || !currentUser?.role || !currentUser?.role?.type) {
      return (
        <>
          <div className="flex flex-col items-center text-center mb-4">
            <h1 className="bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-tight text-3xl md:text-5xl font-bold mb-2">
              Ready to join the tech world?
            </h1>
            <span className="text-neutral-20">
              Sign up or log in to create your profile, post jobs, or showcase
              your skills.
            </span>
          </div>
          <div className="flex flex-row items-center justify-center text-center mt-4">
            <Link
              to={`/login`}
              className="btn bg-gradient-to-r from-secondary-60 to-primary-60 rounded-md gap-1 border-0 shadow-none"
            >
              Get Started
            </Link>
          </div>
        </>
      );
    }

    // Si es developer, solo mostrar botón de proyecto
    if (currentUser?.role.type === "developer") {
      return (
        <>
          <div className="flex flex-col items-center text-center mb-4 px-6">
            <h1 className="bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-tight text-3xl md:text-5xl font-bold mb-2">
              Ready to show off your skills?
            </h1>
            <span className="text-neutral-0">
              Create a new project and connect with top tech companies.
            </span>
          </div>
          <div className="flex flex-row items-center justify-center text-center mt-4">
            <Link
              to={`/login`}
              className="btn bg-gradient-to-r from-secondary-60 to-primary-60 rounded-md gap-1 border-0 shadow-none"
            >
              Create a new Project
            </Link>
          </div>
        </>
      );
    }

    // Si es recruiter, solo mostrar botón de oferta
    if (currentUser?.role.type === "recruiter") {
      return (
        <>
          <div className="flex flex-col items-center text-center mb-4">
            <h1 className="bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-tight text-3xl md:text-5xl font-bold mb-2">
              Looking for top talent?
            </h1>
            <span className="text-neutral-20">
              Post a job offer and start connecting with skilled developers
              today.
            </span>
          </div>
          <div className="flex flex-row items-center justify-center text-center mt-4">
            <Link
              to={`/login`}
              className="btn bg-gradient-to-r from-primary-60 to-secondary-60 rounded-md gap-1 border-0 shadow-none"
            >
              Create a new Offer
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <div className="w-full px-4">
      {/* Contenedor que ocupa 100% ancho y crea padding */}
      <div className="max-w-screen-xl mx-auto bg-gradient-to-r from-secondary-90 to-primary-90 rounded-3xl py-16 mb-16 mt-6">
        <div className="flex flex-col">{renderSection()}</div>
      </div>
    </div>
  );
};
