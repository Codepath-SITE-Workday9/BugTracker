import "./ProjectsPage.css";
import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
import ProjectView from "./ProjectView/ProjectView";
export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <ProjectsOverview />
      <ProjectView />
    </div>
  );
}
