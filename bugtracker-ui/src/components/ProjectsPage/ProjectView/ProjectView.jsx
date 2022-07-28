import { useProjectContext } from "../../../contexts/project";
import "./ProjectView.css";
export default function ProjectView({ currentProject, projectsAvailble }) {
  const { setProjectModal } = useProjectContext();
  return (
    <div className="project-view">
      <div className="project-header">
        <h1> {currentProject.name} </h1>
        <button className="new-btn" onClick={() => setProjectModal(true)}>
          Create New Project
        </button>
      </div>

      {projectsAvailble ? (
        <>
          <div className="project-description">
            <p>{currentProject.description}</p>
          </div>

          <div className="table">
            <table
              role="table"
              className="table table-striped table-bordered table-hover"
            >
              <thead>
                <tr role="row">
                  <th colSpan="5" role="columnheader" className="title">
                    Tickets
                  </th>
                </tr>
                <tr role="row">
                  <th colSpan="1" role="columnheader">
                    Ticket Name
                  </th>
                  <th colSpan="1" role="columnheader">
                    Description
                  </th>
                  <th colSpan="1" role="columnheader">
                    Status
                  </th>
                  <th colSpan="1" role="columnheader">
                    Developers
                  </th>
                  <th colSpan="1" role="columnheader">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {currentProject?.tickets?.map((ticket) => (
                  <TicketsTableRow
                    name={ticket.name}
                    description={ticket.description}
                    status={ticket.status}
                    devs={ticket.developers}
                    priority={ticket.priority}
                    key={ticket.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="nothing-created-yet">
            <h1>You have not created any projects yet!</h1>
            <h2>
              {" "}
              Start by clicking the Create New Project button to get started.
            </h2>{" "}
          </div>
        </>
      )}
    </div>
  );
}

export function TicketsTableRow({
  name,
  description,
  status,
  developers,
  priority,
}) {
  return (
    <tr role="row" className="row">
      <td role="cell">{name}</td>
      <td role="cell">{description}</td>
      <td role="cell">{status}</td>
      <td role="cell">{developers}</td>
      <td role="cell">{priority}</td>
    </tr>
  );
}
