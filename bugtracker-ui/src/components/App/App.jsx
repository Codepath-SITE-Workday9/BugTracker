import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import LandingPage from "../LandingPage/LandingPage";
import TicketsPage from "../TicketsPage/TicketsPage";
import StatisticsPage from "../StatisticsPage/StatisticsPage";
import UserProfile from "../UserProfile/UserProfile";
import TeamsPage from "../TeamsPage/TeamsPage";
import Settings from "../Settings/Settings";
import Dashboard from "../Dashboard/Dashboard";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoUserNavbar from "../LandingPage/NoUserNavbar/NoUserNavbar";
import { OpenContextProvider } from "../../contexts/open";
import { useEffect } from "react";
import apiClient from "../../services/apiClient";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import NotFound from "../NotFound/NotFound";
import { ProjectContextProvider } from "../../contexts/project";
import { TeamContextProvider, useTeamContext } from "../../contexts/team";
import { TicketContextProvider } from "../../contexts/ticket";
import { StatisticsContextProvider, useStatisticsContext } from "../../contexts/statistics";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <OpenContextProvider>
        <StatisticsContextProvider>
          <ProjectContextProvider>
            <TeamContextProvider>
              <TicketContextProvider>
                <App />
              </TicketContextProvider>
            </TeamContextProvider>
          </ProjectContextProvider>
        </StatisticsContextProvider>
      </OpenContextProvider>
    </AuthContextProvider>
  );
}

export function App() {
  const { user, setUser, setInitialized, setIsProcessing, setError } =
    useAuthContext();
  const { fetchTeams } = useTeamContext();
  const { dashboardStatistics, fetchDashboardStatistics } = useStatisticsContext()
  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
        fetchTeams();
        fetchDashboardStatistics()
      }
      setInitialized(true);
      setIsProcessing(false);
    };
    //console.log("App dashboardStatistics:", dashboardStatistics)
    const token = localStorage.getItem("bugtracker_token");

    if (token) {
      apiClient.setToken(token);
      setIsProcessing(true);
      setError(null);
      fetchUserInfo();
    }
    setIsProcessing(false);
    setInitialized(true);
  }, [setUser]);


  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {user?.email ? (
            <>
              <Navbar />
              <Sidebar />
            </>
          ) : (
            <NoUserNavbar />
          )}

          <Routes>
            <Route
              path="/"
              element={user?.email ? <Dashboard /> : <LandingPage />}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/tickets"
              element={<ProtectedRoute element={<TicketsPage />} />}
            />
            <Route
              path="/statistics"
              element={<ProtectedRoute element={<StatisticsPage />} />}
            />
            <Route
              path="/userprofile"
              element={<ProtectedRoute element={<UserProfile />} />}
            />
            <Route
              path="/teams"
              element={<ProtectedRoute element={<TeamsPage />} />}
            />
            <Route
              path="/settings"
              element={<ProtectedRoute element={<Settings />} />}
            />
            <Route
              path="/projects"
              element={<ProtectedRoute element={<ProjectsPage />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
