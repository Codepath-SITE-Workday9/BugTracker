import "./TeamModal.css";
import { useState } from "react";
import apiClient from "../../../services/apiClient";

export default function TeamModal({ setModal }) {
  const [name, setName] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState("");

  const handleOnCreateNewTeamSubmit = async () => {
    // setIsLoading(true);
    // setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.createNewTeam({
      name: name,
      developers: developers,
      projects: projects,
    });
    if (data) {
      // if api request was successful:
      //    popup message "team successfully created"
      //    update teams in team overview
    }
    if (error) {
      // setErrors((e) => ({ ...e, form: error }));
    }
    // setIsLoading(false);
  };

  return (
    <div className="team-modal-background">
      <div className="team-modal-container">
        <div className="header">
          <p>CREATE A NEW TEAM</p>
          <button className="close-modal-btn" onClick={() => setModal(false)}>
            X
          </button>
        </div>

        <div className="form">
          <div className="form-area">
            <AddName name={name} setName={setName} />
            <div className="split-input-field">
              <div className="developer-area">
                <AddDevelopers
                  setDevelopers={setDevelopers}
                  developers={developers}
                />
                {developers?.map((d) => (
                  <DeveloperRow email={d} />
                ))}
              </div>
              <AddProjects setProjects={setProjects} projects={projects} />
            </div>
          </div>

          <div className="modal-buttons">
            <button className="cancel" onClick={() => setModal(false)}>
              Cancel
            </button>
            <button className="submit"> Submit </button>
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
        />
      </div>
    </div>
  );
}

export function AddDevelopers({ setDevelopers }) {
  const [developer, setDeveloper] = useState("");

  const handleOnChange = (event) => {
    setDeveloper(event.target.value);
  };

  // handler to submit developer
  const handleOnDeveloperSubmit = (dev) => {
    // if email is valid (has @ etc)
    //     if that developer exists on the backend
    //       if the developer exists
    //          add that email to the developers array in form
    //          clear submission box
    //      else the developer does not exist
    //          throw an error, developer does not exist
    // if email is not valid:
    //    throw invalid email error

    setDevelopers((d) => [...d, dev]);
    setDeveloper("");
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

export function DeveloperRow({ email }) {
  return (
    <div className="developer-row">
      <div>
        <div> {email}</div>
      </div>
    </div>
  );
}

export function AddProjects({ projets, setProjects }) {
  const [project, setProject] = useState("");

  const handleOnProjectSubmit = (event) => {};

  return (
    <div className="teams-form-search">
      <label htmlFor="search"> Assign projects to this team </label>
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search for projects"
          //   onChange={handleOnChange}
        />
        <button className="search-btn">
          <i className="material-icons">search</i>
        </button>
      </div>
    </div>
  );
}

export function ProjectRow() {
  return (
    <div className="project-row">
      <div>
        <div></div>
      </div>
    </div>
  );
}
