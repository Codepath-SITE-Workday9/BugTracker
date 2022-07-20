import "./ProjectsOverview.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useState } from "react";
export default function ProjectsOverview({ projects, handleOnProjectClick }) {
  var projectsToShow = [];
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = (change) => {
    setSearchTerm(change.target.value);
    console.log(searchTerm);
  };

  projectsToShow = projects.filter((p) =>
    p.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-overview">
      <div className="header">
        <h1>Projects Overview</h1>
      </div>

      <div className="project-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search for project"
          onChange={handleOnChange}
        />
        <i className="material-icons">search</i>
      </div>

      <div className="sort-filter">
        <p> Sort by: filter by: </p>
      </div>

      <div className="project-card-container">
        {projectsToShow.map((project) => (
          <>
            <ProjectCard
              title={project.projectTitle}
              description={project.description}
              numOpenTickets={project.tickets}
              handleOnClick={handleOnProjectClick}
            />
          </>
        ))}
      </div>
    </div>
  );
}
