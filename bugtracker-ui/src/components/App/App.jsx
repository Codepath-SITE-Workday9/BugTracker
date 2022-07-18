import * as React from "react";
<<<<<<< HEAD
=======
import Navbar from "../Navbar/Navbar"
>>>>>>> ea6e83b5664646a8e20228e7a0d6f9094ceda098
import Sidebar from "../Sidebar/Sidebar";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import LandingPage from "../LandingPage/LandingPage";
import TicketsPage from "../TicketsPage/TicketsPage";
import StatisticsPage from "../StatisticsPage/StatisticsPage";
import UserProfile from "../UserProfile/UserProfile";
import TeamsPage from "../TeamsPage/TeamsPage";
import Settings from "../Settings/Settings";
import ProjectsPage from "../ProjectsPage/ProjectsPage";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Sidebar />
          <Navbar />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/" element={<LandingPage />} />
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
