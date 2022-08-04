import NoUserNavbar from "./NoUserNavbar/NoUserNavbar";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import {useState} from "react";
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
        <h1>WELCOME TO TRACKER MAX</h1>
        <h2>
          Tracker Max, a powerfully easy system for tracking bugs in a
          world of complex bug trackers. This tracker allows to collaborate, ticket,
          and create your craziest project ideas with the click of a single button.
          Don't wait around, sign up now!
        </h2>
        <br></br>
        <Link to="/register">
          <button className="register-btn">SIGN UP NOW!</button>
        </Link>
      </div>
    </div>
  );
}


export function ContentNavigation()
{

  const sectionContent = [{value:"teams",name: "Work More Easily With Everyone", description: "Bugtracker provides you with all the necessary tools to collaborate with any team no matter how big or how small. Get quick information of all your collaborators!", point1: "Collaborate with multiple teams or individually", point2: "Assign teams to all your projects", point3:"Assign tickets to anyone who is on your team"},
                          {value:"projects",name: "Create Projects For All Your Big Ideas", description: "Bugtracker's simple design allows anyone and everyone to create a project with other teams or individually and begin bug tracking quickly. Get all your project information on a single page!", point1: "Streamline work by collaborating with other teams", point2: "Complete creative control over your projects", point3:"View all your tickets for your projects from one page"},
                          {value:"tickets",name: "Report Bugs In Seconds", description: "Bugtracker's simple issue ticketing system allows you to log bugs instantaneously and collaborate with your teams to resolve them. Get a complete picture of everything you need to know about your issues from the moment you log in!", point1: "Learn about tickets with the click of a button", point2: "Get overviews about your most complex tickets", point3:"Look at visual displays of your ticket statistics"},
                          {value:"statistics", name: "Optimize Your Performance", description: "Bugtracker provides you with all the statistics necessary to learn how quickly you solve tickets and the complexity of your projects over time. Get real time statistics with the click of a button!", point1: "Get Project Complexity Statistics Real Quick", point2: "Get Real Time Ticket Information", point3:"Look at visual charts to learn about your performance"}]
  const [content, setContent] = useState(sectionContent[0])


   const handleOnClick = (sectionName) =>
   {
      const searchResult = sectionContent.find((section) => section.value.includes(sectionName))
      setContent(searchResult)
   }

    return (
      <div className="content-nav">
          <h1 className="content-nav-title">Everything You Need For Seemless Workflow</h1>
          <div className="content-buttons">
              <button className="content-nav-buttons" value= "teams" onClick = {(evt) => handleOnClick(evt.target.value)}>Teams</button>
              <button className="content-nav-buttons" value= "projects" onClick = {(evt) => handleOnClick(evt.target.value)}>Projects</button>
              <button className="content-nav-buttons" value= "tickets" onClick = {(evt) => handleOnClick(evt.target.value)}>Tickets</button>
              <button className="content-nav-buttons" value= "statistics" onClick = {(evt) => handleOnClick(evt.target.value)}>Statistics</button>
          </div>

          <div className="content-nav-sections">
              <div className="content-section-info">
                  <h2 id="section-name">{content.name}</h2>
                  <p id="section-description">{content.description}</p>

                  
                  <div className="section-checks">
                      <span className="material-symbols-outlined">
                          check_circle
                      </span>
                      <p>{content.point1}</p>
                  </div>
                  <div className="section-checks">
                      <span className="material-symbols-outlined">
                          check_circle
                      </span>
                      <p>{content.point2}</p>
                  </div>
                  <div className="section-checks">
                      <span className="material-symbols-outlined">
                          check_circle
                      </span>
                      <p>{content.point3}</p>
                  </div>
              </div>
              <div className="content-section-img">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yV7X25H2CyiqP-JiWnSN2FBqv51m96rMsQ&usqp=CAU" id="content-section-gifs"></img>
              </div>
          </div>
      </div>
    )
}
