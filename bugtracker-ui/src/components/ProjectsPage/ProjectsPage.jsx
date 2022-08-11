import "./ProjectsPage.css";
import { useEffect, useState } from "react";
import { useProjectContext } from "../../contexts/project";
import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
import ProjectView from "./ProjectView/ProjectView";
import ProjectModal from "../Modals/ProjectModal/ProjectModal";
import { useTicketContext } from "../../contexts/ticket";
import TicketModal from "../Modals/TicketModal/TicketModal";
import apiClient from "../../services/apiClient";

// page where a user can: see all projects they are apart of(ProjectsOverview component), view specific details about a project (ProjectView component), and create a new project(ProjectModal component)
export default function ProjectsPage() {
  const {
    projects,
    currentProject,
    setCurrentProject,
    projectModal,
    setProjectModal,
    fetchProjects,
    isLoading,
    sortedProjects,
    setSortedProjects,
    sortProjects,
  } = useProjectContext();

  const { ticketModal, selectedProject, setSelectedProject } =
    useTicketContext();

  const [availableMembers, setAvailableMembers] = useState([]);

  // handler function to change which projects's details should be displayed
  const handleOnProjectClick = (projectObject) => {
    setCurrentProject(projectObject);
    setSelectedProject(projectObject.id);
  };

  // handler function to set the selected project when a user selects a project from the dropdown
  const handleOnProjectChange = (event) => {
    setSelectedProject(event.target.value.id);
  };

  const appendToEmailArray = async (teamId) => {
    const { data } = await apiClient.fetchMemberList(teamId);
    data.teamsData.map((member) => {
      if (!availableMembers.includes(member.email)) {
        setAvailableMembers((prev) => [...prev, member.email]);
      }
    });
  };

  // useEffect hook to fetch updated list of projects a user is apart of after creating a new project
  useEffect(() => {
    sortProjects(projects);
  }, [projectModal, ticketModal]);

  useEffect(() => {
    fetchMemsForProject();
  }, [selectedProject]);

  const fetchMemsForProject = async () => {
    if (selectedProject > -1) {
      setAvailableMembers([]);
      let teams = currentProject.teams;
      teams?.map((t) => {
        appendToEmailArray(t);
      });
    }
  };

  return (
    <div className="projects-page">
      {/* conditionally render the Modal to create a new team  */}
      {projectModal && <ProjectModal />}
      {ticketModal && (
        <TicketModal
          availableMembers={availableMembers}
          setSelectedProject={setSelectedProject}
          currentProject={selectedProject}
          handleOnProjectChange={handleOnProjectChange}
        />
      )}
      {/* conditionally blur background depending on if modal is open */}
      <div
        className={
          projectModal || ticketModal ? "background-blur" : "background"
        }
      >
        <ProjectsOverview
          handleOnProjectClick={handleOnProjectClick}
          isLoading={isLoading}
          setProjectModal={setProjectModal}
        />
        <ProjectView
          projectsAvailable={projects.length > 0}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
