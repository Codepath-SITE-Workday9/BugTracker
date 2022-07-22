import "./TeamsPage.css";
import TeamModal from "./TeamModal/TeamModal";
import TeamsOverview from "./TeamsOverview/TeamsOverview";
import TeamView from "./TeamView/TeamView";
import { useState } from "react";
import apiClient from "../../services/apiClient";

export default function TeamsPage() {
  // state variable used to determine whether the modal for creating a new team should be displayed or not
  const [teamModal, setTeamModal] = useState(false);

  //Request body must have the name of the team, the members of the team, and the projects of a team
  // const testTeamInfo = { name: "Frontend", members: [], projects: [] };
  // apiClient.createTeam(testTeamInfo);

  //placeholder data for now, will be changed once connected to backend.
  var fakeData = [
    {
      teamName: "frontend",
      projects: 3,
      description:
        "Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit",
    },
    {
      teamName: "backend",
      projects: 2,
      description:
        "vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .",
    },
    {
      teamName: "ux/ui",
      projects: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . . ",
    },
    {
      teamName: "testing",
      projects: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .. ",
    },
  ];

  const [currentTeam, setCurrentTeam] = useState([fakeData[0].teamName]);

  const handleOnTeamClick = (teamId) => {
    setCurrentTeam(teamId);
  };

  return (
    <div className="teams-page">
      {teamModal && <TeamModal setModal={setTeamModal} />}
      <div className={teamModal ? "background-blur" : "background"}>
        <TeamsOverview teams={fakeData} handleOnTeamClick={handleOnTeamClick} />
        <TeamView
          modal={teamModal}
          setModal={setTeamModal}
          currentTeam={currentTeam}
        />
      </div>
    </div>
  );
}
