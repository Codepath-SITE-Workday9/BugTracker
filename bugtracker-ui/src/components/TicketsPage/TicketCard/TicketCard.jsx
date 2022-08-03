import "./TicketCard.css";

// card for a specific ticket
export default function TicketCard({ ticket, handleOnClick }) {
  return (
    <div className="ticket-card" onClick={() => handleOnClick(ticket)}>
      <div className="ticket-card-title">
        <p>{ticket.title}</p>
      </div>
      <div className="ticket-card-tickets">
        <p> Developers assigned: {ticket.developers.length}</p>
      </div>
      <div className={`ticket-priority ${ticket.priority}`}>
        {ticket.priority}
      </div>
      <div className={`ticket-status ${ticket.status}`}>{ticket.status}</div>
    </div>
  );
}
