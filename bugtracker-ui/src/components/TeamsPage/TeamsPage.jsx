import "./TeamsPage.css";
import TeamModal from "./TeamModal/TeamModal";
import TeamsOverview from "./TeamsOverview/TeamsOverview";
import TeamView from "./TeamView/TeamView";
import { useState } from "react";

export default function TeamsPage() {
  const [teamModal, setTeamModal] = useState(false);

  var fakeData = [
    {
      teamTitle: "Student Store",
      tickets: 3,
      description:
        "Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit",
    },
    {
      teamTitle: "Lifetracker",
      tickets: 5,
      description:
        "vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .",
    },
    {
      teamTitle: "Flixster",
      tickets: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . . ",
    },
    {
      teamTitle: "Stock App",
      tickets: 7,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .. ",
    },
    {
      teamTitle: "Bug Tracker Project",
      tickets: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  consecr adipiscing elit . . .e. ",
    },
  ];

  const handleOnTeamClick = (teamId) => {
    console.log(teamId);
  };
  return (
    <div className="teams-page">
      {teamModal && <TeamModal setModal={setTeamModal} />}
      <div className={teamModal ? "background-blur" : "background"}>
        <TeamsOverview teams={fakeData} handleOnteamClick={handleOnTeamClick} />
        <TeamView modal={teamModal} setModal={setTeamModal} />
      </div>
    </div>
  );
}
