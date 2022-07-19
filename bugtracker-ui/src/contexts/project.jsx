import { createContext, useContext, useState } from "react";
// import apiClient from "../services/apiClient";

const ProjectContext = createContext(null);

export const ProjectContextProvider = ({ children }) => {
  const [project, setProject] = useState({});

  const authValue = {
    project,
    setProject,
  };

  return (
    <ProjectContext.Provider value={authValue}>
      <>{children}</>
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
