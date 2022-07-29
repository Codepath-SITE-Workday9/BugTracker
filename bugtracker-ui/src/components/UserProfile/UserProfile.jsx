import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/auth";
import "../UserProfile/UserProfile.css"

export default function UserProfile() {
  const { user } = useAuthContext();
  console.log(user)
  // {user?.imageUrl === null ? (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhgREKJpawVaEkD5aRXudpG-Q3gec7qWcSA&usqp=CAU" className="user-image" ></img>) 
  //                     : (<img src={user.imageUrl} className="user-image" ></img>)}
  return (
    <div className="profile-page">
          <div class="photo-banner">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPFZsvVgVpGF7G4AxxzoeG13aPTKBhYm7PAg&usqp=CAU" class="profile-image"></img> */}
            {user?.imageUrl === null ? (<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhgREKJpawVaEkD5aRXudpG-Q3gec7qWcSA&usqp=CAU" className="profile-image" ></img>) 
                       : (<img src={user.imageUrl} className="profile-image" ></img>)}
          </div>
          <div className="profile-info">
              <h1 class="profile-name">{user.fullName}</h1>
              <p class="email">Email: {user.email}</p>
              <button class="edit-btn">Edit Profile</button>
          </div>
    </div>

  )
}
