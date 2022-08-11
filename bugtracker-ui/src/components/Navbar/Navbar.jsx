import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useOpenContext } from "../../contexts/open";

export default function Navbar() {
  const { isOpen } = useOpenContext();
  const [header, setHeader] = useState("DASHBOARD");
  useEffect(() => {
    const url = window.location.href;
    if (url.indexOf(header) == -1) {
      if (url.indexOf("tickets") > -1) {
        setHeader("TICKETS");
      } else if (url.indexOf("projects") > -1) {
        setHeader("PROJECTS");
      } else if (url.indexOf("teams") > -1) {
        setHeader("TEAMS");
      } else if (url.indexOf("statistics") > -1) {
        setHeader("STATISTICS");
      } else if (url.indexOf("dashboard") > -1) {
        setHeader("DASHBOARD");
      } else if (url.indexOf("userprofile") > -1) {
        setHeader("PROFILE");
      } else if (url.indexOf("settings") > -1) {
        setHeader("SETTINGS");
      }
    }
  }, [window.location.href]);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className={isOpen ? "navbar-left-open" : "navbar-left-closed"}>
          <h>{header}</h>
        </div>

        <div className="navbar-right">
          <Link to="/userprofile">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
