import "./ProjectModal.css";
import { useState } from "react";
import apiClient from "../../../services/apiClient";
import { useTeamContext } from "../../../contexts/team";
import { useProjectContext } from "../../../contexts/project";

export default function ProjectModal({ setModal }) {
  const [projectName, setProjectName] = useState("");
  const [teamsToAdd, setTeamsToAdd] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    team: "",
  });

  const { fetchProjects } = useProjectContext();
  const { teams } = useTeamContext();

  const handleOnCreateNewProjectSubmit = async () => {
    //before sending request to create new project, verify name and description fields are not empty, and at least one team has been assigned.

    if (projectName == "") {
      setErrors((e) => ({
        ...e,
        name: "Please name your project",
      }));
    }
    if (projectDescription == "") {
      setErrors((e) => ({
        ...e,
        description: "Please add description to your project",
      }));
    }
    if (teamsToAdd.length == 0) {
      setErrors((e) => ({
        ...e,
        team: "Plese assign at least one team to your project",
      }));
    }

    //only if there are no errors, send request to create new project
    if (errors.name == "" && errors.description == "" && errors.team == "") {
      const { data, error } = await apiClient.createNewProject({
        name: projectName,
        description: projectDescription,
        teams: teamsToAdd,
      });

      // if api request to create a new project was successful: fetchProjects to get updated list of projects, clear all input fields, and setModal to false to exit modal
      if (data) {
        // TODO: popup message "team successfully created"
        fetchProjects();
        setProjectName("");
        setProjectDescription("");
        setTeamsToAdd([]);
        setModal(false);
      } else if (error) {
        setErrors("Something went wrong! Try again.");
      }
    }
  };

  return (
    <div className="project-modal-background">
      <div className="project-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p>CREATE A NEW PROJECT</p>
          <button className="close-modal-btn" onClick={() => setModal(false)}>
            X
          </button>
        </div>

        {/* form area to create new team */}
        <div className="content">
          <div className="form-container">
            <ProjectModalForm setModal={setModal} />
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

export function ProjectModalForm({ setModal }) {
  return (
    <div className="form">
      <div className="input-field">
        <div className="modal-input">
          <label htmlFor="name">Enter project name</label>
          <input
            className="form-input"
            name="name"
            type="text"
            //   value={form.email}
            //   onChange={handleOnInputChange}
            placeholder="project name"
          />
          {/* {errors.email && <p className="error">{errors.email}</p>} */}
        </div>
      </div>

      <div className="split-input-fields">
        <div className="input-field">
          <div className="modal-input">
            <label htmlFor="describe">Describe your project</label>
            <input
              className="form-input"
              name="describe"
              type="text"
              //   value={form.password}
              //   onChange={handleOnInputChange}
              placeholder="describe your project "
            />
            {/* {errors.password && <p className="error">{errors.password}</p>} */}
          </div>
        </div>
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
                  onChange={handleOnChange}
                  autoComplete="off"
                />
                <button className="search-btn">
                  <i className="material-icons">search</i>
                </button>
              </div>
              {teamsSearch && (
                <>
                  <div className="drop-down-search-box">
                    <AddProjectsDropdown
                      teams={teamsToShow}
                      onClick={handleOnTeamClick}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
