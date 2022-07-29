import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/auth";
import "../UserProfile/UserProfile.css"

export default function UserProfile() {
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
              <button class="edit-btn">Edit Profile</button>
          </div>
    </div>

  )
}
