import "./TeamView.css";
import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";
import { useTeamContext } from "../../../contexts/team";
import { TeamsPageDevelopersTable } from "../../Tables/TeamsPageDevelopersTable";
import { TeamsPageProjectsTable } from "../../Tables/TeamsPageProjectsTable";
import { useProjectContext } from "../../../contexts/project";

//Overview of a specific team
export default function TeamView({ currentTeam, teamsAvailable }) {
  const { setTeamModal, getMemberArray } = useTeamContext();
  const { projects } = useProjectContext();
  return (
    <div className="team-view">
      {/* header for a specific team and a button to create new team */}
      <div className="team-header">
        <h1> {teamsAvailable && currentTeam?.name} </h1>
        <button className="new-btn" onClick={() => setTeamModal(true)}>
          Create New Team
        </button>
      </div>

      {/* Conditionally render the specific team's information, or display "Nothing yet" if no teams have been created */}
      {teamsAvailable ? (
        currentTeam && (
          <>
            {/* an input field to add a developer to the team, and all developers listed in table form */}
            <div className="team-developers">
              <AddDeveloper currentTeam={currentTeam} />
              <div className="table">
                <TeamsPageDevelopersTable
                  currentTeam={currentTeam}
                  className="dev-table"
                />
              </div>
            </div>
            <div className="project-developers">
              <div className="table">
                <TeamsPageProjectsTable projects={projects} />
              </div>
            </div>
          </>
        )
      ) : (
        <>
          <div className="nothing-created-yet">
            <h1>You have not created any teams yet!</h1>
            <h2>
              {" "}
              Start by clicking the Create New Team button to get started.
            </h2>{" "}
          </div>
        </>
      )}
    </div>
  );
}

export function AddDeveloper({ currentTeam }) {
  const [email, setEmail] = useState();
  const [error, setError] = useState("");

  // handler to update the email to add
  const handleOnEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // handler function to add a new member to an existsing team
  const handleOnAddNewMember = async () => {
    const { data, error } = await apiClient.addMemberToTeam({
      teamId: currentTeam.id,
      memberToAdd: email,
    });

    // if request to add a new member was successful, clear errors and clear the email, else output the error
    if (data) {
      setError("");
      setEmail("");
    } else if (error) {
      setError("No developer found with that email. Please try again!");
    }
  };

  return (
    <>
      {/* search input to add a develoepr to team */}
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
      {/* display any errors */}
      <p className="errors"> {error}</p>
    </>
  );
}
