import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const TeamContext = createContext(null);

// context to keep track of a users teams, the current team selected, and whether or not the teamModal should be displayed.
export const TeamContextProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teamModal, setTeamModal] = useState(false);

  const fetchTeams = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllTeams();
    if (data) {
      setTeams(data.teamList);
    }
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTeams();
  }, [setTeams]);

  const teamValue = {
    teams,
    setTeams,
    currentTeam,
    setCurrentTeam,
    isLoading,
    fetchTeams,
    teamModal,
    setTeamModal,
  };

  return (
    <TeamContext.Provider value={teamValue}>
      <>{children}</>
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
