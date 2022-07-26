import "./TeamView.css";
import { useProjectContext } from "../../../contexts/project";
import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";

//Overview of a specific team
export default function TeamView({ setModal, currentTeam }) {
  const { projects } = useProjectContext();

  return (
    <div className="team-view">
      <div className="team-header">
        <h1> {currentTeam.name} </h1>
        <button className="new-btn" onClick={() => setModal(true)}>
          New Team
        </button>
      </div>

      <div className="team-developers">
        <h2>Developers on this team: </h2>
        <DevelopersOnTeam devs={currentTeam.members} />
        <AddDeveloper currentTeam={currentTeam} />{" "}
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
    return "error";
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

export function AddDeveloper({ currentTeam }) {
  const [email, setEmail] = useState();
  const handleOnEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleOnAddNewMember = async () => {
    await apiClient.addMemberToTeam({
      teamId: currentTeam.id,
      memberToAdd: email,
    });
  };
  return (
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
