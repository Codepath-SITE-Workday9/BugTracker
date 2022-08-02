import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../contexts/auth";
import apiClient from "../../services/apiClient";
import renderUserCharts from "../../services/userCharts.js";
import "../UserProfile/UserProfile.css"

export default function UserProfile() {
  const [userStats, setUserStats] = useState([])
   const [statsPerMonth, setStatsPerMonth] = useState([])

  async function getUserStatistics()
  {
    console.log("before stats")
      const statistics = await apiClient.getAllStatistics()
      console.log(statistics)
      setUserStats(statistics.data.statistics.perStatus)
      console.log(userStats)

       console.log("before progress")
       const progress = await apiClient.getProgressStatsOverTime()
        setStatsPerMonth(progress.data.statistics)
        //handleStats(progress.data.statistics, statsPerMonth)
  }

   useEffect(() => {
     getUserStatistics()
     renderUserCharts(statsPerMonth)
   }, [])
  
  return (
      <div className="user-profile-page">
          <ProfileCard />
          <UserTables userStats={userStats} statsPerMonth={statsPerMonth}/>
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
          <div className="photo-banner">
            {user?.imageUrl === null ? (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhgREKJpawVaEkD5aRXudpG-Q3gec7qWcSA&usqp=CAU" className="profile-image" ></img>) 
                       : (<img src={user.imageUrl} className="profile-image" ></img>)}
          </div>

          {/* All the User Information including their name and email and edit profile button to change user profile information*/}
          <div className="profile-info">
              <h1 className="profile-name">{user.fullName}</h1>
              <p className="email">Email: {user.email}</p>
              <p className="role">Role: Developer</p>
              <p className="email">Organization: A Place</p>
              <button className="edit-btn">Edit Profile</button>
          </div>
    </div>

  )
}

export function UserTables(props)
{
  // console.log(props.statsPerMonth)
  // renderUserCharts(props?.statsPerMonth)
    return(
        <div className="user-tables">
          {/* Renders User Statistics Cards To show Tickets open, in progress, and closed */}
            <h1> Your Ticket Statistics </h1>
            <div className="ticket-statistics">
                {props.userStats?.map((stat, index) => {
                    return(
                    <div className="ticket-cards" key={index}>
                      <div className="stats-text">
                        <h2>Tickets {stat.status}</h2>
                        <p> {stat.totaltickets} </p>
                      </div>
                    </div>)
                })}
            </div>

            <div className="chart-container">
              <canvas // Renders a bar chart for user statistics
                className="bar-chart"
                id="user-statistics-chart"
              ></canvas>
              <canvas // Renders a line chart for user statistics
                className="bar-chart"
                id="user-statistics-line-chart"
              ></canvas>
            </div>
        </div>
    )
}
