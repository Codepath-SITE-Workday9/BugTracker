import * as React from "react";
import "./Sidebar.css";

export default function Sidebar({ isOpen, handleOnToggle }) {
  isOpen = false;
  return (
    <div className="sidebar">
      <div className={isOpen ? "sidebar open" : "sidebar closed"}>
        {isOpen ? <OpenSideBar isOpen={isOpen} /> : <ClosedSideBar />}
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
        <div className="sidebar-icon">
          <span class="material-symbols-outlined">circle</span>
          <label> Bug tracker </label>
        </div>
      </div>
      <div className="top-sidebar">
        <div className="sidebar-icon">
          <span className="material-symbols-outlined">desktop_windows</span>
          <label> Dashboard </label>
        </div>
      </div>
      <div className="middle-sidebar">
        <div className="sidebar-icon">
          <span className="material-symbols-outlined">confirmation_number</span>
          <label> Tickets </label>
        </div>

        <div className="sidebar-icon">
          <span className="material-symbols-outlined">groups</span>
          <label> Teams </label>
        </div>

        <div className="sidebar-icon">
          <span className="material-symbols-outlined">query_stats</span>
          <label> Projects</label>
        </div>
        <div className="sidebar-icon">
          <span className="material-symbols-outlined">work</span>
          <label> Statistics </label>
        </div>
      </div>
      <div className="bottom-sidebar">
        <div className="sidebar-icon">
          <span className="material-symbols-outlined">account_circle</span>
          <label> Profile </label>
        </div>
        <div className="sidebar-icon">
          <span className="material-symbols-outlined">settings</span>
          <label> Settings </label>
        </div>
        <div className="sidebar-icon">
          <span className="material-symbols-outlined">logout</span>
          <label> Log out </label>
        </div>
      </div>
    </div>
  );
}
