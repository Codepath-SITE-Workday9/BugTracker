import "./ProjectsOverview.css";
import { useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import SortByDrowpdown from "../../Dropdown/SortByDropdown/SortByDropdown";

export default function ProjectsOverview({ projects, handleOnProjectClick }) {
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
  if (projects) {
    projectsToShow = projects?.filter((p) =>
      p?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  }

  return (
    <div className="projects-overview">
      {/* projects overview header  */}
      <div className="header">
        <h1> Your Projects</h1>
      </div>

      {/* search for projects  */}
      <div className="project-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search for a project"
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
        <SortByDrowpdown categories={["Most tickets", "Least tickets"]} />
      </div>

      {/* container that will hold all ProjectCard components*/}
      <div className="project-card-container">
        {/* conditionally display project cards if teamsToShow is not empty, otherwise "No teams available" */}
        {projectsToShow.length > 0 ? (
          <>
            {projectsToShow?.map((project) => (
              <ProjectCard
                project={project}
                handleOnClick={handleOnProjectClick}
              />
            ))}
          </>
        ) : (
          <div className="nothing-available-label">No projects available </div>
        )}
      </div>
    </div>
  );
}
