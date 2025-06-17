// MainRecButton.jsx
import React from "react";

export const MainRecButton = ({ children, classProps, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-outline btn-sm bg-secondary-40 text-neutral-90 hover:bg-neutral-0 ${classProps} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};
