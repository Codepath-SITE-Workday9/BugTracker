import "./TeamsOverview.css";
import { useState } from "react";
import TeamCard from "../TeamCard/TeamCard";
import SortByDrowpdown from "../../Dropdown/SortByDropdown/SortByDropdown";
import { useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { useTeamContext } from "../../../contexts/team";

// overview of all teams a user is apart of
export default function TeamsOverview({ teams, handleOnTeamClick }) {
  var teamsToShow = [];
  const [searchTerm, setSearchTerm] = useState("");

  // handler function to set search term as a user types
  const handleOnSearchChange = (change) => {
    setSearchTerm(change.target.value);
  };

  // handler function to clear search term if close button is clicked
  const handleOnClickSearchBtn = () => {
    setSearchTerm("");
  };

  // update teamsToShow array depending on searchTerm
  teamsToShow = teams.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="teams-overview">
      {/* teams overview header  */}
      <div className="header">
        <h1>Your Teams</h1>
      </div>

      {/* search for teams  */}
      <div className="team-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search for a team"
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

      {/* sort by component to sort the teams results */}
      <div className="sort-by">
        <p> Sort by: </p>
        <SortByDrowpdown categories={["Most projects", "Least projects"]} />
      </div>

      {/* container that will hold team cards */}
      <div className="team-card-container">
        {/* conditionally display team cards if teamsToShow is not empty, otherwise "No teams available" */}
        {teamsToShow.length > 0 ? (
          <>
            {teamsToShow.map((team) => (
              <TeamCard
                team={team}
                handleOnClick={handleOnTeamClick}
                key={team.id}
              />
            ))}{" "}
          </>
        ) : (
          <div className="nothing-available-label">No teams available</div>
        )}
      </div>
    </div>
  );
}
