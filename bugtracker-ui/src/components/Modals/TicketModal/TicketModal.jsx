import { useTicketContext } from "../../../contexts/ticket";
import "./TicketModal.css";

export default function TicketModal() {
  const {
    handleOnCreateNewTicketSubmit,
    title,
    setTitle,
    description,
    setDescription,
    developers,
    setDevelopers,
    complexity,
    setComplexity,
    status,
    setStatus,
    priortiy,
    setPriority,
    errors,
    setErrors,
  } = useTicketContext();

  return (
    <div className="ticket-modal-background">
      <div className="ticket-modal-container">
        {/* modal header: header text & a close button */}
        <div className="header">
          <p>CREATE A NEW TICKET</p>
          <button
            className="close-modal-btn"
            onClick={() => setTicketModal(false)}
          >
            X
          </button>
        </div>

        {/* form area to create new ticket */}
        <div className="form">
          {/* cancel and submit buttons */}
          <div className="modal-buttons">
            <button className="cancel" onClick={() => setTeamModal(false)}>
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
