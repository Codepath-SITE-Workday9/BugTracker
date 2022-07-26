import "./TeamsPage.css";
import TeamModal from "./TeamModal/TeamModal";
import TeamsOverview from "./TeamsOverview/TeamsOverview";
import TeamView from "./TeamView/TeamView";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { useTeamContext } from "../../contexts/team";

export default function TeamsPage() {
  // whether the modal for creating a new team should be displayed or not
  const [teamModal, setTeamModal] = useState(false);
  const { teams, currentTeam, setCurrentTeam } = useTeamContext();

  const handleOnTeamClick = (team) => {
    setCurrentTeam(team);
  };

  return (
    <div className="teams-page">
      {teamModal && <TeamModal setModal={setTeamModal} />}
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
