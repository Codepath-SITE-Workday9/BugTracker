import "./TeamModal.css";
import AddProjectsDropdown from "../../Dropdown/AddProjectsDropdown/AddProjectsDropdown";
import apiClient from "../../../services/apiClient";
import { useState, useEffect } from "react";
import { useProjectContext } from "../../../contexts/project";
import { useTeamContext } from "../../../contexts/team";
import { useAuthContext } from "../../../contexts/auth";
import { useTeamForm } from "../../../hooks/useTeamForm";

export default function TeamModal() {
  const { fetchTeams, setTeamModal } = useTeamContext();
  const { projects } = useProjectContext();

  const {
    name,
    setName,
    developers,
    setDevelopers,
    projectsToAdd,
    setProjectsToAdd,
    errors,
    setErrors,
    handleOnCreateNewTeamSubmit,
  } = useTeamForm();

  return (
    <div className="team-modal-background">
      <div className="team-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p>CREATE A NEW TEAM</p>
          <button
            className="close-modal-btn"
            onClick={() => setTeamModal(false)}
          >
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
                  developers={developers}
                  setDevelopers={setDevelopers}
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
                />

                {/* conditionally display projects added to team, if there are any */}
                <div className="rows-container">
                  <div className="added-label">Projects added:</div>
                  {projectsToAdd.length > 0 ? (
                    projectsToAdd.map((p) => (
                      <>
                        <ProjectRow
                          projectId={p}
                          projectsToAdd={projectsToAdd}
                          setProjectsToAdd={setProjectsToAdd}
                        />
                      </>
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
            <button className="cancel" onClick={() => setTeamModal(false)}>
              Cancel
            </button>
            <button className="submit" onClick={handleOnCreateNewTeamSubmit}>
              Submit
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

export function AddDevelopers({ setDevelopers, developers }) {
  const { user } = useAuthContext();
  const [developer, setDeveloper] = useState("");
  const [errors, setErrors] = useState("");
  const handleOnChange = (event) => {
    setDeveloper(event.target.value);
  };

  // handler function to attempt to add a developer to the list of developers to add to the team
  const handleOnDeveloperSubmit = async (dev) => {
    if (developer.indexOf("@") === -1) {
      setErrors("Please enter a valid email.");
    } else if (developers.indexOf(developer) >= 0 || developer == user.email) {
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
  // projectsToShow = array of projects depending on projectSearch term, will start of with all projects
  const [projectsToShow, setProjectsToShow] = useState(projects);
  const [errors, setErrors] = useState("");

  // handler function to update projectSearch and to update projectsToShow whenever the input field value changes
  const handleOnChange = (event) => {
    setProjectSearch(event.target.value);
  };

  // useEffect hook to update projectsToShow whenever projectSearch changes
  useEffect(() => {
    setProjectsToShow(
      projects.filter((p) =>
        p.name.toLowerCase().includes(projectSearch.toLowerCase())
      )
    );
  }, [projectSearch]);

  // handler function to update the projects list when a user selects a project from the drop down list
  const handleOnProjectClick = (proj) => {
    setProjectsToAdd((p) => [...p, proj.id]);
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
export function ProjectRow({ projectId, projectsToAdd, setProjectsToAdd }) {
  //handler function to remove a project from the projectsToAdd list on the x button click
  const [proj, setProj] = useState();

  const handleOnRemoveProject = () => {
    setProjectsToAdd(projectsToAdd.filter((p) => p != projectId));
  };

  const getProjectInfo = async () => {
    const { data, error } = await apiClient.fetchProjectById(projectId);
    if (data) {
      setProj(data.project);
    }
  };

  useEffect(() => {
    getProjectInfo();
  }, [projectId]);

  return (
    <div className="added-row">
      <div className="added-row-text">{proj?.name}</div>
      <button className="added-row-btn" onClick={handleOnRemoveProject}>
        x
      </button>
    </div>
  );
}
