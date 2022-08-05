import "./ProjectsOverview.css";
import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import SortByDrowpdown from "../../Dropdown/SortByDropdown/SortByDropdown";

// overview of all projects a user is apart of
export default function ProjectsOverview({
  projects,
  handleOnProjectClick,
  handleOnFilterChange,
  isLoading,
  sortedProjects,
  setSortedProjects,
  setProjectModal
}) {
  var projectsToShow = [];
  const [searchTerm, setSearchTerm] = useState("");

  // handler function to set search term as a user types
  const handleOnSearchChange = (change) => {
    setSearchTerm(change.target.value);
  };

  // handler function to clear search term if close button is clicked
  const handleOnClickSearchBtn = () => {
    setSearchTerm("");
  };

  // update projectsToShow array depending on searchTerm
  if (sortedProjects) {
    projectsToShow = sortedProjects?.filter((p) =>
      p?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  }

  return (
    <div className="projects-overview">
      {/* projects overview header  */}
      <div className="header">
        <h1> Your Projects</h1>
        <button className="new-btn" onClick={() => setProjectModal(true)}>
              Create New Project
        </button>
      </div>

      {/* search for projects  */}
      <div className="project-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search for a project"
          value={searchTerm}
          onChange={handleOnSearchChange}
        />
        <button className="search-btn" onClick={handleOnClickSearchBtn}>
          <i className="material-icons">
            {/* conditionally render search or close icon depending on search terms */}
            {searchTerm == "" ? "search" : "close"}
          </i>
        </button>
      </div>

      {/* sort by component to sort the project results */}
      <div className="sort-by">
        <p> Sort by: </p>
        <SortByDrowpdown categories={["Most Tickets", "Least Tickets", "Most Teams", "Least Teams"]} handleOnFilterChange={handleOnFilterChange}/>
      </div>

      {/* container that will hold all ProjectCard components*/}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="project-card-container">
          {/* conditionally display project cards if teamsToShow is not empty, otherwise "No teams available" */}
          {projectsToShow.length > 0 ? (
            <>
              {projectsToShow?.map((project) => (
                <ProjectCard
                  project={project}
                  handleOnClick={handleOnProjectClick}
                  // key={project.id}
                />
              ))}
            </>
          ) : (
            <div className="nothing-available-label">
              No projects available{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
