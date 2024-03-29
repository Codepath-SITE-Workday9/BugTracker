import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../contexts/auth";
import apiClient from "../../services/apiClient";
import renderUserCharts from "../../services/userCharts.js";
import "../UserProfile/UserProfile.css"

export default function UserProfile() {
   const [userStats, setUserStats] = useState([])
   const [statsPerMonth, setStatsPerMonth] = useState()
   const [complexityPerMonth, setComplexityPerMonth] = useState()

   //FUNCTION TO GET ALL USER STATISTICS OF TICKETS OPENED/CLOSED
   async function getUserStatistics()
   {
       const statistics = await apiClient.getAllStatistics()
       setUserStats(statistics.data.statistics.perStatus)

      const progress = await apiClient.getProgressStatsOverTime()
      setStatsPerMonth(progress.data.statistics)

      const complexity = await apiClient.getComplexityOverTime()
      setComplexityPerMonth(complexity.data.complexity)

   }

    useEffect(() => {
      getUserStatistics()
    }, [])

    if(statsPerMonth && complexityPerMonth)
    {
        renderUserCharts(statsPerMonth, complexityPerMonth)
    }
  
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
          </div>
    </div>

  )
}

export function UserTables(props)
{

    return(
        <div className="user-tables">
          {/* Renders User Statistics Cards To show Tickets open, in progress, and closed */}
            <h1> Your Ticket Statistics </h1>
            <div className="ticket-stats">
                {props.userStats?.map((stat, index) => {
                    return(
                    <div className="ticket-cards" key={index}>
                      <div className="stats-text">
                        <h2 id="stats-title">Tickets {stat.status}</h2>
                        <p id="stats-value"> {stat.totaltickets} </p>
                      </div>
                    </div>)
                })}
            </div>

            <div className="chart-container">
              {/* Renders a bar chart for tickets completed over time based on complexity */}
              <canvas
                className="bar-chart"
                id="user-statistics-chart"
              ></canvas>
            </div>
            <div className="chart-container">
              {/* Renders a line chart for tickets opened and closed over time */}
              <canvas
                className="line-chart"
                id="user-statistics-line-chart"
              ></canvas>
            </div>
        </div>
    )
}
