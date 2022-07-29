import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/auth";
import { DashboardProjectsTable } from "../Tables/DashboardProjectsTable";
import { DashboardTeamsTable } from "../Tables/DashboardTeamsTable";
import renderCharts from "../../services/charts.js";
import "../UserProfile/UserProfile.css"

export default function UserProfile() {

  return (
      <div className="user-profile-page"> 
          <ProfileCard />
          <UserTables />
      </div>
  )
}

export function ProfileCard()
{
      //Pulls the user from the auth context information of the logged in user
  const { user } = useAuthContext();

  return (
    <div className="profile-page">
          {/* Creates a photo banner with background image and user profile photo
              Conditionally render the image; If no image provided, add a default image for the user */}
          <div class="photo-banner">
            {user?.imageUrl === null ? (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhgREKJpawVaEkD5aRXudpG-Q3gec7qWcSA&usqp=CAU" className="profile-image" ></img>) 
                       : (<img src={user.imageUrl} className="profile-image" ></img>)}
          </div>

          {/* All the User Information including their name and email and edit profile button to change user profile information*/}
          <div className="profile-info">
              <h1 class="profile-name">{user.fullName}</h1>
              <p class="email">Email: {user.email}</p>
              <p class="role">Role: Developer</p>
              <p class="email">Organization: A Place</p>
              <button class="edit-btn">Edit Profile</button>
          </div>
    </div>

  )
}

export function UserTables()
{
    return(
        <div className="user-tables">
            <h1> Your Ticket Statistics </h1>
            <div className="ticket-statistics">
                <div className="ticket-cards">
                  <div className="stats-text">
                    <h2>Tickets Open</h2>
                    <p> 0 </p>
                  </div>
                </div>
                <div className="ticket-cards">
                  <div className="stats-text">
                    <h2>Tickets In Progress</h2>
                    <p> 0 </p>
                  </div>
                </div>
                <div className="ticket-cards">
                  <div className="stats-text">
                    <h2>Tickets Closed</h2>
                    <p> 0 </p>
                  </div>
                </div>
            </div>
            <div className="chart-container">
              <canvas // Renders a donut chart for category statistics
                className="donut-chart"
                id="category-chart"
                //width="20%"
                //height="auto"
                //maintainAspectRatio={false}
                //width="800"
                //height="450"
              ></canvas>
            </div>
        </div>
    )
}
