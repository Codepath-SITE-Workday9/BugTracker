import "./ProjectsPage.css";
import { useEffect, useState } from "react";
import { useProjectContext } from "../../contexts/project";
import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
import ProjectView from "./ProjectView/ProjectView";
import ProjectModal from "../Modals/ProjectModal/ProjectModal";

// page where a user can see all projects they are apart of(ProjectsOverview component) and where a user can view specific details about a project + create a new project(ProjectView component)
export default function ProjectsPage() {
  const {
    projects,
    setProjects,
    setCurrentProject,
    projectModal,
    fetchProjects,
    isLoading,
  } = useProjectContext();

  const [sortedProjects, setSortedProjects] = useState(projects)

  // useEffect hook to fetch updated list of projects a user is apart of after creating a new project
  useEffect(() => {
    console.log("Entering useEffect")
    fetchProjects();
  }, [projectModal]);

  // handler function to change which projects's details should be displayed
  const handleOnProjectClick = (projectId) => {
    setCurrentProject(projectId);
  };

  // const [sortedProjects, setSortedProjects] = useState(projects)

  const handleOnFilterChange = () => {
    console.log("entered")
    const results = projects.sort((project1, project2) => (project1.tickets.length > project2.tickets.length) ? 1 : -1)
    setSortedProjects(results)
    console.log("Filter: ", sortedProjects)
  }

  if(projects.length > 0 && sortedProjects.length == 0)
  {
      setSortedProjects(projects)
  }

  return (
    <div className="projects-page">
      {/* conditionally render the Modal to create a new team  */}
      {projectModal && <ProjectModal />}
      {/* conditionally blur background depending on if modal is open */}
      <div className={projectModal ? "background-blur" : "background"}>
        <ProjectsOverview
          projects={projects}
          sortedProjects={sortedProjects}
          setSortedProjects={setSortedProjects}
          handleOnProjectClick={handleOnProjectClick}
          handleOnFilterChange={handleOnFilterChange}
          isLoading={isLoading}
        />
        <ProjectView
          projectsAvailable={projects.length > 0}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
