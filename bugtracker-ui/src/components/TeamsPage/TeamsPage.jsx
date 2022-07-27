import "./TeamsPage.css";
import { useState, useEffect } from "react";
import { useTeamContext } from "../../contexts/team";
import TeamModal from "./TeamModal/TeamModal";
import TeamsOverview from "./TeamsOverview/TeamsOverview";
import TeamView from "./TeamView/TeamView";

// page where a user can see all teams they are apart of and where a user can create a new team
export default function TeamsPage() {
  // state variable used to determine if modal is open or not, to determine whether the background should be blurred
  const [teamModal, setTeamModal] = useState(false);

  // variables from useTeamContext() to keep track of what teams a user belongs to, and which team should be displayed in detail, and a function to fetch all teams.
  const { teams, currentTeam, setCurrentTeam, fetchTeams } = useTeamContext();

  // useEffect hook to fetch all teams a user is apart of
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
      {teamModal && <TeamModal setModal={setTeamModal} />}
      {/* conditionally blur background depending on if modal is open */}
      <div className={teamModal ? "background-blur" : "background"}>
        <TeamsOverview teams={teams} handleOnTeamClick={handleOnTeamClick} />
        <TeamView
          modal={teamModal}
          setModal={setTeamModal}
          currentTeam={currentTeam}
        />
      </div>
    </div>
  );
}
