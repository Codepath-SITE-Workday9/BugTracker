import "./AddTeamsDropdown.css";

export default function AddTeamsDrowpdown({ teams, onClick, close }) {
  return (
    <div className="dropdown-container">
      {teams.map((t) => (
        <div className="option-row" onClick={() => onClick(t)}>
          <p>{t.name}</p>
        </div>
      ))}
      <div className="option-row" id="dropdown-close-button" onClick={close}>
        <p id="close-text">CLOSE</p>
      </div>
    </div>
  );
}
