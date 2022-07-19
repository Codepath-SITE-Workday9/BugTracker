import "./ProjectView.css";
export default function ProjectView() {
  const fakeData = [
    {
      name: " fake ticket 1",
      description: "Lorem ipsum dolor sit amet, sectetur adipiscing elit",
      status: "in progress",
      developers: ["", "", ""],
      priority: "low",
    },
    {
      name: "fake ticket 3",
      description: "Lorem ipsum dolor sit amet, sectetur adipiscing elit",
      status: "submitted",
      developers: ["", "", ""],
      priority: "extreme",
    },
    {
      name: "flixster ticket ",
      description: "Lorem ipsum dolor sit amet, sectetur adipiscing elit",
      status: "not started",
      developers: ["", "", ""],
      priority: "low",
    },
    {
      name: "bug tracker ticket",
      description: "Lorem ipsum dolor sit amet, sectetur adipiscing elit",
      status: "in progress",
      developers: ["", "", ""],
      priority: "high",
    },
  ];
  return (
    <div className="project-view">
      <div className="project-header">
        <h1>Project Title </h1>
        <button className="new-project-btn">New Project</button>
      </div>
      <div className="project-description">
        <p>
          Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod
          tempor consecr adipiscing elit ipsum dolor sit amet, sectetur
          adipiscing elit, sed do eiusmod tempor consecr adipiscing elit
        </p>
      </div>
      <div className="tickets-header">
        <h2>Tickets</h2>
      </div>
      <div className="ticket-name-header">
        <h3>Ticket Name</h3>
      </div>

      <div className="table">
        <table
          role="table"
          className="table table-striped table-bordered table-hover"
        >
          <thead>
            <tr role="row">
              <th colSpan="5" role="columnheader">
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
    <tr role="row">
      <td rold="cell">{name}</td>
      <td rold="cell">{description}</td>
      <td rold="cell">{status}</td>
      <td rold="cell">{developers}</td>
      <td rold="cell">{priority}</td>
    </tr>
  );
}
