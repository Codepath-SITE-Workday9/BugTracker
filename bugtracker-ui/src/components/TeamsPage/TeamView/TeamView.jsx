import "./TeamView.css";
import TeamModal from "../TeamModal/TeamModal";
export default function TeamView({ setModal, currentTeam }) {
  var devs = [
    { name: "doris", numTickets: 3 },
    { name: "aaron", numTickets: 3 },
    { name: "katherin", numTickets: 2 },
  ];
  return (
    <div className="team-view">
      <div className="team-header">
        <h1> {currentTeam} </h1>
        <button className="new-team-btn" onClick={() => setModal(true)}>
          New Team
        </button>
      </div>

      <div className="team-developers">
        <h2>Developers on this team: </h2>
        <div className="developers-container">
          {devs.map((dev) => (
            <DeveloperRow name={dev.name} numTickets={dev.numTickets} />
          ))}
        </div>
        <div className="add-developer-to-team">
          <p> Add a developer to this team: </p>
          <div className="team-search">
            <input
              className="search-input"
              type="text"
              name="search"
              placeholder="developers email"
              // onChange={handleOnChange}
            />
            <i className="material-icons">search</i>
          </div>
        </div>
      </div>

      <div className="team-projects">
        <h2>Projects assigned to this team: </h2>
      </div>
    </div>
  );
}

export function DeveloperRow({ name, numTickets }) {
  return (
    <div className="developer-row">
      <p> {name}</p>
      <p>
        {numTickets} ticket{numTickets == 1 ? "" : "s"} assigned
      </p>
    </div>
  );
}

export function ProjectRow() {
  return (
    <div className="project-row">
      <p> Project </p>
      <p> assigned</p>
    </div>
  );
}
