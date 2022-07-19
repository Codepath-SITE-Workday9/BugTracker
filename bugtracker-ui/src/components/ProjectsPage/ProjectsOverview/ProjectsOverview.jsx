import "./ProjectsOverview.css";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function ProjectsOverview() {
  const fakeData = [
    {
      projectTitle: "Project 1",
      tickets: 3,
      description:
        "Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit",
    },
    {
      projectTitle: "Project 2",
      tickets: 5,
      description:
        "vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .",
    },
    {
      projectTitle: "Project 3",
      tickets: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . . ",
    },
    {
      projectTitle: "Project 4",
      tickets: 7,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .. ",
    },
    {
      projectTitle: "Project 5",
      tickets: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .e. ",
    },
  ];
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
          // onChange={handleOnChange}
        />
        <i className="material-icons">search</i>
      </div>

      <div className="sort-filter">
        <p> Sort by: filter by: </p>
      </div>

      <div className="project-card-container">
        {fakeData.map((project) => (
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
