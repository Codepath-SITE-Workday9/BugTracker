import "./TeamCard.css";
export default function TeamCard({
  title,
  description,
  numOpenTickets,
  handleOnClick,
}) {
  return (
    <div className="team-card" onClick={() => handleOnClick(title)}>
      <div className="team-card-title">
        <p>{title}</p>
      </div>
      <div className="team-card-description">
        <p>{description}</p>
      </div>
      <div className="team-card-tickets">
        <p> Open tickets: {numOpenTickets}</p>
      </div>
    </div>
  );
}
