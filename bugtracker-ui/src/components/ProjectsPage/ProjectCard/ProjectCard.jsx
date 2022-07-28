import "./ProjectCard.css";
export default function ProjectCard({ project, handleOnClick }) {
  return (
    <div className="project-card" onClick={() => handleOnClick(project)}>
      <div className="project-card-title">
        <p>{project?.name}</p>
      </div>
      <div className="project-card-description">
        <p>{project?.description}</p>
      </div>
      <div className="project-card-tickets">
        <p> Open tickets: {project?.tickets}</p>
      </div>
    </div>
  );
}
