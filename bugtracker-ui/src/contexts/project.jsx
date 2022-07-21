import { createContext, useContext, useState } from "react";
// import apiClient from "../services/apiClient";

const ProjectContext = createContext(null);

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState([]);

  const projectValue = {
    projects,
    setProjects,
    currentProject,
    setCurrentProject,
  };

  return (
    <ProjectContext.Provider value={projectValue}>
      <>{children}</>
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
