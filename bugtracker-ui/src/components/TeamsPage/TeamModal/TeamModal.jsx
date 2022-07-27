import "./TeamModal.css";
import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { useProjectContext } from "../../../contexts/project";
import AddProjectsDropdown from "../../Dropdown/AddProjectsDropdown/AddProjectsDropdown";
import { useTeamContext } from "../../../contexts/team";
import { useAuthContext } from "../../../contexts/auth";

export default function TeamModal({ setModal }) {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [projectsToAdd, setProjectsToAdd] = useState([]);
  const [errors, setErrors] = useState("");

  const { projects } = useProjectContext();
  const { fetchTeams } = useTeamContext();

  const handleOnCreateNewTeamSubmit = async () => {
    // before sending request to create a new team, verify name field is not empty
    if (name == "") {
      setErrors("Please name your team before submitting!");
    } else {
      // if name field was not empty: send request to create a new team
      const { data, error } = await apiClient.createNewTeam({
        name: name,
        members: [...developers, user.email],
        projects: projectsToAdd,
      });

      // if api request to create a new team was succesful: fetchTeams to get updated list of teams, clear all input fields, and setModal to false to exit modal
      if (data) {
        // TODO: popup message "team successfully created"
        fetchTeams();
        setName("");
        setDevelopers([]);
        setProjectsToAdd([]);
        setModal(false);
      } else if (error) {
        setErrors("Something went wrong! Try again.");
      }
    }
  };

  return (
    <div className="team-modal-background">
      <div className="team-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p>CREATE A NEW TEAM</p>
          <button className="close-modal-btn" onClick={() => setModal(false)}>
            X
          </button>
        </div>

        {/* form area to create new team */}
        <div className="form">
          <div className="form-area">
            <p className="errors"> {errors} </p>
            {/* team name input area */}
            <AddName name={name} setName={setName} />

            {/* split input field to show both developers and projects side by side */}
            <div className="split-input-field">
              {/* developer area */}
              <div className="developer-area">
                <AddDevelopers
                  setDevelopers={setDevelopers}
                  developers={developers}
                  userEmail={user.email}
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
                        key={d.id}
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
            <button className="cancel" onClick={() => setModal(false)}>
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

  //search input for name
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

export function AddDevelopers({ setDevelopers, developers, userEmail }) {
  const [developer, setDeveloper] = useState("");
  const [errors, setErrors] = useState("");
  const handleOnChange = (event) => {
    setDeveloper(event.target.value);
  };

  // handler function to attempt to add a developer to the list of developers to add to the team
  const handleOnDeveloperSubmit = async (dev) => {
    if (developer.indexOf("@") === -1) {
      setErrors("Please enter a valid email.");
    } else if (developers.indexOf(developer) >= 0 || developer == userEmail) {
      // if user has already been added, or a user is trying to add their own email, display error
      setErrors("User already added!");
    } else {
      setErrors("");
      // display Not found error if user cannot be found with the email provided
      const { data, error } = await apiClient.checkValidEmail(dev);
      if (data) {
        setDevelopers((d) => [...d, dev]);
        setDeveloper("");
      } else if (error) {
        setErrors("No user found with that email!");
      }
    }
  };

  return (
    <div className="teams-form-search">
      <p className="errors"> {errors}</p>
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
    </div>
  );
}

// individual row for each developer that has been added to the team that is being created
export function DeveloperRow({ email, developers, setDevelopers }) {
  // handler function to remove a developer from the developers list
  const handleOnRemoveDeveloper = () => {
    setDevelopers(developers.filter((d) => d != email));
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

// component to add projects to the team
export function AddProjects({ projects, setProjectsToAdd }) {
  // projectSearch = project search term in input field
  const [projectSearch, setProjectSearch] = useState("");
  // projectsToShow = array of list of projects depending on projectSearch term, will start of with all projects
  const [projectsToShow, setProjectsToShow] = useState(projects);
  const [errors, setErrors] = useState("");

  // handler function to update projectSearch and to update projectsToShow whenever the input field value changes
  const handleOnChange = (event) => {
    setProjectSearch(event.target.value);
    setProjectsToShow(
      projects.filter((p) =>
        p.projectTitle.toLowerCase().includes(projectSearch.toLowerCase())
      )
    );
  };

  // hndler function to update the projects list when a user selects a project from the drop down list
  const handleOnProjectClick = (proj) => {
    setProjectsToAdd((p) => [...p, proj.projectTitle]);
    setProjectSearch("");
  };

  return (
    <div className="teams-form-search">
      <div className="projects-area">
        <p className="errors"> {errors}</p>

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
          {/* conditionally display dropdown if projectSearch is not empty */}
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

// indivual projectRow for each project that has been added to the projectsToAdd list
export function ProjectRow({ name, projectsToAdd, setProjectsToAdd }) {
  //handler function to remove a project from the projectsToAdd list on the x button click
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
