import "./TicketsOverview.css";
import { useState } from "react";
import TicketCard from "../TicketCard/TicketCard";
import { useTicketContext } from "../../../contexts/ticket";
import { useProjectContext } from "../../../contexts/project";

// overview of all Tickets a user is apart of
export default function TicketsOverview({
  handleOnTicketClick,
  isLoading,
  selectedProject,
  handleOnProjectChange,
}) {
  // ticket search term
  const [searchTerm, setSearchTerm] = useState("");
  // modal variable to display modal
  const {
    setTicketModal,
    selectedProjectTickets,
    selectedPriority,
    setSelectedPriority,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    myTicketsOnly,
    setMyTicketsOnly,
    showResolvedTickets,
    setShowResolvedTickets,
  } = useTicketContext();

  // all projects a user is apart of
  const { projects } = useProjectContext();
  // the projects dropown categories
  const projectCategories = [{ name: "All projects", id: -1 }];

  // map through the projects to add each project's name and id as an object to the dropdown category.
  projects.map((p) => {
    let projObj = { name: p.name, id: p.id };
    projectCategories.push(projObj);
  });

  // handler function to set ticket search term as a user types
  const handleOnSearchChange = (change) => {
    setSearchTerm(change.target.value);
  };

  // handler function to clear search term if close button is clicked
  const handleOnClickSearchBtn = () => {
    setSearchTerm("");
  };

  // update ticketsToShow array depending on searchTerm
  let ticketsToShow = [];
  if (selectedProjectTickets) {
    ticketsToShow = selectedProjectTickets.filter((t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="tickets-overview">
      {/* tickets overview header  */}
      <div className="header">
        <h1>Tickets</h1>
        <button className="new-btn" onClick={() => setTicketModal(true)}>
          + New Ticket
        </button>
      </div>
      <div className="top">
        {/* sort by component to sort the ticket results */}
        <div className="sort-by">
          <div className="sort-by-dropdown">
            <label> Select Project:</label>
            <select
              name="selectList"
              id="selectList"
              onChange={handleOnProjectChange}
              value={selectedProject}
            >
              {projectCategories?.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <SearchForTickets
        handleOnSearchChange={handleOnSearchChange}
        handleOnClickSearchBtn={handleOnClickSearchBtn}
        searchTerm={searchTerm}
      />

      <Filters
        handleOnProjectChange={handleOnProjectChange}
        selectedProject={selectedProject}
        projectCategories={projectCategories}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        // handleOnStatusChange={handleOnStatusChange}
      />

      <div className="my-tickets-only">
        <label htmlFor="my-tickets-only">
          <input
            type="checkbox"
            name="my-tickets-only"
            checked={myTicketsOnly}
            onChange={() => setMyTicketsOnly(!myTicketsOnly)}
          />
          Show my tickets only
        </label>
      </div>

      <div className="resolved-tickets-only">
        <label htmlFor="resolved-tickets-only">
          <input
            type="checkbox"
            name="resolved-tickets-only"
            checked={showResolvedTickets}
            onChange={() => setShowResolvedTickets(!showResolvedTickets)}
          />
          Show resolved tickets only
        </label>
      </div>

      {/* container that will hold ticket cards */}
      {isLoading ? (
        <div>Loding ...</div>
      ) : (
        <div className="ticket-card-container">
          {/* conditionally display ticket cards if ticketsToShow is not empty, otherwise "No tickets available" */}
          {ticketsToShow.length > 0 ? (
            <>
              {ticketsToShow?.map((ticket) => (
                <TicketCard
                  ticket={ticket}
                  handleOnClick={handleOnTicketClick}
                  key={ticket.id}
                />
              ))}{" "}
            </>
          ) : (
            <div className="nothing-available-label">No tickets available</div>
          )}
        </div>
      )}
    </div>
  );
}

export function SearchForTickets({
  handleOnSearchChange,
  handleOnClickSearchBtn,
  searchTerm,
}) {
  return (
    <div className="ticket-search">
      <input
        className="search-input"
        type="text"
        name="search"
        placeholder="search for a ticket"
        value={searchTerm}
        onChange={handleOnSearchChange}
      />
      <button className="search-btn" onClick={handleOnClickSearchBtn}>
        <i className="material-icons">
          {/* conditionally render search or close icon depending on search terms */}
          {searchTerm == "" ? "search" : "close"}
        </i>
      </button>
    </div>
  );
}

export function Filters({
  selectedPriority,
  setSelectedPriority,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}) {
  const priorityCategories = [
    "All priorities",
    "Low",
    "Medium",
    "High",
    "Critical",
  ];
  const statusCategories = [
    "All statuses",
    "Not Started",
    "In Progress",
    "Submitted",
    "Resolved",
  ];
  const categoryCategories = ["All categories", "Bug", "New Feature"];

  return (
    <div className="ticket-filters-container">
      <div className="bottom">
        {/* sort by component to sort the ticket results */}
        <div className="sort-by">
          <div className="sort-by-dropdown">
            <select
              name="selectList"
              id="selectList"
              onChange={(evt) => setSelectedPriority(evt.target.value)}
              value={selectedPriority}
            >
              {priorityCategories?.map((c) => (
                <option value={c} key={c.id}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* sort by component to sort the ticket results by STATUS */}
        <div className="sort-by">
          <div className="sort-by-dropdown">
            <select
              name="selectList"
              id="selectList"
              onChange={(evt) => setSelectedStatus(evt.target.value)}
              value={selectedStatus}
            >
              {statusCategories?.map((c) => (
                <option value={c} key={c.id}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* sort by component to sort the ticket results */}
        <div className="sort-by">
          <div className="sort-by-dropdown">
            <select
              name="selectList"
              id="selectList"
              onChange={(evt) => setSelectedCategory(evt.target.value)}
              value={selectedCategory}
            >
              {categoryCategories?.map((c) => (
                <option value={c} key={c.id}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
