import "./ProjectsPage.css";
import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
import ProjectView from "./ProjectView/ProjectView";
import { useState } from "react";
import ProjectModal from "./ProjectModal/ProjectModal";

export default function ProjectsPage() {
  const [projectModal, setProjectModal] = useState(false);
  const [projectToShow, setProjectToShow] = useState([]);

  // hard coded data for now, later on will be passed in by prop
  var fakeData = [
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

  const handleOnProjectClick = (projectId) => {
    console.log(projectId);
  };

  return (
    <div className="projects-page">
      {projectModal && <ProjectModal setModal={setProjectModal} />}
      <div className={projectModal ? "background-blur" : "background"}>
        <ProjectsOverview
          projects={fakeData}
          handleOnProjectClick={handleOnProjectClick}
        />
        <ProjectView modal={projectModal} setModal={setProjectModal} />
      </div>
    </div>
  );
}
