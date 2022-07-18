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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import NoUserNavbar from "../LandingPage/NoUserNavbar/NoUserNavbar";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  //const {user} = useAuthContext();

  // fake user boolean for routing testing
  var exampleUser = true;

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {exampleUser ? (
            <>
              <Navbar isOpen={isOpen} />
              <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </>
          ) : (
            <NoUserNavbar />
          )}

          <Routes>
            <Route
              path="/"
              element={exampleUser ? <Dashboard /> : <LandingPage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
