import * as React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen, handleOnToggle }) {
  //isOpen = false;
  console.log(isOpen)
  return (
    <div className="sidebar" onMouseOver={() => setIsOpen(true)} onMouseOut={() => setIsOpen(false)}>
      <div className={isOpen ? "sidebar open" : "sidebar closed"}>
        <ClosedSideBar />
        { /* isOpen ? <OpenSideBar isOpen={isOpen} /> : <ClosedSideBar /> */}
      </div>
    </div>
  );
}

export function OpenSideBar() {
  return <div></div>;
}

export function ClosedSideBar() {
  return (
    <div className="sidebar-icons">
      <div className="sidebar-logo">
        <Link to="/">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">circle</span>
            <span className="icon-text"> Bug tracker </span>
          </div>
        </Link>
      </div>
      <div className="top-sidebar">
        <Link to="/dashboard">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">desktop_windows</span>
            <span className="icon-text"> Dashboard </span>
          </div>
        </Link>
      </div>
      <div className="middle-sidebar">
        <Link to="/tickets">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">
              confirmation_number
            </span>
            <span className="icon-text"> Tickets </span>
          </div>
        </Link>
        <Link to="/teams">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">groups</span>
            <span className="icon-text"> Teams </span>
          </div>
        </Link>
        <Link to="/projects">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">query_stats</span>
            <span className="icon-text"> Projects</span>
          </div>
        </Link>
        <Link to="/statistics">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">work</span>
            <span className="icon-text"> Statistics </span>
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
        <Link to="/settings">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">settings</span>
            <span className="icon-text"> Settings </span>
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined">logout</span>
            <span className="icon-text"> Log out </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
