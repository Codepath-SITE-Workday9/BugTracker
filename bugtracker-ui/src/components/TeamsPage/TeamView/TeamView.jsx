import "./TeamView.css";
import { useProjectContext } from "../../../contexts/project";

export default function TeamView({ setModal, currentTeam }) {
  const { projects } = useProjectContext();
  console.log(projects);
  var devs = [
    { name: "doris", numTickets: 3 },
    { name: "aaron", numTickets: 3 },
    { name: "katherin", numTickets: 2 },
  ];

  return (
    <div className="team-view">
      <div className="team-header">
        <h1> {currentTeam} </h1>
        <button className="new-btn" onClick={() => setModal(true)}>
          New Team
        </button>
      </div>

      <DevelopersOnTeam devs={devs} />

      <AddDeveloperToRow />

      <ProjectsAssignedToTeams projects={projects} />
    </div>
  );
}

export function DevelopersOnTeam({ devs }) {
  return (
    <div className="team-developers">
      <h2>Developers on this team: </h2>

      <div className="developers-table">
        <table role="table" className="table">
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
                role="developer"
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DeveloperRow({ name, numTickets, role }) {
  return (
    <tr role="row" className="row">
      <td role="cell">
        <span class="material-symbols-outlined">face</span>
        {name}
      </td>
      <td role="cell">{role}</td>
      <td role="cell">{numTickets}</td>
    </tr>
  );
}

export function AddDeveloperToRow() {
  return (
    <div className="add-developer-to-team">
      <p> Add a developer to this team: </p>
      <div className="dev-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="developers email"
          // onChange={handleOnChange}
        />
        <button className="search-btn">
          <i className="material-icons">search</i>
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
                Number of open tickets
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
