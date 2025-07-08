// src/context/SummarizerContext.js
import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
export const SummarizerContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useSummarizer = () => {
  return useContext(SummarizerContext);
};

// Proveedor del contexto
export const SummarizerProvider = ({ children }) => {
  // Estado para saber si la API de Summarizer está lista para usar
  const [isSummarizerReady, setIsSummarizerReady] = useState(false);
  // Estado para saber si el Summarizer está disponible en el navegador (sin user gesture)
  const [isSummarizerAPIAvailable, setIsSummarizerAPIAvailable] = useState(false);
  // Estado para manejar el mensaje de error o necesidad de user gesture
  const [summarizerMessage, setSummarizerMessage] = useState("");

  const value = {
    isSummarizerReady,
    setIsSummarizerReady,
    isSummarizerAPIAvailable,
    setIsSummarizerAPIAvailable,
    summarizerMessage,
    setSummarizerMessage,
  };

  return (
    <SummarizerContext.Provider value={value}>
      {children}
    </SummarizerContext.Provider>
  );
};