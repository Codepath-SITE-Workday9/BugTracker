import { createContext, useContext, useState } from "react";

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
