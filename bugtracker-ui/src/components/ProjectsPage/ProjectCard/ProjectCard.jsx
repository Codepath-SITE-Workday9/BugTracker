import "./ProjectCard.css";
export default function ProjectCard({
  title,
  description,
  numOpenTickets,
  handleOnClick,
}) {
  return (
    <div className="project-card" onClick={() => handleOnClick(title)}>
      <div className="project-card-title">
        <p>{title}</p>
      </div>
      <div className="project-card-description">
        <p>{description}</p>
      </div>
      <div className="project-card-tickets">
        <p> Open tickets: {numOpenTickets}</p>
      </div>
    </div>
  );
}
