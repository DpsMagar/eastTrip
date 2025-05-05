"use client"

import { useState } from "react"
import HotelCard from './Box';
import "./BigBox.css"

function HotelTabs() {
    
    const [activeTab, setActiveTab] = useState("popular")
    
    
    const hotels = [
        {
            hotelId: 1,
            hotelName: "Yak & Yeti Hotel",
            formerName: "",
            rating: 5,
            hotelLocation: "Durbar Marg, Kathmandu",
            attraction: "5 minutes walk to Thamel",
            metroInfo: "",
            roomFeatures: "Deluxe Room",
            bedType: "King Bed",
            viewType: "Garden View",
            hotelFeatures: ["Spa", "Swimming Pool", "Gym", "Restaurant"],
            topSelling: true,
            extraInfo: "Historic luxury hotel with beautiful gardens",
            price: 120,
            ratingValue: 4.5,
            ratingText: "Excellent",
            reviews: 842,
            image: "https://lh3.googleusercontent.com/p/AF1QipMMoI2RMPhGolymsIgGjvoOYoYz4T6df5Qsr90d=s1360-w1360-h1020-rw",
        },
        {
            hotelId: 2,
            hotelName: "Hotel Shanker",
            formerName: "",
            rating: 4,
            hotelLocation: "Lazimpat, Kathmandu",
            attraction: "10 minutes walk to Kaiser Mahal",
            metroInfo: "",
            roomFeatures: "Heritage Room",
            bedType: "Queen Bed",
            viewType: "Palace View",
            hotelFeatures: ["Heritage Building", "Swimming Pool", "Garden"],
            topSelling: true,
            extraInfo: "Converted from a 19th century Rana palace",
            price: 90,
            ratingValue: 4.3,
            ratingText: "Very Good",
            reviews: 567,
            image: "https://lh3.googleusercontent.com/p/AF1QipMaqmZJjCqoPFZQrnLxijthZWfXpnaNUPajiJyr=s1360-w1360-h1020-rw",
        },
        {
            hotelId: 3,
            hotelName: "Hyatt Regency Kathmandu",
            formerName: "",
            rating: 5,
            hotelLocation: "Boudha, Kathmandu",
            attraction: "Near Boudhanath Stupa",
            metroInfo: "",
            roomFeatures: "Regency Club Room",
            bedType: "King Bed",
            viewType: "Stupa View",
            hotelFeatures: ["Spa", "Swimming Pool", "Yoga Classes"],
            topSelling: false,
            extraInfo: "Peaceful retreat with views of Boudhanath",
            price: 150,
            ratingValue: 4.6,
            ratingText: "Excellent",
            reviews: 923,
            image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/430692688.jpg?k=5a0f144acafd427e7ff82b3abffb2160416bfa532688fa9d69b1235c59d6780d&o=&hp=1",
        },
    ]

    return (
        <section className="page-content">
            <div className="plane-tabs-container"></div>
            <div className="hotel-tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-button ${activeTab === "popular" ? "active" : ""}`}
                        onClick={() => setActiveTab("popular")}
                    >
                        Recommend Hotel 
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

                <div className="hotel-listings">
                    {hotels.map((hotel, index) => (
                        <HotelCard key={hotel.hotelId} hotel={hotel} index={index} />
                    ))}
                </div>
            </div>  
        </section>
    )
}

export default HotelTabs