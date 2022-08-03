import "./TicketView.css";
import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";
import { useTicketContext } from "../../../contexts/ticket";
// import { TicketPageDevelopersTable } from "../../Tables/TicketPageDevelopersTable";
// import { TicketPageProjectsTable } from "../../Tables/TicketPageProjectsTable";

//Overview of a specific ticket
export default function TicketView({
  currentTicket,
  ticketsAvailable,
  isLoading,
}) {
  const { setTicketModal } = useTicketContext();
  const [creator, setCreator] = useState("");

  const fetchCreator = async () => {
    const { data, error } = await apiClient.fetchUserById(
      currentTicket.creator_id
    );
    if (data) {
      setCreator(data.user.fullName);
    }
  };

  useEffect(() => {
    fetchCreator();
  }, [currentTicket]);

  return (
    <div className="ticket-view">
      {!isLoading ? (
        <>
          {/* header for a specific ticket and a button to create new ticket */}
          <div className="ticket-header">
            <div className="ticket-title">
              <h1> {ticketsAvailable && currentTicket?.title} </h1>

              <div className="ticket-info">
                <div className={`ticket-priority ${currentTicket.priority}`}>
                  {currentTicket.priority}
                </div>
                <div className={`ticket-category ${currentTicket.category}`}>
                  {currentTicket.category}
                </div>
                <div className={`ticket-status ${currentTicket.status}`}>
                  {currentTicket.status}
                </div>
              </div>
            </div>

            <button className="new-btn" onClick={() => setTicketModal(true)}>
              <span class="material-symbols-outlined">edit_document</span>
            </button>
          </div>

          {/* Conditionally render the specific ticket's information, or display "Nothing yet" if no tickets have been created */}
          {ticketsAvailable ? (
            currentTicket && (
              <>
                {/* an input field to add a developer to the ticket, and all developers listed in table form */}

                <div className="ticket-description">
                  <p>{currentTicket.description}</p>
                </div>
                <div className="ticket-created-by">
                  Ticket Author: {creator}
                </div>
                <div className="ticket-opened-on">
                  Opened on: {new Date(currentTicket.created_at).toDateString()}
                </div>
              </>
            )
          ) : (
            <>
              <div className="nothing-created-yet">
                <h1>You have not created any tickets yet!</h1>
                <h2>To get started, click the Create New Ticket button.</h2>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}

export function AddDeveloper({ currentTicket }) {
  const [email, setEmail] = useState();
  const [error, setError] = useState("");

  // handler to update the email to add
  const handleOnEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // handler function to add a new member to an existsing ticket
  const handleOnAddNewMember = async () => {
    const { data, error } = await apiClient.addMemberToTicket({
      ticketId: currentTicket.id,
      memberToAdd: email,
    });

    // if request to add a new member was successful, clear errors and clear the email, else output the error
    if (data) {
      setError("");
      setEmail("");
    } else if (error) {
      setError("No developer found with that email. Please try again!");
    }
  };

  return (
    <>
      {/* search input to add a develoepr to ticket */}
      <div className="add-developer-to-ticket">
        <p> Add a developer to this ticket: </p>
        <div className="dev-search">
          <input
            className="search-input"
            type="text"
            name="search"
            value={email}
            placeholder="developer email"
            onChange={handleOnEmailChange}
          />
          <button
            type="submit"
            className="search-btn"
            onClick={handleOnAddNewMember}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
      {/* display any errors */}
      <p className="errors"> {error}</p>
    </>
  );
}
