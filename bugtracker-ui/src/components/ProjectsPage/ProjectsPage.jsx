import "./ProjectsPage.css";
import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
import ProjectView from "./ProjectView/ProjectView";
import { useEffect, useState } from "react";
import ProjectModal from "./ProjectModal/ProjectModal";
import { useProjectContext } from "../../contexts/project";
export default function ProjectsPage() {
  const [projectModal, setProjectModal] = useState(false);
  const { projects, setProjects, setCurrentProject } = useProjectContext();

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
  useEffect(() => {
    setProjects(fakeData);
  }, [setProjects]);
  const [projectToShow, setProjectToShow] = useState(fakeData[0].projectTitle);

  const handleOnProjectClick = (projectId) => {
    console.log(projectId);
  };

  return (
    <div className="projects-page">
      {projectModal && <ProjectModal setModal={setProjectModal} />}
      <div className={projectModal ? "background-blur" : "background"}>
        <ProjectsOverview
          projects={projects}
          handleOnProjectClick={handleOnProjectClick}
        />
        <ProjectView
          modal={projectModal}
          setModal={setProjectModal}
          projectToShow={projectToShow}
        />
      </div>
    </div>
  );
}
