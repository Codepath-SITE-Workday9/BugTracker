import { useProjectContext } from "../../../contexts/project";
import "./ProjectView.css";
import { ProjectsPageTicketsTable } from "../../Tables/ProjectsPageTicketsTable";

export default function ProjectView({ currentProject, projectsAvailable }) {
  const { setProjectModal } = useProjectContext();
  return (
    <div className="project-view">
      <div className="project-header">
        {/* conditionally display the current project's name, if any projects are available */}
        <h1> {projectsAvailable && currentProject.name} </h1>
        <button className="new-btn" onClick={() => setProjectModal(true)}>
          Create New Project
        </button>
      </div>

      {/* conditionally display the project's information, if there are no projects available, display a "No projects created yet" message */}
      {projectsAvailable ? (
        <>
          <div className="project-description">
            <p>{currentProject.description}</p>
          </div>
          <div className="table">
            <ProjectsPageTicketsTable />
          </div>
        </>
      ) : (
        <>
          <div className="nothing-created-yet">
            <h1>You have not created any projects yet!</h1>
            <h2>To get started, click the Create New Project button.</h2>
          </div>
        </>
      )}
    </div>
  );
}
