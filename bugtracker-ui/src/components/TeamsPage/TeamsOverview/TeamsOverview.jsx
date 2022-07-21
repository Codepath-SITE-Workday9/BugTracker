import "./TeamsOverview.css";
import TeamCard from "../TeamCard/TeamCard";
import { useState } from "react";
import SortByDrowpdown from "../../Dropdown/SortByDropdown/SortByDropdown";
export default function TeamsOverview({ teams, handleOnTeamClick }) {
  var teamsToShow = [];
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnSearchChange = (change) => {
    setSearchTerm(change.target.value);
    console.log(searchTerm);
  };

  teamsToShow = teams.filter((p) =>
    p.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="teams-overview">
      <div className="header">
        <h1>Teams Overview</h1>
      </div>

      <div className="team-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="search for team"
          onChange={handleOnSearchChange}
        />
        <button className="search-btn">
          <i className="material-icons">search</i>
        </button>
      </div>

      <div className="sort-by">
        <p> Sort by: </p>
        <SortByDrowpdown />
      </div>

      <div className="team-card-container">
        {teamsToShow.map((team) => (
          <>
            <TeamCard
              name={team.teamName}
              numProjects={team.projects}
              handleOnClick={handleOnTeamClick}
            />
          </>
        ))}
      </div>
    </div>
  );
}
