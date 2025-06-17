import React, { useEffect } from "react";

export const CompleteComponent = ({ onValidChange }) => {
  useEffect(() => {
    onValidChange?.(true); // Siempre válido al final
  }, [onValidChange]);

  return (
    <h3 className="text-lg py-4 font-medium text-green-700">
      All steps complete 🔥
    </h3>
  );
};
