import "./ProjectsPage.css";
import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
import ProjectView from "./ProjectView/ProjectView";
import { useEffect, useState } from "react";
import ProjectModal from "../Modals/ProjectModal/ProjectModal";
import { useProjectContext } from "../../contexts/project";
export default function ProjectsPage() {
  const {
    projects,
    setProjects,
    setCurrentProject,
    currentProject,
    projectModal,
    setProjectModal,
    fetchProjects,
  } = useProjectContext();

  useEffect(() => {
    fetchProjects();
  }, [setProjects]);

  const handleOnProjectClick = (projectId) => {
    setCurrentProject(projectId);
  };

  return (
    <div className="projects-page">
      {projectModal && <ProjectModal setModal={setProjectModal} />}
      <div className={projectModal ? "background-blur" : "background"}>
        <ProjectsOverview
          projects={projects}
          handleOnProjectClick={handleOnProjectClick}
        />
        <ProjectView
          // currentProject={currentProject}
          projectsAvailable={projects.length > 0}
        />
      </div>
    </div>
  );
}
