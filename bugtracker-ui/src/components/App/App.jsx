import * as React from "react";
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

// import Home from "../Home/Home"
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Sidebar />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
