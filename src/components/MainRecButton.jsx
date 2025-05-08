import React from "react";

export const MainRecButton = ({ children, classProps}) => {
  return (
    <button 

      className={`btn btn-outline btn-sm bg-secondary-40 text-neutral-90  hover:bg-neutral-60 hover:text-neutral-0 ${classProps}`}
    >
      {children}
    </button>
  );
};
