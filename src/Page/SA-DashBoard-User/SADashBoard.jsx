"use client"

import { useState } from "react"
import ProfileInfo from "../../Components/SA-PlayerDashboard/SAProfileInfo"
import RecentBookings from "../../Components/SA-PlayerDashboard/SARecentBookings"
import NonProfile from "../../Assest/nonprofile.png"

import "./DashBoard.css"
import Trophy from '../../Assest/trophy.png'
import profile1 from "../../Assest/profile.png"
import booking from "../../Assest/booking.png"


export default function SADashBoard() {
  const [activeTab, setActiveTab] = useState("profile")

  const profile = {
    ProfileImage: "https://pbs.twimg.com/media/CBOD2lJVAAAAg6b.jpg",
    Firstname: "John",
    Lastname: "Doe",
    Email: "john.doe@gmail.com",
    Phone: "1234567890",
    Address: "123 Main St, City, Country",
    country: "USA",
    district: "District 1",
    gender: "male",
    martialStatus: "Married",
    DateOfBirth: "01/01/1990",
    "passport no": "1111111",
    "Issuing place": "usa",
    "expiry date": "01/01/2030",
    rewardpoint: 5000,
  }

  const recentBookings = [
    {
      id: "FL123456",
      type: "Flight",
      destination: "London to Paris",
      date: "Mar 15, 2025",
      status: "Upcoming",
    },
    {
      id: "H1789012",
      type: "Hotel",
      destination: "Hilton Hotel",
      date: "Feb 20-22, 2025",
      status: "Completed",
    },
  ]

 

  const getProfileImage = () => {
    if (profile.ProfileImage && profile.ProfileImage.trim() !== "") {
      return profile.ProfileImage
    }
    return {NonProfile}
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img src={getProfileImage()} alt="Profile" className="avatar-img" />
          <h3 className="profile-name">{profile.Firstname} {profile.Lastname}</h3>
          <p className="profile-email">{profile.Email}</p>
          <div className="rewardpoint">
            <div className="logo">
              <img src={Trophy} alt="Trophy" />
            </div>
            <div className="rewardpoint-text-container">
              <h3 className="rewardpoint-text">Reward Points</h3>
              <p className="rewardpoint-value">{profile.rewardpoint}</p>
            </div>
          </div>
        </div>

        <div className="profile-navigation">
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <div className="logo-nav">
              <img src={profile1} alt="Profile" />
            </div>
            Profile
          </button>

          <button
            className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <div className="logo-nav">
              <img src={booking} alt="Booking" />
            </div>
            Bookings
          </button>


        </div>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && <ProfileInfo profile={profile} />}
        {activeTab === "bookings" && <RecentBookings bookings={recentBookings} />}

      </div>
    </div>
  )
}
