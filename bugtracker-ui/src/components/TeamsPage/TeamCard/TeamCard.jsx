import "./TeamCard.css";

// card for a specific team
export default function TeamCard({ team, handleOnClick }) {
  return (
    <div className="team-card" onClick={() => handleOnClick(team)}>
      <div className="team-card-title">
        <p>{team.name}</p>
      </div>
      <div className="team-card-tickets">
        <p> Projects assigned: {team.projects.length}</p>
      </div>
    </div>
  );
}
