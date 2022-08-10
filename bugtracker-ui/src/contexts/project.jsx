import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const ProjectContext = createContext(null);

// context to keep track of a users projects, the current project selected, and whether or not the projectModal should be displayed.
export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [projectModal, setProjectModal] = useState(false);
  const [sortedProjects, setSortedProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  const [projectToEdit, setProjectToEdit] = useState({});
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortValue, setSortValue] = useState("Most Tickets");
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllProjects();
    if (data) {
      setProjects(data.projectList);
      if (
        data.projectList.length > 0 &&
        Object.keys(currentProject).length == 0
      ) {
        setCurrentProject(data.projectList[0]);
      }
      sortProjects(data.projectList);
    }
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  // useEffect to fetch projects on initial load
  useEffect(() => {
    fetchProjects();
    setSortedProjects(projects);
  }, []);

  // useEffect to sort projects whenever sortValue changes
  useEffect(() => {
    sortProjects(projects);
  }, [sortValue]);

  // function to sort projects based on sort value
  const sortProjects = (p) => {
    if (sortValue === "Least Tickets") {
      const results = p.sort((project1, project2) =>
        project1.tickets.length > project2.tickets.length ? 1 : -1
      );
      setSortedProjects(results);
    } else if (sortValue === "Most Tickets") {
      const results = p.sort((project1, project2) =>
        project1.tickets.length < project2.tickets.length ? 1 : -1
      );
      setSortedProjects(results);
    } else if (sortValue === "Most Teams") {
      const results = p.sort((project1, project2) =>
        project1.teams.length > project2.teams.length ? 1 : -1
      );
      setSortedProjects(results);
    } else if (sortValue === "Least Teams") {
      const results = p.sort((project1, project2) =>
        project1.teams.length < project2.teams.length ? 1 : -1
      );
      setSortedProjects(results);
    }
  };

  const clearProjectContext = () => {
    setProjects([]);
    setSortedProjects([]);
    setProjectModal(false);
    setCurrentProject({});
    setIsLoading(false);
    setError("");
  };

  const projectValue = {
    projects,
    setProjects,
    sortedProjects,
    setSortedProjects,
    currentProject,
    setCurrentProject,
    fetchProjects,
    projectModal,
    setProjectModal,
    isLoading,
    clearProjectContext,
    projectToEdit,
    setProjectToEdit,
    editing,
    setEditing,
    sortValue,
    setSortValue,
    sortProjects,
  };

  return (
    <ProjectContext.Provider value={projectValue}>
      <>{children}</>
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
