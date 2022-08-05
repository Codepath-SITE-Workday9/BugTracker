import "./ProjectsPage.css";
import { useEffect, useState } from "react";
import { useProjectContext } from "../../contexts/project";
import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
import ProjectView from "./ProjectView/ProjectView";
import ProjectModal from "../Modals/ProjectModal/ProjectModal";
import { useTicketContext } from "../../contexts/ticket";
import TicketModal from "../Modals/TicketModal/TicketModal"
import apiClient from "../../services/apiClient";

// page where a user can see all projects they are apart of(ProjectsOverview component) and where a user can view specific details about a project + create a new project(ProjectView component)
export default function ProjectsPage() {
  const {
    projects,
    setProjects,
    currentProject,
    setCurrentProject,
    projectModal,
    setProjectModal,
    fetchProjects,
    isLoading,
  } = useProjectContext();

  const {ticketModal, selectedProject, setSelectedProject} = useTicketContext()

  const [sortedProjects, setSortedProjects] = useState(projects)
  // const [selectedProject, setSelectedProject] = useState(-1)
  const [availableMembers, setAvailableMembers] = useState([]);

  // useEffect hook to fetch updated list of projects a user is apart of after creating a new project
  useEffect(() => {
    fetchProjects();
  }, [projectModal, sortedProjects, ticketModal]);

  useEffect(() => {
    fetchMemsForProject()
  }, [selectedProject])

  // handler function to change which projects's details should be displayed
  const handleOnProjectClick = (projectId) => {
    setCurrentProject(projectId);
    setSelectedProject(projectId.id)
  };

  

  //Handler function to change the order of the projects shown in project overview based on the sorting value
  const handleOnFilterChange = (sortValue) => {
    if(sortValue === "Least Tickets")
    {
      const results = projects.sort((project1, project2) => (project1.tickets.length > project2.tickets.length) ? 1 : -1)
      setSortedProjects(results)
    }
    else if(sortValue === "Most Tickets")
    {
      const results = projects.sort((project1, project2) => (project1.tickets.length < project2.tickets.length) ? 1 : -1)
      setSortedProjects(results)
    }
    else if(sortValue === "Most Teams")
    {
      const results = projects.sort((project1, project2) => (project1.teams.length > project2.teams.length) ? 1 : -1)
      setSortedProjects(results)
    }
    else if(sortValue === "Least Teams")
    {
      const results = projects.sort((project1, project2) => (project1.teams.length < project2.teams.length) ? 1 : -1)
      setSortedProjects(results)
    }
  }

    // handler function to set the selected project when a user selects a project from the dropdown
    const handleOnProjectChange = (event) => {
      setSelectedProject(event.target.value.id);
    };



    const appendToEmailArray = async (teamId) => {
      const { data, error } = await apiClient.fetchMemberList(teamId);
      data.teamsData.map((member) =>
        {
          if(!availableMembers.includes(member.email))
          {
            setAvailableMembers((prev) => [...prev, member.email])
          }
        }
      );
    };


  const fetchMemsForProject = async () => {
    if (selectedProject > -1) {
      setAvailableMembers([]);
      let teams = currentProject.teams
      teams?.map((t) => {
        appendToEmailArray(t);
      });
    }
  };





  //Conditionally set the sorted projects to the list of projects only if projects is populated and the length of sorted projects is zero
  if(projects.length > 0 && sortedProjects.length == 0)
  {
      setSortedProjects(projects)
  }

  return (
    <div className="projects-page">
      {/* conditionally render the Modal to create a new team  */}
      {projectModal && <ProjectModal />}
      {ticketModal && <TicketModal
          availableMembers={availableMembers}
          setCurrentProject={setSelectedProject}
          currentProject={selectedProject}
          handleOnProjectChange={handleOnProjectChange}
        />}
      {/* conditionally blur background depending on if modal is open */}
      <div className={projectModal || ticketModal ? "background-blur" : "background"}>
        <ProjectsOverview
          projects={projects}
          sortedProjects={sortedProjects}
          setSortedProjects={setSortedProjects}
          handleOnProjectClick={handleOnProjectClick}
          handleOnFilterChange={handleOnFilterChange}
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
