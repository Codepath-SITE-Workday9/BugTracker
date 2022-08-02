import "./TicketsOverview.css";
import { useState } from "react";
import TicketCard from "../TicketCard/TicketCard";
import SortByDrowpdown from "../../Dropdown/SortByDropdown/SortByDropdown";

// overview of all Tickets a user is apart of
export default function TicketsOverview({ tickets, handleOnTicketClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  let ticketsToShow = [];

  // handler function to set search term as a user types
  const handleOnSearchChange = (change) => {
    setSearchTerm(change.target.value);
  };

  // handler function to clear search term if close button is clicked
  const handleOnClickSearchBtn = () => {
    setSearchTerm("");
  };

  // update ticketsToShow array depending on searchTerm
  if (tickets) {
    ticketsToShow = tickets.filter((t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="tickets-overview">
      {/* tickets overview header  */}
      <div className="header">
        <h1>Your Tickets</h1>
      </div>

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

      {/* sort by component to sort the ticket results */}
      <div className="sort-by">
        <p> Sort by: </p>
        <SortByDrowpdown categories={["Most projects", "Least projects"]} />
      </div>

      {/* container that will hold ticket cards */}
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
    </div>
  );
}
