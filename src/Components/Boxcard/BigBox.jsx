"use client";
import { useState } from "react";
import HotelCard from "./Box";
import Box2 from "./Box2";
import "./BigBox.css";

function HotelTabs() {
  const [activeTab, setActiveTab] = useState("hotels");

  const hotels = [
    {
      hotelId: 57,
      hotelName: "Grand Kathmandu Hotel",
      rating: 4,
      hotelLocation: "Kathmandu",
      attraction: "10 mins from Tinkune Park",
      hotelFeatures: [
        "Rooftop Bar",
        "Private Balcony Rooms",
        "Business Conference Rooms",
        "Theme Nights",
        "Sustainable Energy Facilities",
      ],
      extraInfo: "Dine & Delight: 20% off on food!",
      price: 9400,
      reviews: 120,
      imageUrl:
        "https://res.cloudinary.com/dfjpfuwtp/image/upload/v1746415475/grand-hotel-kathmandu_rp1rop.jpg",
    },
    {
      hotelId: 103,
      hotelName: "Hotel Butwal",
      rating: 4,
      hotelLocation: "Butwal",
      attraction: "Near Mall Road",
      roomFeatures: ["Luxury Suite", "Presidential Suite"],
      hotelFeatures: ["Hi-Tea", "Casino", "Infinity Pool"],
      extraInfo: "Free Wi-Fi, Complimentary Breakfast",
      price: 3500,
      reviews: 85,
      imageUrl:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/418087055.jpg?k=c8146c2258c2ede1a99a8cbd3425079ac0c52ab7386c64159c3d2d99d1e93945&o=&hp=1",
    },
    {
      hotelId: 6,
      hotelName: "Fish Tail Lodge",
      rating: 4,
      hotelLocation: "Pokhara",
      attraction: "10 mins walk to Bindhyabasini Temple",
      roomFeatures: [
        "Studio Room",
        "Junior Ocean View Suite",
        "Executive Double Room",
        "Deluxe King Room",
        "Business Suite",
      ],
      hotelFeatures: [
        "Hi-Tea",
        "Private Balcony Rooms",
        "Complimentary Breakfast",
        "Executive Lounge Access",
        "Cultural Dance Performances",
      ],
      extraInfo: "Dine & Delight! Enjoy 25% OFF on all foods & drinks!",
      price: 11500,
      reviews: 230,
      imageUrl:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/35085866.jpg?k=8d243d2b8aee9e5506e88afb2f750603e9f3c6c174097a13327a5516699f3798&o=&hp=1",
    },
  ];

  const homestays = [
    {
      homeStayId: 1,
      homeStayName: "Lake View Homestay",
      homeStayLocation: "Pokhara",
      attraction: "5 mins walk to Phewa Lake",
      rating: 4,
      roomFeatures: [
        "Traditional Wooden Cottage",
        "Standard Twin Room",
        "Luxury Tent with Balcony",
      ],
      price: 2500,
      extraInfo: "Enjoy 20% off on local cuisine!",
      imageUrl: "https://via.placeholder.com/400x300?text=Lake+View", // placeholder
      homeStayFeatures: [
        "Traditional Nepali Meals",
        "Guided Village Tours",
        "Eco-friendly Accommodation",
      ],
      reviews: 45,
    },
    {
      homeStayId: 3,
      homeStayName: "Heritage Homestay",
      homeStayLocation: "Kathmandu",
      attraction: "Close to Rani Pokhari",
      rating: 4,
      roomFeatures: [
        "Mountain View Suite",
        "Cozy Attic Room",
        "Traditional Tharu Hut",
      ],
      price: 2800,
      extraInfo: "Cultural dinner nights every weekend!",
      imageUrl:
        "https://res.cloudinary.com/dfjpfuwtp/image/upload/v1744648493/heritageHS_ygynp9.jpg",
      homeStayFeatures: [
        "24/7 Hot Water",
        "Airport Pick-up & Drop-off",
        "Yoga & Meditation Retreats",
      ],
      reviews: 60,
    },
    {
      homeStayId: 102,
      homeStayName: "HomeStay Butwal",
      homeStayLocation: "Butwal",
      attraction: "Near Mall Road",
      rating: 4,
      roomFeatures: ["Private Hut with Garden", "Standard Twin Room"],
      price: 3500,
      extraInfo: "Free Wi-Fi, Complimentary Breakfast",
      imageUrl: "https://example.com/images/sapphire.jpg",
      homeStayFeatures: [
        "Traditional Nepali Meals",
        "Free Wi-Fi",
        "24/7 Hot Water",
      ],
      reviews: 30,
    },
  ];

  const getTopEntries = (list) => {
    return list
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviews - a.reviews;
      })
      .slice(0, 3);
  };

  const displayedList =
    activeTab === "hotels" ? getTopEntries(hotels) : getTopEntries(homestays);

  return (
    <section className="page-content">
      <div className="hotel-tabs-container">
        <div className="tabs-header">
          <h1>Recommended For You</h1>
          <div className="tab-buttons">
            <button
              className={`tab-button ${
                activeTab === "hotels" ? "active" : ""
              }`}
              onClick={() => setActiveTab("hotels")}
            >
              Hotels
            </button>
            <button
              className={`tab-button ${
                activeTab === "homestays" ? "active" : ""
              }`}
              onClick={() => setActiveTab("homestays")}
            >
              Homestays
            </button>
          </div>
        </div>

        <div className="hotel-listings">
          {displayedList.map((item, index) =>
            activeTab === "hotels" ? (
              <HotelCard key={item.hotelId} hotel={item} index={index} />
            ) : (
              <Box2 key={item.homeStayId} hotel={item} index={index} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default HotelTabs;
