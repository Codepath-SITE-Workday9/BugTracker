import * as React from "react";
// import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar";
// import Home from "../Home/Home"
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <main>
        <Sidebar></Sidebar>
      </main>
    </div>
  );
}
