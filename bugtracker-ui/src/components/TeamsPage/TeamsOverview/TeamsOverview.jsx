import "./TeamsOverview.css";
import TeamCard from "../TeamCard/TeamCard";
import { useState } from "react";
export default function TeamsOverview({ teams, handleOnTeamClick }) {
  var teamsToShow = [];
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = (change) => {
    setSearchTerm(change.target.value);
    console.log(searchTerm);
  };

  teamsToShow = teams.filter((p) =>
    p.teamTitle.toLowerCase().includes(searchTerm.toLowerCase())
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
          onChange={handleOnChange}
        />
        <i className="material-icons">search</i>
      </div>

      <div className="sort-filter">
        <p> Sort by: filter by: </p>
      </div>

      <div className="team-card-container">
        {teamsToShow.map((team) => (
          <>
            <TeamCard
              title={team.teamTitle}
              description={team.description}
              numOpenTickets={team.tickets}
              handleOnClick={handleOnTeamClick}
            />
          </>
        ))}
      </div>
    </div>
  );
}
