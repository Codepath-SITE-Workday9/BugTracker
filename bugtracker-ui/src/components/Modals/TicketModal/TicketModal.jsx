import { useState, useEffect } from "react";
import { useTicketContext } from "../../../contexts/ticket";
import { useTicketForm } from "../../../hooks/useTicketForm";
import AddDevelopersDropdown from "../../Dropdown/AddDevelopersDropdown/AddDevelopersDropdown";
import "./TicketModal.css";

export default function TicketModal() {
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
  } = useTicketForm();
  const {
    setTicketModal,
    editing,
    setEditing,
    ticketToEdit,
    currentTicket,
    setTicketToEdit,
  } = useTicketContext();

  useEffect(() => {
    if (ticketToEdit) {
      setComplexity(ticketToEdit.complexity);
      setStatus(ticketToEdit.status);
      setPriority(ticketToEdit.priority);
      setTitle(ticketToEdit.title);
      setDescription(ticketToEdit.description);
      setCategory(ticketToEdit.category);

      // setDevelopersToAdd(ticketToEdit.developers);
    }
  }, []);

  return (
    <div className="ticket-modal-background">
      <div className="ticket-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p>CREATE A NEW TICKET</p>
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
            <p className="errors"> {errors} </p>
            <div className="split-input-fields">
              <div className="column">
                <AddTitle title={title} setTitle={setTitle} />
                <AddDescription
                  description={description}
                  setDescription={setDescription}
                />
              </div>

              <div className="column">
                <AddDevelopers
                  developers={["user1", "user2", "user3"]}
                  setDevelopersToAdd={setDevelopersToAdd}
                />
                <AddComplexity
                  setComplexity={setComplexity}
                  complexity={complexity}
                />
                <AddStatus setStatus={setStatus} status={status} />
                <AddPriority setPriority={setPriority} priority={priority} />
                <AddCategory setCategory={setCategory} category={category} />
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
              {editing ? "Confirm edits" : "Submit"}
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
    <div className="teams-form-search">
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

export function AddDescription({ description, setDescription }) {
  const handleOnDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  return (
    <div className="projects-form-search">
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
        {/* {errors.password && <p className="error">{errors.password}</p>} */}
      </div>
    </div>
  );
}

// component to assign developers to the ticket
export function AddDevelopers({ developers, setDevelopersToAdd }) {
  // developerSearch = developer search term in input field
  const [developerSearch, setDeveloperSearch] = useState("");
  // projectsToShow = array of projects depending on projectSearch term, will start of with all projects
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
  //   useEffect(() => {
  //     setDevelopersToShow(
  //       developers.filter((d) =>
  //         d.name.toLowerCase().includes(developerSearch.toLowerCase())
  //       )
  //     );
  //   }, [developerSearch]);

  // handler function to update the projects list when a user selects a project from the drop down list
  const handleOnDeveloperClick = (dev) => {
    setDevelopersToAdd((p) => [...p, dev.id]);
    setDeveloperSearch("");
    setFocused(false);
  };

  return (
    <div className="teams-form-search">
      <div className="developers-area">
        <p className="errors"> {errors}</p>

        <label htmlFor="search"> Assign developers to this ticket </label>
        <div className="drop-down-search-area">
          <div className="search-box">
            <input
              className="search-input"
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
          {/* conditionally display dropdown if the input field has been clicked on/user has searched for  project*/}
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
      <label htmlFor="status">Choose the category:</label>
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