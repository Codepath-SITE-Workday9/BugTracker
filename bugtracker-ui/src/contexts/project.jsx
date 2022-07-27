import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const ProjectContext = createContext(null);

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllTeams();
    if (data) {
      setProjects(data.projectList);
    }
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [setProjects]);

  const projectValue = {
    projects,
    setProjects,
    currentProject,
    setCurrentProject,
    fetchProjects,
  };

  return (
    <ProjectContext.Provider value={projectValue}>
      <>{children}</>
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
