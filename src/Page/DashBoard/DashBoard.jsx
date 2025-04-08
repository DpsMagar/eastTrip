"use client"

import { useState } from "react"
import ProfileInfo from "../../Components/PlayerDashboard/ProfileInfo"
import RecentBookings from "../../Components/PlayerDashboard/RecentBookings"
import "./DashBoard.css"

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

  // Function to get profile image with fallback
  const getProfileImage = () => {
    if (profile.ProfileImage && profile.ProfileImage.trim() !== "") {
      return profile.ProfileImage
    }
    // Return default avatar image if ProfileImage is empty
    return "/placeholder.svg?height=100&width=100"
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img src={getProfileImage() || "/placeholder.svg"} alt="Profile" className="avatar-img" />
          <h3 className="profile-name">
            {profile.Firstname} {profile.Lastname}
          </h3>
          <p className="profile-email">{profile.Email}</p>
        </div>

        <div className="profile-navigation">
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            My Profile
          </button>

          <button
            className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            My Bookings
          </button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === "profile" ? <ProfileInfo profile={profile} /> : <RecentBookings bookings={recentBookings} />}
      </div>
    </div>
  )
}

