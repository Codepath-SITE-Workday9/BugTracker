import "./ProjectView.css";
export default function ProjectView() {
  return (
    <div className="project-view">
      <div className="project-header">
        <h1>Project Title </h1>
        <button className="new-project-btn">New Project</button>
      </div>
      <div className="project-description">
        <p> project description</p>
      </div>
      <div className="tickets-header">Tickets</div>
      <div className="ticket-name-header">Ticket Name</div>
    </div>
  );
}
