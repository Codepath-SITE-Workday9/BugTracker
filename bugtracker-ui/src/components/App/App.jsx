import * as React from "react";
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

// import Home from "../Home/Home"
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

export default function App() {
const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
          <Navbar />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
