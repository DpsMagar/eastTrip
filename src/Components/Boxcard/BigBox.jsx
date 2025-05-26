"use client";

import { useState } from "react";
import HotelCard from './Box';
import "./BigBox.css";

function HotelTabs() {
    const [activeTab, setActiveTab] = useState("hotels");

const hotels = [
    {
        hotelId: 57,
        hotelName: "Grand Kathmandu Hotel",
        formerName: "",
        rating: 4,
        hotelLocation: "Kathmandu",
        attraction: "10 mins from Tinkune Park",
        metroInfo: "",
        roomFeatures: [],
        bedType: "",
        viewType: "",
        hotelFeatures: [
            "Rooftop Bar",
            "Private Balcony Rooms",
            "Business Conference Rooms",
            "Theme Nights",
            "Sustainable Energy Facilities"
        ],
        topSelling: false,
        extraInfo: "Dine & Delight: 20% off on food!",
        price: 9400,
        ratingValue: 0,
        ratingText: "",
        reviews: 0,
        imageUrl: "https://res.cloudinary.com/dfjpfuwtp/image/upload/v1746415475/grand-hotel-kathmandu_rp1rop.jpg"
    },
    {
        hotelId: 103,
        hotelName: "Hotel Butwal",
        formerName: "",
        rating: 4,
        hotelLocation: "Butwal",
        attraction: "Near Mall Road",
        metroInfo: "",
        roomFeatures: [
            "Luxury Suite",
            "Presidential Suite"
        ],
        bedType: "",
        viewType: "",
        hotelFeatures: [
            "Hi-Tea",
            "Casino",
            "Infinity Pool"
        ],
        topSelling: false,
        extraInfo: "Free Wi-Fi, Complimentary Breakfast",
        price: 3500,
        ratingValue: 0,
        ratingText: "",
        reviews: 0,
        imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418087055.jpg?k=c8146c2258c2ede1a99a8cbd3425079ac0c52ab7386c64159c3d2d99d1e93945&o=&hp=1"
    },
    {
        hotelId: 6,
        hotelName: "Fish Tail Lodge",
        formerName: "",
        rating: 4,
        hotelLocation: "Pokhara",
        attraction: "10 mins walk to Bindhyabasini Temple",
        metroInfo: "",
        roomFeatures: [
            "Studio Room",
            "Junior Ocean View Suite",
            "Executive Double Room",
            "Deluxe King Room",
            "Business Suite"
        ],
        bedType: "",
        viewType: "",
        hotelFeatures: [
            "Hi-Tea",
            "Private Balcony Rooms",
            "Complimentary Breakfast",
            "Executive Lounge Access",
            "Cultural Dance Performances"
        ],
        topSelling: false,
        extraInfo: "Dine & Delight! Enjoy 25% OFF on all foods & drinks!",
        price: 11500,
        ratingValue: 0,
        ratingText: "",
        reviews: 0,
        imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/35085866.jpg?k=8d243d2b8aee9e5506e88afb2f750603e9f3c6c174097a13327a5516699f3798&o=&hp=1"
    }
];

const homestays = [
    {
        hotelId: 1,
        hotelName: "Lake View Homestay",
        formerName: "",
        rating: 4,
        hotelLocation: "Pokhara",
        attraction: "5 mins walk to Phewa Lake",
        metroInfo: "",
        roomFeatures: [
            "Traditional Wooden Cottage",
            "Standard Twin Room",
            "Luxury Tent with Balcony"
        ],
        bedType: "",
        viewType: "",
        hotelFeatures: [
            "Traditional Nepali Meals",
            "Guided Village Tours",
            "Eco-friendly Accommodation"
        ],
        topSelling: false,
        extraInfo: "Enjoy 20% off on local cuisine!",
        price: 2500,
        ratingValue: 0,
        ratingText: "",
        reviews: 0,
        imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/189734445.jpg?k=36dbfc583526c0f8003d5d04bd1aa7151372e6e2f5bcf06c489055db32662ab8&o=&hp=1"
    },
    {
        hotelId: 3,
        hotelName: "Heritage Homestay",
        formerName: "",
        rating: 4,
        hotelLocation: "Kathmandu",
        attraction: "Close to Rani Pokhari",
        metroInfo: "",
        roomFeatures: [
            "Mountain View Suite",
            "Cozy Attic Room",
            "Traditional Tharu Hut"
        ],
        bedType: "",
        viewType: "",
        hotelFeatures: [
            "24/7 Hot Water",
            "Airport Pick-up & Drop-off",
            "Yoga & Meditation Retreats"
        ],
        topSelling: false,
        extraInfo: "Cultural dinner nights every weekend!",
        price: 2800,
        ratingValue: 0,
        ratingText: "",
        reviews: 0,
        imageUrl: "https://res.cloudinary.com/dfjpfuwtp/image/upload/v1744648493/heritageHS_ygynp9.jpg"
    },
    {
        hotelId: 102,
        hotelName: "HomeStay Butwal",
        formerName: "",
        rating: 4,
        hotelLocation: "Butwal",
        attraction: "Near Mall Road",
        metroInfo: "",
        roomFeatures: [
            "Private Hut with Garden",
            "Standard Twin Room"
        ],
        bedType: "",
        viewType: "",
        hotelFeatures: [
            "Traditional Nepali Meals",
            "Free Wi-Fi",
            "24/7 Hot Water"
        ],
        topSelling: false,
        extraInfo: "Free Wi-Fi, Complimentary Breakfast",
        price: 3500,
        ratingValue: 0,
        ratingText: "",
        reviews: 0,
        imageUrl: "https://nepalisearchengine.com/storage/files/np/43/19259b19fa45fa60410288346e22e5bb.jpg?v=1"
    }
];

   
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
