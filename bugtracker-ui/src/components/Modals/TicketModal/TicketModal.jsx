import "./TicketModal.css";
import { useState, useEffect } from "react";
import { useTicketContext } from "../../../contexts/ticket";
import { useTicketForm } from "../../../hooks/useTicketForm";
import AddDevelopersDropdown from "../../Dropdown/AddDevelopersDropdown/AddDevelopersDropdown";
import { useAuthContext } from "../../../contexts/auth";
import { useProjectContext } from "../../../contexts/project";
import apiClient from "../../../services/apiClient";
export default function TicketModal({
  availableMembers,
  currentProject,
  handleOnProjectChange,
}) {
  const {
    handleOnCreateNewTicketSubmit,
    title,
    setTitle,
    description,
    setDescription,
    developersToAdd,
    setDevelopersToAdd,
    complexity,
    setComplexity,
    status,
    setStatus,
    priority,
    setPriority,
    errors,
    setErrors,
    category,
    setCategory,
    selectedProject,
    setSelectedProject,
  } = useTicketForm();

  const {
    setTicketModal,
    editing,
    setEditing,
    ticketToEdit,
    currentTicket,
    setTicketToEdit,
  } = useTicketContext();

  const { user } = useAuthContext();
  const { projects } = useProjectContext();

  const getProjectName = async (projId) => {
    const { data, error } = await apiClient.fetchProjectById(projId);
    if (data) {
      setSelectedProject(data.project.id);
    }
  };

  const getDevelopersArray = async (developers) => {
    setDevelopersToAdd([]);
    developers.map((d) => {
      appendMembersToArray(d);
    });
  };

  const appendMembersToArray = async (teamId) => {
    const { data, error } = await apiClient.fetchUserById(teamId);
    if (data) {
      setDevelopersToAdd((prev) => [...prev, data.user.email]);
    }
  };

  // useEffect hook to set ticket's information based on if a user has clicked on edit or create a new ticket
  useEffect(() => {
    if (editing && Object.keys(ticketToEdit).length != 0) {
      //if a user is editing a ticket, prepopulte the form with the specificed ticket's information
      setComplexity(ticketToEdit.complexity);
      setStatus(ticketToEdit.status);
      setPriority(ticketToEdit.priority);
      setTitle(ticketToEdit.title);
      setDescription(ticketToEdit.description);
      setCategory(ticketToEdit.category);
      getDevelopersArray(ticketToEdit.developers);
      setSelectedProject(ticketToEdit.project_id);
      // const {data, error } = await apiClient.fetchProjectById(ticketToEdit.project_id)

      // setSelectedProject(variable)
    } else {
      // if  user is creating a ticket, set the form values to a default value
      setTitle("");
      setDescription("");
      setDevelopersToAdd([user.email]);
      setComplexity("1");
      setStatus("unassigned");
      setPriority("low");
      setCategory("bug");
      // if the current project is "all projects", set selectedProject to 1st in projects list,
      // else set selectedProject to the currentProject's id.
      if (currentProject < 0 && projects.length > 0) {
        setSelectedProject(projects[0].id);
      } else if (currentProject > 0) {
        setSelectedProject(currentProject);
      }
    }
  }, []);

  return (
    <div className="ticket-modal-background">
      <div className="ticket-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p> {editing ? "EDITING TICKET" : "CREATE A NEW TICKET"}</p>
          <button
            className="close-modal-btn"
            onClick={() => {
              setTicketModal(false);
              setEditing(false);
              setTicketToEdit({});
            }}
          >
            X
          </button>
        </div>

        {/* form area to create new ticket */}
        <div className="form">
          <div className="form-area">
            <div className="top-row">
              <AddTitle title={title} setTitle={setTitle} />
              <SelectProject
                handleOnProjectChange={handleOnProjectChange}
                currentProject={currentProject}
                projects={projects}
              />
            </div>
            <div className="split-input-fields">
              <div className="ticket-row">
                <AddDescription
                  description={description}
                  setDescription={setDescription}
                />
                {/* developer area */}
                <div className="developer-area">
                  <AddDevelopers
                    developers={availableMembers}
                    setDevelopersToAdd={setDevelopersToAdd}
                  />

                  {/* conditionally display the developers added to new ticket, if there are any */}
                  <div className="rows-container">
                    <div className="added-label">Developers added:</div>
                    {developersToAdd?.length > 0 ? (
                      developersToAdd.map((d) => (
                        <DeveloperRow
                          email={d}
                          developersToAdd={developersToAdd}
                          setDevelopersToAdd={setDevelopersToAdd}
                          // key={d.id}
                        />
                      ))
                    ) : (
                      <div className="nothing-yet-label">No developers yet</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="ticket-row">
                <div className="ticket-dropdowns">
                  <div className="column">
                    <AddComplexity
                      setComplexity={setComplexity}
                      complexity={complexity}
                    />
                    <AddStatus setStatus={setStatus} status={status} />
                  </div>
                  <div className="column">
                    <AddPriority
                      setPriority={setPriority}
                      priority={priority}
                    />
                    <AddCategory
                      setCategory={setCategory}
                      category={category}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* cancel and submit buttons */}
          <div className="modal-buttons">
            <button
              className="cancel"
              onClick={() => {
                setTicketToEdit({});
                setEditing(false);
                setTicketModal(false);
              }}
            >
              Cancel
            </button>
            <button className="submit" onClick={handleOnCreateNewTicketSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddTitle({ title, setTitle }) {
  const handleOnNameChange = (event) => {
    setTitle(event.target.value);
  };

  //search input for name
  return (
    <div className="tickets-form-search">
      <label htmlFor="title">Enter ticket title</label>
      <div className="search-box">
        <input
          className="search-input"
          name="title"
          type="text"
          value={title}
          onChange={handleOnNameChange}
          placeholder="ticket title"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export function SelectProject({
  handleOnProjectChange,
  currentProject,
  projects,
}) {
  return (
    <div className="select-project">
      {/* sort by component to sort the ticket results */}
      <div className="sort-by">
        <label className="select-project-label">
          Creating ticket for project:
        </label>
        <div className="sort-by-dropdown">
          <select
            name="selectList"
            id="selectList"
            onChange={handleOnProjectChange}
            value={currentProject}
            className="project-dropdown"
          >
            {projects?.map((c) => (
              <option value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>{" "}
      </div>
    </div>
  );
}

export function AddDescription({ description, setDescription }) {
  const handleOnDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  return (
    <div className="tickets-form-search">
      <label htmlFor="describe">Describe the ticket</label>
      <div className="search-box">
        <textarea
          className="search-input description"
          name="describe"
          type="text"
          value={description}
          onChange={handleOnDescriptionChange}
          placeholder="describe the ticket"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

// component to assign developers to the ticket
export function AddDevelopers({ developers, setDevelopersToAdd }) {
  // developerSearch = developer search term in input field
  const [developerSearch, setDeveloperSearch] = useState("");
  // ticketsToShow = array of projects depending on projectSearch term, will start of with all projects
  const [developersToShow, setDevelopersToShow] = useState(developers);
  const [errors, setErrors] = useState("");

  // focused will be true if the developer search input field is clicked on, and false when a user clicks off of the input field
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  // handler function to update developerSearch and to update developersToShow whenever the input field value changes
  const handleOnChange = (event) => {
    setDeveloperSearch(event.target.value);
  };

  // useEffect hook to update developersToShow whenever developerSearch changes
  useEffect(() => {
    setDevelopersToShow(
      developers?.filter((d) =>
        d.toLowerCase().includes(developerSearch.toLowerCase())
      )
    );
  }, [developerSearch]);

  // handler function to update the developers list when a user selects a developer from the drop down list
  const handleOnDeveloperClick = (dev) => {
    setDevelopersToAdd((p) => [...p, dev]);
    setDeveloperSearch("");
    setFocused(false);
  };

  return (
    <div className="tickets-form-search">
      <div className="developers-area">
        <label htmlFor="search"> Assign developers to this ticket </label>

        <div className="drop-down-search-area">
          <div className="search-box">
            <input
              className="search-input ticket-developer"
              type="text"
              name="search"
              placeholder="search for developers"
              value={developerSearch}
              onChange={handleOnChange}
              autoComplete="off"
              onFocus={onFocus}
              // onBlur={onBlur}  NOTE: using onBlur prevents the drop down from having click ability.
            />
            <button className="search-btn">
              <i className="material-icons">search</i>
            </button>
          </div>
          {/* conditionally display dropdown if the input field has been clicked on/user has searched for  developer*/}
          {developerSearch || focused ? (
            <>
              <div className="drop-down-search-box">
                <AddDevelopersDropdown
                  developers={developersToShow}
                  onClick={handleOnDeveloperClick}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
// individual row for each developer that has been added to the ticket that is being created
export function DeveloperRow({ email, developersToAdd, setDevelopersToAdd }) {
  // handler function to remove a developer from the developers list
  const handleOnRemoveDeveloper = () => {
    setDevelopersToAdd(developersToAdd.filter((d) => d != email));
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

// indivual projectRow for each project that has been added to the projectsToAdd list
export function ProjectRow({ projectId, projectsToAdd, setProjectsToAdd }) {
  //handler function to remove a project from the projectsToAdd list on the x button click
  const [proj, setProj] = useState();

  const handleOnRemoveProject = () => {
    setProjectsToAdd(projectsToAdd.filter((p) => p != projectId));
  };

  const getProjectInfo = async () => {
    const { data, error } = await apiClient.fetch(projectId);
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

export function AddComplexity({ setComplexity, complexity }) {
  const handleOnChange = (event) => {
    setComplexity(event.target.value);
  };
  return (
    <div className="add-complexity">
      <label htmlFor="status">Choose the complexity:</label>
      <select
        name="complexity"
        id="complexity"
        onChange={handleOnChange}
        value={complexity}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}

export function AddPriority({ setPriority, priority }) {
  const handleOnChange = (event) => {
    setPriority(event.target.value);
  };
  return (
    <div className="add-priority">
      <label htmlFor="status">Choose the priority:</label>
      <select
        name="priority"
        id="priority"
        onChange={handleOnChange}
        value={priority}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </div>
  );
}

export function AddStatus({ setStatus, status }) {
  const handleOnChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div className="add-status">
      <label htmlFor="status">Choose the status:</label>
      <select
        name="status"
        id="status"
        onChange={handleOnChange}
        value={status}
      >
        <option value="unassigned">Unassigned</option>
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="submitted">Submitted</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );
}

export function AddCategory({ setCategory, category }) {
  const handleOnChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div className="add-category">
      <label htmlFor="category">Choose the category:</label>
      <select
        name="category"
        id="category"
        onChange={handleOnChange}
        value={category}
      >
        <option value="bug">Bug</option>
        <option value="new feature">New Feature</option>
      </select>
    </div>
  );
}
