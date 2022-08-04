import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const TeamContext = createContext(null);

// context to keep track of a users teams, the current team selected, and whether or not the teamModal should be displayed.
export const TeamContextProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [teamModal, setTeamModal] = useState(false);
  const [currentTeam, setCurrentTeam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teamsTableData, setTeamsTableData] = useState([]);
  const [ids, setIds] = useState([]);
  //const [tableData, setTableData] = useState([])

  const clearTeams = () => {
    setTeams([]);
  };

  const fetchTeams = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllTeams();
    console.log("fetchTeams data:", data)
    if (data) {
      console.log("data.teamList:", data.teamList)
      setTeams(data.teamList);
      console.log("fetchTeams teams:", teams)
      if (data.teamList.length > 0) {
        setCurrentTeam(data.teamList[0]);
      }
    } else if (error) {
      setError(error);
    }
    //console.log("fetchTeams teams:", teams)
    setIsLoading(false);
  };

  // useEffect to fetch teams on initial load
  useEffect(() => {
    fetchTeams();
    console.log("useEffect teams:", teams)
    newFetchTeamsTableData();
    setIsLoading(false);
  }, []); // currentTeam was removed as a dependency to fix infinite loading

  const fetchTeamsTableData = async (recievedTeams) => {
    //const tableData = []
    setTeamsTableData([]);
    teams.map(async (team) => {
      const memberList = await apiClient.fetchMemberList(team.id);
      let memberNames = [];
      memberList?.data?.members.map((member) => {
        memberNames.push(member.full_name);
      });

      //tableData.push({id: team.id, name: team.name, members: "testMembers"/*memberNames.join(", ")*/ }
      await setTeamsTableData((prev) => [
        ...prev,
        { id: team.id, name: team.name, members: memberNames.join(", ") },
      ]);
    });
  };

  const getTeamIds = (recievedTeams) => {
    let teamIds = [];
    recievedTeams?.map((team) => {
      teamIds.push(team.id);
    });
    return teamIds;
  };

  const newFetchTeamsTableData = async (recievedTeams) => {
    console.log("newFetchTeamsTableData recievedTeams:", recievedTeams)
    const { data, error } = await apiClient.fetchTeamMembers(
      getTeamIds(recievedTeams)
    );
    if (data) {
      setTeamsTableData(data.members);
    }
    if (error) {
      setError(error);
    }
  };

  async function getData() {
    setTeamsTableData([]);

    let teamIds = [];
    teams.map(async (team) => {
      const memberList = await apiClient.fetchMemberList(team.id);
      teamIds.push(team.id);
      let memberNames = [];
      memberList?.data?.members.map((member) => {
        memberNames.push(member.full_name);
      });
      setTeamsTableData((prev) => [
        ...prev,
        { id: team.id, name: team.name, members: memberNames.join(", ") },
      ]);
    });
  }

  const teamValue = {
    teams,
    setTeams,
    currentTeam,
    setCurrentTeam,
    fetchTeams,
    fetchTeamsTableData,
    newFetchTeamsTableData,
    teamModal,
    setTeamModal,
    isLoading,
    teamsTableData,
    setTeamsTableData,
    clearTeams,
    getData,
  };

  return (
    <TeamContext.Provider value={teamValue}>
      <>{children}</>
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
