"use client"

import { useEffect, useState } from "react"
import ProfileInfo from "../../Components/PlayerDashboard/ProfileInfo"
import RecentBookings from "../../Components/PlayerDashboard/RecentBookings"
import RewardBox from "../../Components/PlayerDashboard/RewardBox"
import "./DashBoard.css"
import Trophy from '../../Assest/trophy.png'
import profile1 from "../../Assest/nonprofile.png"
import booking from "../../Assest/booking.png"
import redeem from "../../Assest/redeem.png"
import axios from "axios"

export default function DashBoard() {
const userId= sessionStorage.getItem('userId');
const[userInfo, setUserInfo]= useState([])
  useEffect(()=>{
    axios
    .get(`http://localhost:8080/api/users/id/${userId}`)
    .then((response)=>{
      setUserInfo(response.data)
    })
  },[userId])
  console.log("user infoooo", userInfo);
  
  const [activeTab, setActiveTab] = useState("bookings")
  const [showToast, setShowToast] = useState(false)
  const [rewards, setRewards] = useState([
    {
      id: 1,
      TitleImage: "https://media.app.nepalguidetrekking.com/uploads/media/BlogImages/Rara-Lake-View.jpg",
      Title: "Rara Lake visit",
      RewardCost: 100
    },
    {
      id: 2,
      TitleImage: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Estadio_Santiago_Bernabéu_Madrid.jpg",
      Title: "Santiago Bernabéu visit",
      RewardCost: 10000
    }
  ])

  const profile = {
    ProfileImage: profile1,
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
    return "/placeholder.svg?height=100&width=100"
  }

  const handleRedeem = (rewardId) => {
    setRewards(rewards.filter(reward => reward.id !== rewardId))
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="oprofile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img src={getProfileImage()} alt="Profile" className="avatar-img" />
          <h3 className="profile-name">{userInfo.fullName}</h3>
          <p className="profile-email">{userInfo.email}</p>
          <div className="rewardpoint">
            <div className="logo">
              <img src={Trophy} alt="Trophy" />
            </div>
            <div className="rewardpoint-text-container">
              <h3 className="rewardpoint-text">Reward Points</h3>
              <p className="rewardpoint-value">{userInfo.rewardPoints}</p>
            </div>
          </div>
        </div>

        <div className="profile-navigation">
          {/* <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <div className="logo-nav">
              <img src={profile1} alt="Profile" />
            </div>
            My Profile
          </button> */}

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
              {rewards.map((rewardItem) => (
                <RewardBox 
                  key={rewardItem.id} 
                  value={userInfo.rewardPoints}
                  Reward={rewardItem} 
                  onRedeem={handleRedeem}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showToast && (
        <div className="success-toast">
          Reward redeemed successfully!
        </div>
      )}
    </div>
  )
}