import "./ProjectsOverview.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useState } from "react";
export default function ProjectsOverview() {
  const fakeData = [
    {
      projectTitle: "Student Store",
      tickets: 3,
      description:
        "Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit",
    },
    {
      projectTitle: "Lifetracker",
      tickets: 5,
      description:
        "vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .",
    },
    {
      projectTitle: "Flixster",
      tickets: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . . ",
    },
    {
      projectTitle: "Stock App",
      tickets: 7,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .. ",
    },
    {
      projectTitle: "Bug Tracker Project",
      tickets: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .e. ",
    },
  ];
  var projectsToShow = [];
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = (change) => {
    setSearchTerm(change.target.value);
    console.log(searchTerm);
  };

  projectsToShow = fakeData.filter((p) =>
    p.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(projectsToShow);

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
            />
          </>
        ))}
      </div>
    </div>
  );
}
