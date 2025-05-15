import React from "react";

export const MainRecButton = ({ children, classProps, onClick}) => {
  return (
    <button 
    onClick={onClick}
      className={`btn btn-outline btn-sm bg-secondary-40 text-neutral-90 hover:bg-neutral-0 ${classProps}`}
    >
      {children}
    </button>
  );
};
