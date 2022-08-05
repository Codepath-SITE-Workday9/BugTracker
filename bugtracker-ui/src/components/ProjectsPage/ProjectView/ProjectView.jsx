import "./ProjectView.css";
import { useProjectContext } from "../../../contexts/project";
import { ProjectsPageTicketsTable } from "../../Tables/ProjectsPageTicketsTable";
import { useTicketContext } from "../../../contexts/ticket";

export default function ProjectView({ projectsAvailable }) {
  const { isLoading, setProjectModal, currentProject, projectToEdit, setProjectToEdit, setEditing, editing} = useProjectContext();

  const handleOnEditClick = () => {
     setEditing(true)
     setProjectToEdit(currentProject)
     setProjectModal(true)
  }

  return (
    <div className="project-view">
      {!isLoading ? (
        <>
          <div className="project-header">
            {/* conditionally display the current project's name, if any projects are available */}
            <h1> {projectsAvailable && currentProject?.name} </h1>
            <button className="edit-btn" onClick={handleOnEditClick} title="Edit this ticket">
                <span className="material-symbols-outlined" id="edit-icon">edit_document</span>
            </button>
          </div>
          {/* conditionally display the project's information, if there are no projects available,   display a "No projects created yet" message */}
          {projectsAvailable ? (
            <>
              <div className="project-description">
                <p>{currentProject?.description}</p>
              </div>
              <div className="table">
                <ProjectsPageTicketsTable currentProject={currentProject} />
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
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}
