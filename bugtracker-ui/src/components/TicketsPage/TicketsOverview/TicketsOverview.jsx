import "./TicketsOverview.css";
import { useEffect, useState } from "react";
import TicketCard from "../TicketCard/TicketCard";
import { useTicketContext } from "../../../contexts/ticket";
import { useProjectContext } from "../../../contexts/project";
import apiClient from "../../../services/apiClient";
// overview of all Tickets a user is apart of
export default function TicketsOverview({
  tickets,
  handleOnTicketClick,
  isLoading,
  selectedProject,
  setSelectedProject,
  handleOnProjectChange,
  selectedProjectTickets,
}) {
  // ticket search term
  const [searchTerm, setSearchTerm] = useState("");
  // modal variable to display modal
  const { setTicketModal } = useTicketContext();
  // all projects a user is apart of
  const { projects } = useProjectContext();

  // the projects dropown categories
  const dropdownCategories = [{ name: "All projects", id: -1 }];

  // map through the projects to add each project's name and id as an object to the dropdown category.
  projects.map((p) => {
    let projObj = { name: p.name, id: p.id };
    dropdownCategories.push(projObj);
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

  useEffect(() => {}, [selectedProject]);

  return (
    <div className="tickets-overview">
      {/* tickets overview header  */}
      <div className="header">
        <h1>Your Tickets</h1>
      </div>
      {/* sort by component to sort the ticket results */}
      <div className="sort-by">
        <p className="select"> Select project: </p>
        <div className="sort-by-dropdown">
          <select
            name="selectList"
            id="selectList"
            onChange={handleOnProjectChange}
            value={selectedProject}
          >
            {dropdownCategories?.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>{" "}
      </div>
      <button className="new-btn" onClick={() => setTicketModal(true)}>
        Create New Ticket
      </button>
      {/* search for tickets  */}
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
