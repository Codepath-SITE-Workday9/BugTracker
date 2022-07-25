import "./AddProjectsDropdown.css";

export default function AddProjectsDrowpdown({ projects, onClick }) {
  return (
    <div className="dropdown-container">
      {projects.map((p) => (
        <div className="option-row" onClick={() => onClick(p)}>
          <p>{p.projectTitle}</p>
        </div>
      ))}
    </div>
  );
}
