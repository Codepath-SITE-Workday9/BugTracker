import "./TeamsPage.css";
import TeamModal from "./TeamModal/TeamModal";
import TeamsOverview from "./TeamsOverview/TeamsOverview";
import TeamView from "./TeamView/TeamView";
import { useState } from "react";

export default function TeamsPage() {
  // state variable used to determine whether the modal for creating a new team should be displayed or not
  const [teamModal, setTeamModal] = useState(false);

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

  //state variable that holds current team selected, will default to first team in team array (team array == fakeData for now)
  const [currentTeam, setCurrentTeam] = useState([fakeData[0].teamName]);

  //handler function used to determine which team should be displayed in the TeamOverview component
  const handleOnTeamClick = (teamId) => {
    setCurrentTeam(teamId);
    console.log(teamId);
  };

  return (
    <div className="teams-page">
      // uses teamModal state variable to determine whether the new team popup
      window should display.
      {teamModal && <TeamModal setModal={setTeamModal} />}
      // uses teamModal variable to determine whether background should be
      blurred
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
