import "./AddProjectsDropdown.css";

export default function AddProjectsDrowpdown({ projects, onClick, close }) {
  return (
    <div className="dropdown-container">
      {projects.map((p) => (
        <div className="option-row" onClick={() => onClick(p)}>
          <p>{p.name}</p>
        </div>
      ))}
      <div className="option-row" id="dropdown-close-button" onClick={close}>
        <p id="close-text">CLOSE</p>
      </div>
    </div>
  );
}
