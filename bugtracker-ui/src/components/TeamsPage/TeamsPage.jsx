import "./TeamsPage.css";
import { useEffect } from "react";
import { useTeamContext } from "../../contexts/team";
import TeamsOverview from "./TeamsOverview/TeamsOverview";
import TeamView from "./TeamView/TeamView";
import TeamModal from "../Modals/TeamModal/TeamModal";

// page where a user can see all teams they are apart of(TeamsOverview component) and where a user can view specific details about a team + create a new team(TeamView component)
export default function TeamsPage() {
  // variables from useTeamContext() to keep track of what teams a user belongs to, and which team should be displayed in detail, and a function to fetch all teams.
  const {
    teams,
    currentTeam,
    setCurrentTeam,
    fetchTeams,
    teamModal,
    isLoading,
  } = useTeamContext();

  // useEffect hook to fetch updated list of teams a user is apart of after creating a new team
  useEffect(() => {
    fetchTeams();
  }, [teamModal]);

  // handler function to change which team's details should be displayed
  const handleOnTeamClick = (team) => {
    setCurrentTeam(team);
  };

  return (
    <div className="teams-page">
      {/* conditionally render the Modal to create a new team  */}
      {teamModal && <TeamModal />}
      {/* conditionally blur background depending on if modal is open */}
      <div className={teamModal ? "background-blur" : "background"}>
        <TeamsOverview
          teams={teams}
          handleOnTeamClick={handleOnTeamClick}
          isLoading={isLoading}
        />
        <TeamView
          currentTeam={currentTeam}
          teamsAvailable={teams.length > 0}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
