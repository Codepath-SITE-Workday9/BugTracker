import * as React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useOpenContext } from "../../contexts/open";
import { useAuthContext } from "../../contexts/auth";
import { useTicketContext } from "../../contexts/ticket";
import { useTeamContext } from "../../contexts/team";
import { useStatisticsContext } from "../../contexts/statistics";
import { useProjectContext } from "../../contexts/project";

export default function Sidebar() {
  const { setIsOpen } = useOpenContext();
  return (
    <div
      className="sidebar"
      onMouseOver={() => setIsOpen(true)}
      onMouseOut={() => setIsOpen(false)}
    >
      <SideBarIcons />
    </div>
  );
}

export function SideBarIcons() {
  const { logoutUser } = useAuthContext();
  const { clearTicketContext } = useTicketContext();
  const { clearTeamContext } = useTeamContext();
  const { clearStatisticsContext } = useStatisticsContext();
  const { clearProjectContext } = useProjectContext();

  const logout = () => {
    clearTicketContext();
    clearTeamContext();
    clearStatisticsContext();
    clearProjectContext();
    logoutUser();
  };

  return (
    <div className="sidebar-icons">
      <div className="sidebar-logo">
        <Link to="/">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">bug_report</span>
            <span className="icon-text"> Tracker Max </span>
          </div>
        </Link>
      </div>
      <div className="middle-sidebar">
        <Link to="/dashboard">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">desktop_windows</span>
            <span className="icon-text"> Dashboard </span>
          </div>
        </Link>
        <Link to="/projects">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">work</span>
            <span className="icon-text"> Projects</span>
          </div>
        </Link>
        <Link to="/teams">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">groups</span>
            <span className="icon-text"> Teams </span>
          </div>
        </Link>
        <Link to="/tickets">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">
              confirmation_number
            </span>
            <span className="icon-text"> Tickets </span>
          </div>
        </Link>
      </div>
      <div className="bottom-sidebar">
        <Link to="/userprofile">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="icon-text"> Profile </span>
          </div>
        </Link>
        {/*<Link to="/settings">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">settings</span>
            <span className="icon-text"> Settings </span>
          </div>
  </Link> */}
        <Link to="/">
          <div className="sidebar-icon" onClick={logout}>
            <span className="material-symbols-outlined">logout</span>
            <span className="icon-text"> Log Out </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
