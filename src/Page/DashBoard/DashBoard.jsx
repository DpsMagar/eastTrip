"use client"

import { useState } from "react"
import ProfileInfo from "../../Components/PlayerDashboard/ProfileInfo"
import RecentBookings from "../../Components/PlayerDashboard/RecentBookings"
import RewardBox from "../../Components/PlayerDashboard/RewardBox"
import "./DashBoard.css"
import Trophy from '../../Assest/trophy.png'
import profile1 from "../../Assest/profile.png"
import booking from "../../Assest/booking.png"
import redeem from "../../Assest/redeem.png"

export default function DashBoard() {
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

  const Reward = [
    {
      id: 1,
      TitleImage: "https://media.app.nepalguidetrekking.com/uploads/media/BlogImages/Rara-Lake-View.jpg",
      Title: "Rara Lake visit",
      RewardCost: 10000
    },
    {
      id: 2,
      TitleImage: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Estadio_Santiago_Bernabéu_Madrid.jpg",
      Title: "Santiago Bernabéu visit",
      RewardCost: 30000
    }
  ]

  const getProfileImage = () => {
    if (profile.ProfileImage && profile.ProfileImage.trim() !== "") {
      return profile.ProfileImage
    }
    return "/placeholder.svg?height=100&width=100"
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
            My Profile
          </button>

          <button
            className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <div className="logo-nav">
              <img src={booking} alt="Booking" />
            </div>
            My Bookings
          </button>

          <button
            className={`nav-item ${activeTab === "Redeem Points" ? "active" : ""}`}
            onClick={() => setActiveTab("Redeem Points")}
          >
            <div className="logo-nav">
              <img src={redeem} alt="Redeem Points" />
            </div>
            Redeem Points
          </button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && <ProfileInfo profile={profile} />}
        {activeTab === "bookings" && <RecentBookings bookings={recentBookings} />}
        {activeTab === "Redeem Points" && (
          <div className="rewards-container">
            <h2 className="rewards-title">Redeem Your points</h2>
            <div className="Reward-box">
            {Reward.map((rewardItem) => (
              <RewardBox key={rewardItem.id} Reward={rewardItem} />
            ))}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
