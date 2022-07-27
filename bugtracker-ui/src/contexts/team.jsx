import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const TeamContext = createContext(null);

export const TeamContextProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    fetchTeams,
    currentTeam,
    setCurrentTeam,
    isLoading,
  };

  return (
    <TeamContext.Provider value={teamValue}>
      <>{children}</>
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
