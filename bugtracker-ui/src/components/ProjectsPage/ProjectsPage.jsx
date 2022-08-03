import "./ProjectsPage.css";
import { useEffect } from "react";
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

  // useEffect hook to fetch updated list of projects a user is apart of after creating a new project
  useEffect(() => {
    fetchProjects();
  }, [setProjects]);

  // handler function to change which projects's details should be displayed
  const handleOnProjectClick = (projectId) => {
    setCurrentProject(projectId);
  };

  return (
    <div className="projects-page">
      {/* conditionally render the Modal to create a new team  */}
      {projectModal && <ProjectModal />}
      {/* conditionally blur background depending on if modal is open */}
      <div className={projectModal ? "background-blur" : "background"}>
        <ProjectsOverview
          projects={projects}
          handleOnProjectClick={handleOnProjectClick}
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
