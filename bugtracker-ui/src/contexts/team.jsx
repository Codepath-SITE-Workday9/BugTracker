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

  const clearTeams = () => {
    setTeams([]);
  };

  const fetchTeams = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllTeams();
    if (data) {
      setTeams(data.teamList);
      if (data.teamList.length > 0) {
        setCurrentTeam(data.teamList[0]);
      }
    } else if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  // useEffect to fetch teams on initial load
  useEffect(() => {
    fetchTeams();
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

  const clearTeamContext = () => {
    setTeams([]);
    setTeamModal(false);
    setCurrentTeam({});
    setIsLoading(false);
    setError(null);
    setTeamsTableData([]);
    setIds([]);
  };

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
    clearTeamContext,
  };

  return (
    <TeamContext.Provider value={teamValue}>
      <>{children}</>
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
