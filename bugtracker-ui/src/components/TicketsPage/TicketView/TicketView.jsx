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
  availableMembers,
}) {
  const { setTicketModal, setEditing, setTicketToEdit } = useTicketContext();
  const [creator, setCreator] = useState("");
  const [assignedDevs, setAssignedDevs] = useState([]);

  const fetchCreator = async () => {
    const { data, error } = await apiClient.fetchUserById(
      currentTicket.creator_id
    );
    if (data) {
      setCreator(data.user.fullName);
    }
  };

  const handleOnEditClick = () => {
    setTicketToEdit(currentTicket);
    setEditing(true);
    setTicketModal(true);
  };

  useEffect(() => {
    fetchCreator();
    getDevelopersArray(currentTicket.developers);
  }, [currentTicket]);

  const getDevelopersArray = async (developers) => {
    setAssignedDevs([]);
    developers.map((d) => {
      appendMembersToArray(d);
    });
  };

  const appendMembersToArray = async (teamId) => {
    const { data, error } = await apiClient.fetchUserById(teamId);
    setAssignedDevs((prev) => [...prev, data.user.fullName]);
  };

  return (
    <div className="ticket-view">
      {!isLoading ? (
        <>
          {/* header for a specific ticket and a button to create new ticket */}
          <div className="ticket-header">
            <div className="ticket-title">
              <h1> {ticketsAvailable && currentTicket?.title} </h1>
              <button
                className="new-btn"
                onClick={() => handleOnEditClick()}
                title="Edit this ticket"
              >
                <span className="material-symbols-outlined">edit_document</span>
              </button>
            </div>
            <div className="ticket-created-details">
              <div className="ticket-created-by">
                <label className="ticket-author"> Opened by: </label>
                <span className="ticket-author">{creator}</span>
              </div>
              <div className="ticket-opened-on">
                <label className="ticket-open-date"> Opened on: </label>
                <span className="ticket-open-date">
                  {new Date(currentTicket.created_at).toDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Conditionally render the specific ticket's information, or display "Nothing yet" if no tickets have been created */}
          {ticketsAvailable ? (
            currentTicket && (
              <div className="ticket-content">
                {/* an input field to add a developer to the ticket, and all developers listed in table form */}

                <div className="ticket-description">
                  <h2> Description: </h2>
                  <p>{currentTicket.description}</p>
                </div>

                <div className="ticket-details">
                  <h2> Details: </h2>

                  <div className="ticket-info">
                    <div className="ticket-priority">
                      <label className="priority"> Priority: </label>
                      <span className={`${currentTicket.priority}`}>
                        {currentTicket.priority}
                      </span>
                    </div>
                    <div className="ticket-category">
                      <label className="category"> Category: </label>
                      <span className={`${currentTicket.category}`}>
                        {currentTicket.category}
                      </span>
                    </div>
                    <div className="ticket-status">
                      <label className="status"> Status: </label>
                      <span className={`${currentTicket.status}`}>
                        {currentTicket.status}
                      </span>
                    </div>
                    <div className="ticket-developers">
                      <label className="developers">
                        {" "}
                        Assigned Developers:{" "}
                      </label>
                      {assignedDevs.map((d) => (
                        <p className="developers">{d}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
