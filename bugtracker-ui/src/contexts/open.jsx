import { createContext, useContext, useState } from "react";
// import apiClient from "../services/apiClient";

const OpenContext = createContext(null);

export const OpenContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const authValue = {
    isOpen,
    setIsOpen,
  };

  return (
    <OpenContext.Provider value={authValue}>
      <>{children}</>
    </OpenContext.Provider>
  );
};

export const useOpenContext = () => useContext(OpenContext);
