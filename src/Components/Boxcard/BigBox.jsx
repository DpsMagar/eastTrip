"use client";

import { useState } from "react";
import HotelCard from './Box';
import "./BigBox.css";

function HotelTabs() {
    const [activeTab, setActiveTab] = useState("hotels");

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
            imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMMoI2RMPhGolymsIgGjvoOYoYz4T6df5Qsr90d=s1360-w1360-h1020-rw",
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
            imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMaqmZJjCqoPFZQrnLxijthZWfXpnaNUPajiJyr=s1360-w1360-h1020-rw",
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
            imageUrl: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2022/05/31/0504/KATHM-P0421-Pool-Daytime-View.jpg/KATHM-P0421-Pool-Daytime-View.4x3.jpg",
        },
        {
            hotelId: 4,
            hotelName: "The Dwarika's Hotel",
            formerName: "",
            rating: 5,
            hotelLocation: "Battisputali, Kathmandu",
            attraction: "Cultural heritage hotel",
            metroInfo: "",
            roomFeatures: "Heritage Deluxe Room",
            bedType: "King Bed",
            viewType: "Garden View",
            hotelFeatures: ["Spa", "Swimming Pool", "Cultural Programs"],
            topSelling: true,
            extraInfo: "Luxury hotel with traditional Nepali architecture",
            price: 200,
            ratingValue: 4.8,
            ratingText: "Exceptional",
            reviews: 345,
            imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOxmTP1OHxnPEH4amW3bXxganTERXoJGP57hjB7=s1360-w1360-h1020-rw",
        }
    ]
    
    const homestays = [
        {
            hotelId: 1,
            hotelName: "Blue Mountain Homestay",
            formerName: "",
            rating: 5,
            hotelLocation: "Thamel, Kathmandu",
            attraction: "Cultural experience",
            metroInfo: "",
            roomFeatures: "Private Room",
            bedType: "Queen Bed",
            viewType: "City View",
            hotelFeatures: ["Local Cuisine", "Cultural Tours"],
            topSelling: true,
            extraInfo: "Experience local culture and cuisine",
            price: 40,
            ratingValue: 4.9,
            ratingText: "Very Good",
            reviews: 150,
            imageUrl: "https://lh3.googleusercontent.com/p/AF1QipPWjEUjjDSn0kzqehnripOCY1ZF8W8-JS-6lPcS=s1360-w1360-h1020-rw",
        },
        {
            hotelId: 2,
            hotelName: "Heritage Mansion Homestay",
            formerName: "Rana Palace Residence",
            rating: 2,
            hotelLocation: "Lazimpat, Kathmandu",
            attraction: "Historical palace experience",
            metroInfo: "",
            roomFeatures: "Royal Suite",
            bedType: "King Bed",
            viewType: "Garden View",
            hotelFeatures: ["Private Butler", "Heritage Tours", "Fine Dining"],
            topSelling: true,
            extraInfo: "Live like Nepalese royalty in this restored palace",
            price: 280,
            ratingValue: 3.8,
            ratingText: "Exceptional",
            reviews: 210,
            imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4e/9a/9a/the-mansion.jpg?w=1200&h=-1&s=1"
        },
        {
            hotelId: 3,
            hotelName: "Boudha Zen Homestay",
            formerName: "",
            rating: 5,
            hotelLocation: "Boudha, Kathmandu",
            attraction: "Meditation retreat",
            metroInfo: "",
            roomFeatures: "Meditation Room",
            bedType: "Twin Bed",
            viewType: "Stupa View",
            hotelFeatures: ["Daily Yoga", "Meditation Sessions", "Vegetarian Meals"],
            topSelling: false,
            extraInfo: "Peaceful spiritual retreat with Boudhanath views",
            price: 180,
            ratingValue: 4.8,
            ratingText: "Excellent",
            reviews: 175,
            imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMzy-g-mbUcrDLkYNyi9jV4zwOU6FfaIzKR2hA=s1360-w1360-h1020-rw"
        },
        {
            hotelId: 4,
            hotelName: "Ananda Homestay",
            formerName: "",
            rating: 5,
            hotelLocation: "Kirtipur, Kathmandu",
            attraction: "Panoramic valley views",
            metroInfo: "",
            roomFeatures: "Valley View Suite",
            bedType: "King Bed",
            viewType: "Mountain View",
            hotelFeatures: ["Infinity Pool", "Spa", "Organic Garden"],
            topSelling: true,
            extraInfo: "Luxury eco-retreat with Himalayan views",
            price: 320,
            ratingValue: 4.9,
            ratingText: "Exceptional",
            reviews: 195,
            imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMKSPyqTIHtxp78ojXhpFlnQgdrKD7AFO1EH77r=s1360-w1360-h1020-rw"
        },
    ]

   
    const getTopEntries = (list) =>
        list
            .sort((a, b) => {
                if (b.ratingValue !== a.ratingValue) return b.ratingValue - a.ratingValue;
                if (b.rating !== a.rating) return b.rating - a.rating;
                return b.reviews - a.reviews;
            })
            .slice(0, 3);

    const displayedList = activeTab === "hotels" ? getTopEntries(hotels) : getTopEntries(homestays);

    return (
        <section className="page-content">
            <div className="hotel-tabs-container">
                <div className="tabs-header">
                    <h1>Recommended For You</h1>
                    <div className="tab-buttons">
                        <button
                            className={`tab-button ${activeTab === "hotels" ? "active" : ""}`}
                            onClick={() => setActiveTab("hotels")}
                        >
                            Hotel
                        </button>
                        <button
                            className={`tab-button ${activeTab === "homestays" ? "active" : ""}`}
                            onClick={() => setActiveTab("homestays")}
                        >
                            Homestay
                        </button>
                    </div>
                </div>

                <div className="hotel-listings">
                    {displayedList.map((hotel, index) => (
                        <HotelCard key={hotel.hotelId} hotel={hotel} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HotelTabs;
