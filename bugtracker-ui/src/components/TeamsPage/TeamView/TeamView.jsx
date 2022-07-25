import "./TeamView.css";
import { useProjectContext } from "../../../contexts/project";

//Overview of a specific team
export default function TeamView({ setModal, currentTeam }) {
  const { projects } = useProjectContext();

  var devs = [
    { name: "doris", numTickets: 1, role: "developer" },
    { name: "aaron", numTickets: 3, role: "developer" },
    { name: "katherin", numTickets: 2, role: "designer" },
  ];

  return (
    <div className="team-view">
      <div className="team-header">
        <h1> {currentTeam} </h1>
        <button className="new-btn" onClick={() => setModal(true)}>
          New Team
        </button>
      </div>

      <div className="team-developers">
        <h2>Developers on this team: </h2>
        <DevelopersOnTeam devs={devs} />
        <AddDeveloper />
      </div>

      <ProjectsAssignedToTeams projects={projects} />
    </div>
  );
}

export function DevelopersOnTeam({ devs }) {
  return (
    <div className="developers-table">
      <table role="table" className="teams-table">
        <thead>
          <tr role="row">
            <th colSpan="1" role="columnheader">
              Developer
            </th>
            <th colSpan="1" role="columnheader">
              Role
            </th>
            <th colSpan="1" role="columnheader">
              Number of open tickets
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {devs?.map((dev) => (
            <DeveloperRow
              name={dev.name}
              numTickets={dev.numTickets}
              role={dev.role}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DeveloperRow({ name, numTickets, role }) {
  return (
    <tr role="row" className="row">
      <td role="cell">
        <div className="developer-cell">
          <span className="material-symbols-outlined">face</span>
          {name}
        </div>
      </td>
      <td role="cell" className="role-cell">
        {role}
      </td>
      <td role="cell" className="tickets-cell">
        {numTickets} open ticket{numTickets == 1 ? "" : "s"}
      </td>
    </tr>
  );
}

export function AddDeveloper() {
  return (
    <div className="add-developer-to-team">
      <p> Add a developer to this team: </p>
      <div className="dev-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="developer email"
          // onChange={handleOnChange}
        />
        <button type="submit" className="search-btn">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
}

export function ProjectsAssignedToTeams({ projects }) {
  return (
    <div className="team-projects">
      <h2>Projects assigned to this team: </h2>
      <div className="team-projects-table">
        <table role="table" className="table">
          <thead>
            <tr role="row">
              <th colSpan="1" role="columnheader">
                Project Name
              </th>
              <th colSpan="1" role="columnheader">
                Description
              </th>
              <th colSpan="1" role="columnheader">
                Total tickets
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {projects?.map((p) => (
              <ProjectRow
                name={p.projectTitle}
                description={p.description}
                openTickets={p.tickets}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ProjectRow({ name, description, openTickets }) {
  return (
    <tr role="row" className="row">
      <td role="cell">{name}</td>
      <td role="cell">{description}</td>
      <td role="cell">{openTickets}</td>
    </tr>
  );
}
