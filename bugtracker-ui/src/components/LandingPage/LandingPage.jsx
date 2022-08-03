import NoUserNavbar from "./NoUserNavbar/NoUserNavbar";
import "./LandingPage.css";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero-page">
        <Hero />
      </div>
      <ContentNavigation />
    </div>
  );
}

export function Hero() {
  return (
    <div className="hero">
      {/* ALL HERO INFORMATION INCLUDING BUG TRACKER DESCRIPTION AND BACKGROUND IMAGE OF TEAM COLLABORATORS*/}
      <div className="hero-content">
        <div className="hero-logo">
          <span className="material-symbols-outlined">emoji_nature</span>
        </div>
        <h1>WELCOME TO BUG TRACKER</h1>
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </h2>
        <Link to="/register">
          <button className="register-btn">SIGN UP NOW!</button>
        </Link>
      </div>
    </div>
  );
}


export function ContentNavigation()
{
    return (
      <div className="content-nav">
          <h1 className="content-nav-title">Everything You Need For Seemless Workflow</h1>
          <div className="content-buttons">
              <button className="content-nav-buttons">Teams</button>
              <button className="content-nav-buttons">Projects</button>
              <button className="content-nav-buttons">Tickets</button>
              <button className="content-nav-buttons">Statistics</button>
          </div>

          <div className="content-nav-sections">
              <div className="content-section-info">
                  <h2 id="section-name">SECTION NAME</h2>
                  <p id="section-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>

                  
                  <div className="section-checks">
                      <span class="material-symbols-outlined">
                          check_circle
                      </span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                  </div>
                  <div className="section-checks">
                      <span class="material-symbols-outlined">
                          check_circle
                      </span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                  </div>
                  <div className="section-checks">
                      <span class="material-symbols-outlined">
                          check_circle
                      </span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                  </div>
              </div>
              <div className="content-section-img">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yV7X25H2CyiqP-JiWnSN2FBqv51m96rMsQ&usqp=CAU" id="content-section-gifs"></img>
              </div>
          </div>
      </div>
    )
}
