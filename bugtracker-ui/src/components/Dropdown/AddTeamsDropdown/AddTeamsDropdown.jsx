import "./AddTeamsDropdown.css";

export default function AddTeamsDrowpdown({ teams, onClick }) {
  return (
    <div className="dropdown-container">
      {teams.map((t) => (
        <div className="option-row" onClick={() => onClick(t)}>
          <p>{t.nanme}</p>
        </div>
      ))}
    </div>
  );
}
