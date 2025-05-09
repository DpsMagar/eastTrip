"use client"

import { useState } from "react"
import ProfileInfo from "../../Components/SA-PlayerDashboard/SAProfileInfo"
import RecentBookings from "../../Components/SA-PlayerDashboard/SARecentBookings"
import NonProfile from "../../Assest/nonprofile.png"
import Properties from "../../Components/PlayerDashboard/Properties"
import "./DashBoard.css"
import Trophy from '../../Assest/trophy.png'
import profile1 from "../../Assest/profile.png"
import booking from "../../Assest/booking.png"
import { RiHotelFill } from "react-icons/ri";
import dumby from "../../Assest/hotelimage.png"

export default function SATDashBoard() {
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

  const initialProperties = [
    { 
      id: 1, 
      ImgUrl: dumby, 
      name: "Hotel Everest", 
      PropertyType: "Hotel", 
      Rating: 4,
      Location: "Kathmandu"
    },
    { 
      id: 2, 
      ImgUrl: dumby, 
      name: "Hotel Annapurna", 
      PropertyType: "Hotel", 
      Rating: 5,
      Location: "Lalitpur"
    },
    { 
      id: 3, 
      ImgUrl: dumby, 
      name: "Hotel Pokhara", 
      PropertyType: "Hotel", 
      Rating: 3,
      Location: "Pokhara"
    },
    { 
      id: 4, 
      ImgUrl: dumby, 
      name: "Hotel Bhaktapur", 
      PropertyType: "Hotel", 
      Rating: 4,
      Location: "Bhaktapur"
    },
    { 
      id: 5, 
      ImgUrl: dumby, 
      name: "Hotel Chitwan", 
      PropertyType: "Hotel", 
      Rating: 5,
      Location: "Chitwan"
    },
    { 
      id: 6, 
      ImgUrl: dumby, 
      name: "Hotel Lumbini", 
      PropertyType: "Hotel", 
      Rating: 4,
      Location: "Lumbini"
    },
    { 
      id: 7, 
      ImgUrl: dumby, 
      name: "Hotel Janakpur", 
      PropertyType: "Hotel", 
      Rating: 3,
      Location: "Janakpur"
    },
    { 
      id: 8, 
      ImgUrl: dumby, 
      name: "Hotel Biratnagar", 
      PropertyType: "Hotel", 
      Rating: 4,
      Location: "Biratnagar"
    },
  ];

  const getProfileImage = () => {
    if (profile.ProfileImage && profile.ProfileImage.trim() !== "") {
      return profile.ProfileImage
    }
    return NonProfile.src
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
            className={`nav-item ${activeTab === "properties" ? "active" : ""}`}
            onClick={() => setActiveTab("properties")}
          >
            <div className="logo-nav">
              <RiHotelFill alt="Properties" />
            </div>
            Properties
          </button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && <ProfileInfo profile={profile} />}
        {activeTab === "bookings" && <RecentBookings bookings={recentBookings} />}
        {activeTab === "properties" && (
          <div className="properties-container">
            <h2 className="properties-title">Properties</h2>
            <Properties initialProperties={initialProperties} />
          </div>
        )}
      </div>
    </div>
  )
}