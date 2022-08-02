import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const ProjectContext = createContext(null);

// context to keep track of a users projects, the current project selected, and whether or not the projectModal should be displayed.
export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [projectModal, setProjectModal] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllProjects();
    if (data) {
      setProjects(data.projectList);
      if (data.projectList.length > 0) {
        setCurrentProject(data.projectList[0]);
      }
    }
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  // useEffect to fetch projects on initial load
  useEffect(() => {
    fetchProjects();
  }, []);

  const projectValue = {
    projects,
    setProjects,
    currentProject,
    setCurrentProject,
    fetchProjects,
    projectModal,
    setProjectModal,
    isLoading,
  };

  return (
    <ProjectContext.Provider value={projectValue}>
      <>{children}</>
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
