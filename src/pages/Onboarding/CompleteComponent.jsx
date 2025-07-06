import React from "react";
import { PiCheckCircle } from "react-icons/pi";

export const CompleteComponent = ({ role }) => {
  // Color sólido para el icono según rol
  const iconColor =
    role === "developer" ? "text-primary-50" : "text-secondary-50";

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full -mt-30 gap-4">
      <PiCheckCircle size={96} className={`${iconColor}`} />

      <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary-60 to-secondary-60 bg-clip-text text-transparent mb-2 pb-1">
        Congratulations!
      </h2>

      <p className="text-white text-lg">You’ve completed the onboarding</p>
    </div>
  );
};
