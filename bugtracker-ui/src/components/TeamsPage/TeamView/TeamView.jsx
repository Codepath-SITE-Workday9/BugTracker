import "./TeamView.css";
import { useProjectContext } from "../../../contexts/project";
import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";

//Overview of a specific team
export default function TeamView({ setModal, currentTeam }) {
  const { projects } = useProjectContext();

  return (
    <div className="team-view">
      {/* header for a specific team and a button to create new team */}
      <div className="team-header">
        <h1> {currentTeam?.name} </h1>
        <button className="new-btn" onClick={() => setModal(true)}>
          New Team
        </button>
      </div>

      {/* an input field to add a developer to the team, and all developers listed in table form */}
      <div className="team-developers">
        <h2>Developers: </h2>
        <AddDeveloper currentTeam={currentTeam} />
        <DevelopersOnTeam devs={currentTeam?.members} />
      </div>
      <ProjectsAssignedToTeams projects={projects} />
    </div>
  );
}

export function AddDeveloper({ currentTeam }) {
  const [email, setEmail] = useState();
  const [error, setError] = useState("");
  const handleOnEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleOnAddNewMember = async () => {
    console.log("handleonAddNewMember: ", currentTeam.id, email);
    const { data, error } = await apiClient.addMemberToTeam({
      teamId: currentTeam.id,
      memberToAdd: email,
    });
    if (data) {
      setError("");
    } else if (error) {
      setError("No developer found with that email. Please try again!");
    }
  };
  return (
    <>
      <div className="add-developer-to-team">
        <p> Add a developer to this team: </p>
        <div className="dev-search">
          <input
            className="search-input"
            type="text"
            name="search"
            value={email}
            placeholder="developer email"
            onChange={handleOnEmailChange}
          />
          <button
            type="submit"
            className="search-btn"
            onClick={handleOnAddNewMember}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
      <p className="errors"> {error}</p>
    </>
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
            <DeveloperRow devId={dev} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DeveloperRow({ devId }) {
  const [member, setMember] = useState();
  const getMemberInfo = async () => {
    if (devId) {
      const { data, error } = await apiClient.fetchUserById(devId);
      if (data) {
        setMember(data.user);
      }
    }
  };

  useEffect(() => {
    getMemberInfo();
  }, [devId]);

  return (
    <tr role="row" className="row">
      <td role="cell">
        <div className="developer-cell">
          <span className="material-symbols-outlined">face</span>
          {member?.fullName}
        </div>
      </td>
      <td role="cell" className="role-cell">
        developer
      </td>
      <td role="cell" className="tickets-cell">
        {/* {numTickets} open ticket{numTickets == 1 ? "" : "s"} */}
      </td>
    </tr>
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
            {projects.length > 0 ? (
              <>
                {projects.map((p) => (
                  <ProjectRow
                    name={p.projectTitle}
                    description={p.description}
                    openTickets={p.tickets}
                  />
                ))}
              </>
            ) : (
              <div className="label-nothing-yet">Nothing here yet! </div>
            )}
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
