import "./NoUserNavbar.css";
import { Link } from "react-router-dom";

export default function NoUserNavbar() {
  return (
    <div className="nouser-navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="logo">
            <Link to="/">
              <div className="navbar-btn">
                <span className="material-symbols-outlined">bug_report</span>
                <label className="link-label">Bug Tracker</label>
              </div>
            </Link>
          </div>
        </div>

        <div className="navbar-right">
          <Link to="/login">
            <div className="navbar-btn">
              <label className="link-label">Login</label>
            </div>
          </Link>
          <Link to="/register">
            <div className="navbar-btn">
              <label className="link-label">Register</label>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
