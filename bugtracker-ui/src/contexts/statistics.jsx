import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const StatisticsContext = createContext(null);

// context to keep track of a users tickets, the current ticket selected, and whether or not the ticketModal should be displayed.
export const StatisticsContextProvider = ({ children }) => {
  const [dashboardStatistics, setDashboardStatistics] = useState({});
  const [dashboardStatisticsRendered, setDashboardStatisticsRendered] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardStatistics = async () => {
    //setIsLoading(true);
    let stats = await apiClient.getAllStatistics();
    setDashboardStatistics(stats);
    //setIsLoading(false);
  };

  useEffect(() => {
    fetchDashboardStatistics();
  }, []); // setTickets dependency removed

  // window.onload = function () {
  //   fetchDashboardStatistics()
  // }

  const clearStatisticsContext = () => {
    setDashboardStatistics({});
    setDashboardStatisticsRendered(false);
    setIsLoading(false);
    setError("");
  };

  const statisticsValue = {
    dashboardStatistics,
    setDashboardStatistics,
    dashboardStatisticsRendered,
    setDashboardStatisticsRendered,
    fetchDashboardStatistics,
    clearStatisticsContext,
  };

  return (
    <StatisticsContext.Provider value={statisticsValue}>
      <>{children}</>
    </StatisticsContext.Provider>
  );
};

export const useStatisticsContext = () => useContext(StatisticsContext);
