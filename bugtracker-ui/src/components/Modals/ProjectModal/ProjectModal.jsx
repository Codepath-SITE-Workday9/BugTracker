import "./ProjectModal.css";
import AddTeamsDropdown from "../../Dropdown/AddTeamsDropdown/AddTeamsDropdown";
import apiClient from "../../../services/apiClient";
import { useState, useEffect } from "react";
import { useTeamContext } from "../../../contexts/team";
import { useProjectContext } from "../../../contexts/project";
import { useProjectForm } from "../../../hooks/useProjectForm";

export default function ProjectModal() {
  const { fetchProjects, setProjectModal } = useProjectContext();
  const { teams } = useTeamContext();

  const {
    projectName,
    setProjectName,
    teamsToAdd,
    setTeamsToAdd,
    projectDescription,
    setProjectDescription,
    errors,
    setErrors,
    handleOnCreateNewProjectSubmit,
  } = useProjectForm();

  return (
    <div className="project-modal-background">
      <div className="project-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p>CREATE A NEW PROJECT</p>
          <button
            className="close-modal-btn"
            onClick={() => setProjectModal(false)}
          >
            X
          </button>
        </div>

        {/* form area to create new team */}
        <div className="form">
          <div className="form-area">
            {/* todo: add errors here  */}
            {/* <p className="errors"> {errors.name} </p> */}

            {/* project name input area */}
            <AddName
              projectName={projectName}
              setProjectName={setProjectName}
            />

            {/* split input field to show both description and teams side by side */}
            <div className="split-input-fields">
              {/* description area */}
              <div className="description-area">
                <AddDescription
                  projectDescription={projectDescription}
                  setProjectDescription={setProjectDescription}
                />
              </div>

              {/* teams area  */}
              <div className="temas-area">
                <AddTeams teams={teams} setTeamsToAdd={setTeamsToAdd} />

                {/* conditionally display teams added to project, if there are any */}
                <div className="rows-container">
                  <div className="added-label">Teams added:</div>
                  {teamsToAdd.length > 0 ? (
                    teamsToAdd.map((t) => (
                      <>
                        <TeamRow
                          teamId={t}
                          teamsToAdd={teamsToAdd}
                          setTeamsToAdd={setTeamsToAdd}
                        />
                      </>
                    ))
                  ) : (
                    <div className="nothing-yet-label">No teams yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            <button className="cancel" onClick={() => setProjectModal(false)}>
              Cancel
            </button>
            <button className="submit" onClick={handleOnCreateNewProjectSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddName({ projectName, setProjectName }) {
  const handleOnNameChange = (event) => {
    setProjectName(event.target.value);
  };

  return (
    <div className="input-field">
      <div className="modal-input">
        <label htmlFor="name">Enter project name</label>
        <input
          className="form-input"
          name="name"
          type="text"
          value={projectName}
          onChange={handleOnNameChange}
          placeholder="project name"
        />
        {/* {errors.email && <p className="error">{errors.email}</p>} */}
      </div>
    </div>
  );
}

export function AddDescription({ projectDescription, setProjectDescription }) {
  const handleOnDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };
  return (
    <div className="input-field">
      <div className="modal-input">
        <label htmlFor="describe">Describe your project</label>
        <input
          className="form-input"
          name="describe"
          type="text"
          value={projectDescription}
          onChange={handleOnDescriptionChange}
          placeholder="describe your project "
          autoComplete="off"
        />
        {/* {errors.password && <p className="error">{errors.password}</p>} */}
      </div>
    </div>
  );
}

export function AddTeams({ teams, setTeamsToAdd }) {
  // teamSearch = team search term in input field
  const [teamSearch, setTeamSearch] = useState("");
  // teamsToShow = array of teams depending on teamSearch term, will start of with all teams
  const [teamsToShow, setTeamsToShow] = useState(teams);

  // handler function to update teamSearch and to update teamsToShow whenever the input field value changes
  const handleOnTeamChange = (event) => {
    setTeamSearch(event.target.value);
  };

  // useEffect hook to update teamsToShow whenever teamSearch changes
  useEffect(() => {
    setTeamsToShow(
      teams.filter((t) =>
        t.name.toLowerCase().includes(teamSearch.toLowerCase())
      )
    );
  }, [teamSearch]);

  // handler function to update the projects list when a user selects a project from the drop down list
  const handleOnTeamClick = (team) => {
    setTeamsToAdd((t) => [...t, team.id]);
    setTeamSearch("");
  };

  return (
    <div className="teams-search">
      <div className="modal-input">
        <label htmlFor="search">Assign teams to your project</label>
        <div className="drop-down-search-area">
          <div className="search-box">
            <input
              className="search-input"
              type="text"
              name="search"
              placeholder="search for teams"
              value={teamSearch}
              onChange={handleOnTeamChange}
              autoComplete="off"
            />
            <button className="search-btn">
              <i className="material-icons">search</i>
            </button>
          </div>
          {teamSearch && (
            <>
              <div className="drop-down-search-box">
                <AddTeamsDropdown
                  teams={teamsToShow}
                  onClick={handleOnTeamClick}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// indivual teamRow for each team that has been added to the teamsToAdd list
export function TeamRow({ teamId, teamsToAdd, setTeamsToAdd }) {
  //handler function to remove a project from the projectsToAdd list on the x button click
  const [team, setTeam] = useState();

  const handleOnRemoveTeam = () => {
    setTeamsToAdd(teamsToAdd.filter((t) => t != teamId));
  };

  const getTeamInfo = async () => {
    const { data, error } = await apiClient.fetchTeamById(teamId);
    if (data) {
      setTeam(data.team);
    }
  };

  useEffect(() => {
    getTeamInfo();
  }, [teamId]);

  return (
    <div className="added-row">
      <div className="added-row-text">{team?.name}</div>
      <button className="added-row-btn" onClick={handleOnRemoveTeam}>
        x
      </button>
    </div>
  );
}
