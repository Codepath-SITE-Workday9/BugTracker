import { createContext, useContext, useState } from "react";
// import apiClient from "../services/apiClient";

const OpenContext = createContext(null);

export const OpenContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openValue = {
    isOpen,
    setIsOpen,
  };

  return (
    <OpenContext.Provider value={openValue}>
      <>{children}</>
    </OpenContext.Provider>
  );
};

export const useOpenContext = () => useContext(OpenContext);
