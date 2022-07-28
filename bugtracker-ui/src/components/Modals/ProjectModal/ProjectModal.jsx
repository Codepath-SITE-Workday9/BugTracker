import "./ProjectModal.css";
import { useState } from "react";
import apiClient from "../../../services/apiClient";
import { useTeamContext } from "../../../contexts/team";
import { useProjectContext } from "../../../contexts/project";
import { useProjectForm } from "../../../hooks/useProjectForm";

export default function ProjectModal({ setModal }) {
  const { fetchProjects, setProjectModal, ProjectModal } = useProjectContext();
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
            <AddName
              projectName={projectName}
              setProjectName={setProjectName}
            />

            <div className="split-input-fields">
              <AddDescription
                projectDescription={projectDescription}
                setProjectDescription={setProjectDescription}
              />
              <AddTeams teams={teams} setTeamsToAdd={setTeamsToAdd} />
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
  const handleOnTeamChange = (event) => {
    setTeamSearch(event.target.value);
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
                <AddProjectsDropdown
                // teams={teamsToShow}
                // onClick={handleOnTeamClick}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
