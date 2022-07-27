import "./ProjectView.css";
import ProjectModal from "../ProjectModal/ProjectModal";
export default function ProjectView({ setModal, projectToShow }) {
  const fakeData = [
    {
      name: "Live chat feature",
      description: "Lorem ipsum dolor sit amet, sectetur adipiscing elit",
      status: "in progress",
      developers: ["", "", ""],
      priority: "low",
      id: 0,
    },
    {
      name: "Activity cards are not colorblind accessible",
      description: "Lorem ipsum dolor sit amet, sectetur adipiscing elit",
      status: "submitted",
      developers: ["", "", ""],
      priority: "extreme",
      id: 1,
    },
    {
      name: "Adding nutrition does not render on screen",
      description: "Lorem ipsum dolor sit amet, sectetur adipiscing elit",
      status: "not started",
      developers: ["", "", ""],
      priority: "low",
      id: 2,
    },
    {
      name: "Total calories are not calculated correctly",
      description: "Lorem ipsum dolor sit amet, sectetur adipiscing elit",
      status: "in progress",
      developers: ["", "", ""],
      priority: "high",
      id: 3,
    },
  ];
  return (
    <div className="project-view">
      <div className="project-header">
        <h1> {projectToShow} </h1>
        <button className="new-btn" onClick={() => setModal(true)}>
          New Project
        </button>
      </div>
      <div className="project-description">
        <p>
          Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod
          tempor consecr adipiscing elit ipsum dolor sit amet, sectetur
          adipiscing elit, sed do eiusmod tempor consecr adipiscing elit
        </p>
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
            {fakeData.map((ticket) => (
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
