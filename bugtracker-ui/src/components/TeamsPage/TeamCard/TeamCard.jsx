import "./TeamCard.css";
export default function TeamCard({ name, numProjects, handleOnClick }) {
  return (
    <div className="team-card" onClick={() => handleOnClick(name)}>
      <div className="team-card-title">
        <p>{name}</p>
      </div>
      {/* <div className="team-card-description">
        <p>{description}</p>
      </div> */}
      <div className="team-card-tickets">
        <p> Projects assigned: {numProjects}</p>
      </div>
    </div>
  );
}
