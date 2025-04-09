"use client"

import { useState } from "react"
import HotelCard from './Box';
import "./BigBox.css"

function HotelTabs() {
  const [activeTab, setActiveTab] = useState("popular")
  const dumby = "https://lh3.googleusercontent.com/p/AF1QipMd4VA7pfadcudwAyE-kMvQyoprQsmxBRYaDDmy=s1360-w1360-h1020"

  
  const hotels = [
    {
      id: 1,
      name: "THE PARK HOTEL",
      formerName: "formerly Al Jawhara Gardens Hotel",
      stars: 4,
      location: "Deira",
      walkTime: "6 minutes walk to City Centre Deira",
      metroInfo: "7 minutes walk to Deira City Centre Metro Station",
      roomType: "Deluxe Twin Or King Room",
      bedType: "Twin Bed",
      viewType: "City View",
      amenities: ["Spa", "Swimming Pool", "Gym"],
      topSelling: true,
      bookings: 130,
      offers: "Offers wellness facilities and modern rooms",
      price: 31,
      taxes: 7,
      rating: 3.8,
      ratingText: "Very Good",
      reviews: 257,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
    },
    {
      id: 2,
      name: "Grand Kingsgate Waterfront",
      formerName: "By Millennium Hotels",
      stars: 4,
      location: "Jaddaf Waterfront",
      walkTime: "",
      metroInfo: "",
      roomType: "Standard King Room",
      bedType: "King Bed",
      viewType: "",
      amenities: ["Spa", "Swimming Pool", "Gym"],
      topSelling: false,
      bookings: 0,
      offers: "Extensive Turkish and Lebanese fusion restaurant",
      price: 35,
      taxes: 8,
      rating: 3.7,
      ratingText: "Very Good",
      reviews: 295,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
    },
    {
      id: 3,
      name: "Queen's Hotel",
      formerName: "",
      stars: 2,
      location: "Deira",
      walkTime: "8 minutes walk to Dubai Gold Souk",
      metroInfo: "",
      roomType: "Double Room",
      bedType: "King Bed",
      viewType: "City View",
      amenities: ["Swimming Pool", "Elevator/Lift"],
      topSelling: false,
      bookings: 0,
      offers: "Hurry: only last few rooms left at this price",
      price: 29,
      taxes: 7,
      rating: 3.2,
      ratingText: "Good",
      reviews: 130,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
    },
  ]

  const plane ={
    "airway logo": "https://www.buddhaair.com/images/logo.png",
    "airway": "Buddha Air",
    "flight number": "BHA123",
    "to": "Pokhara",
    "from": "Kathmandu",
    "tocode": "PKR",
    "fromcode": "KTM",
    "toairport": "Pokhara Airport",
    "fromairport": "Tribhuvan International Airport",
    "flight duration": "30 minutes",
    "departure": "9:00 AM",
    "arrival": "9:30 AM",
    "price": 5000,
    "class": "Economy",
    "available seats": 50,
    "total seats": 100,
}
  return (
    <section className="page-content">
    <div className="plane-tabs-container"></div>
    <div className="hotel-tabs-container">
      {/* Simple tabs at the top */}
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === "popular" ? "active" : ""}`}
          onClick={() => setActiveTab("popular")}
        >
          Popular Hotel 🔥🔥🔥
        </button>
        <button
          className={`tab-button ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => setActiveTab("hotels")}
        >
          
        </button>
        <button
          className={`tab-button ${activeTab === "homestays" ? "active" : ""}`}
          onClick={() => setActiveTab("homestays")}
        >
          
        </button>
      </div>

      {/* Hotel listings */}
      <div className="hotel-listings">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
    
    
    </section>
  )
}

export default HotelTabs