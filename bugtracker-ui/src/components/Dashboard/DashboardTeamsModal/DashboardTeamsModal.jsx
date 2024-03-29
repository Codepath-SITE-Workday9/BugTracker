import "./DashboardTeamsModal.css";
import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { useProjectContext } from "../../../contexts/project";
import AddProjectsDropdown from "../../Dropdown/AddProjectsDropdown/AddProjectsDropdown";

export default function TeamModal({ setDashboardTeamsModal }) {
  const [name, setName] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [projectsToAdd, setProjectsToAdd] = useState([]);
  const [errors, setErrors] = useState("");

  const { projects } = useProjectContext();

  const handleOnCreateNewTeamSubmit = async () => {
    setName("");
    setDevelopers([]);
    setProjectsToAdd([]);
    setDashboardTeamsModal(false);
  };

  return (
    <div className="team-modal-background">
      <div className="team-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p>CREATE A NEW TEAM</p>
          <button
            className="close-modal-btn"
            onClick={() => setDashboardTeamsModal(false)}
          >
            X
          </button>
        </div>

        {/* form area to create new team */}
        <div className="form">
          <div className="form-area">
            {/* team name input area */}
            <AddName name={name} setName={setName} />

            {/* split input field to show both developers and projects side by side */}
            <div className="split-input-field">
              {/* developer area */}
              <div className="developer-area">
                <AddDevelopers
                  setDevelopers={setDevelopers}
                  developers={developers}
                />

                {/* conditionally display the developers added to new team, if there are any */}
                <div className="rows-container">
                  <div className="added-label">Developers added:</div>
                  {developers.length > 0 ? (
                    developers.map((d) => (
                      <DeveloperRow
                        email={d}
                        developers={developers}
                        setDevelopers={setDevelopers}
                      />
                    ))
                  ) : (
                    <div className="nothing-yet-label">No developers yet</div>
                  )}
                </div>
              </div>

              {/* projects area  */}
              <div className="projects-area">
                <AddProjects
                  setProjectsToAdd={setProjectsToAdd}
                  projects={projects}
                />{" "}
                {/* conditionally display projects added to team, if there are any */}
                <div className="rows-container">
                  <div className="added-label">Projects added:</div>
                  {projectsToAdd.length > 0 ? (
                    projectsToAdd.map((p) => (
                      <ProjectRow
                        name={p}
                        projectsToAdd={projectsToAdd}
                        setProjectsToAdd={setProjectsToAdd}
                      />
                    ))
                  ) : (
                    <div className="nothing-yet-label">No projects yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* cancel and submit buttons */}
          <div className="modal-buttons">
            <button
              className="cancel"
              onClick={() => setDashboardTeamsModal(false)}
            >
              Cancel
            </button>
            <button className="submit" onClick={handleOnCreateNewTeamSubmit}>
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddName({ name, setName }) {
  const handleOnNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="teams-form-search">
      <label htmlFor="name">Enter team name</label>
      <div className="search-box">
        <input
          className="search-input"
          name="name"
          type="text"
          value={name}
          onChange={handleOnNameChange}
          placeholder="team name"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export function AddDevelopers({ setDevelopers }) {
  const [developer, setDeveloper] = useState("");
  const [errors, setErrors] = useState("");
  const handleOnChange = (event) => {
    setDeveloper(event.target.value);
  };

  // handler to submit developer
  const handleOnDeveloperSubmit = (dev) => {
    if (developer.indexOf("@") === -1) {
      setErrors("Please enter a valid email.");
    } else {
      setErrors("");
      setDevelopers((d) => [...d, dev]);
      setDeveloper("");
    }
    //     if that developer exists on the backend
    //       if the developer exists
    //          add that email to the developers array in form
    //          clear submission box
    //      else the developer does not exist
    //          throw an error, developer does not exist
    // if email is not valid:
    //    throw invalid email error
  };

  return (
    <div className="teams-form-search">
      <label htmlFor="search">Add developers by email </label>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          name="search"
          value={developer}
          placeholder="search for developers"
          onChange={handleOnChange}
          autoComplete="off"
        />
        <button
          className="search-btn"
          onClick={() => handleOnDeveloperSubmit(developer)}
        >
          <i className="material-icons">{developer == "" ? "search" : "add"}</i>
        </button>
      </div>
      {errors ? <p className="errors"> {errors} </p> : ""}
    </div>
  );
}

export function DeveloperRow({ email, developers, setDevelopers }) {
  const handleOnRemoveDeveloper = () => {
    const newArr = developers.filter((d) => d != email);
    setDevelopers(newArr);
  };
  return (
    <div className="added-row">
      <div className="added-row-email">{email}</div>
      <button className="added-row-btn" onClick={handleOnRemoveDeveloper}>
        x
      </button>
    </div>
  );
}

export function AddProjects({ projects, setProjectsToAdd }) {
  const [projectSearch, setProjectSearch] = useState("");
  const [projectsToShow, setProjectsToShow] = useState(projects);

  const handleOnChange = (event) => {
    setProjectSearch(event.target.value);
    setProjectsToShow(
      projects.filter((p) =>
        p.projectTitle.toLowerCase().includes(projectSearch.toLowerCase())
      )
    );
  };

  const handleOnProjectClick = (proj) => {
    setProjectsToAdd((p) => [...p, proj.projectTitle]);
    setProjectSearch("");
  };

  return (
    <div className="teams-form-search">
      <div className="projects-area">
        <label htmlFor="search"> Assign projects to this team </label>
        <div className="drop-down-search-area">
          <div className="search-box">
            <input
              className="search-input"
              type="text"
              name="search"
              placeholder="search for projects"
              value={projectSearch}
              onChange={handleOnChange}
              autoComplete="off"
            />
            <button className="search-btn">
              <i className="material-icons">search</i>
            </button>
          </div>
          {projectSearch && (
            <>
              <div className="drop-down-search-box">
                <AddProjectsDropdown
                  projects={projectsToShow}
                  onClick={handleOnProjectClick}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectRow({ name, projectsToAdd, setProjectsToAdd }) {
  const handleOnRemoveProject = () => {
    const newArr = projectsToAdd.filter((p) => p != name);
    setProjectsToAdd(newArr);
  };
  return (
    <div className="added-row">
      <div className="added-row-text">{name}</div>
      <button className="added-row-btn" onClick={handleOnRemoveProject}>
        x
      </button>
    </div>
  );
}
