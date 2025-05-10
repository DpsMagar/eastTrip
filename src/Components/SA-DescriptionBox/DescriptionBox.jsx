"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Reviews from "./Review";
import SABookingForm from "./SABookingFrom";
import "./descriptionBox.css";

const DescriptionBox = ({ hotelInfo }) => {
  const [accommodationData, setAccommodationData] = useState(null);
  const [mainImage, setMainImage] = useState("/placeholder.svg");

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} className={`star ${i <= rating ? "filled" : ""}`} size={18} />
      );
    }
    return stars;
  };

  useEffect(() => {
    if (!hotelInfo?.requiredVals || hotelInfo.requiredVals.length < 2) return;

    const [type, entityId] = hotelInfo.requiredVals;
    if (typeof entityId !== "number") return;

    let url = "";
    if (type === 1) {
      url = `http://localhost:8080/results/hotels/hotel?hotelId=${entityId}`;
    } else if (type === 2) {
      url = `http://localhost:8080/results/homeStay/homeStay?homeStayId=${entityId}`;
    } else {
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched accommodation data:", data);
        setAccommodationData(data);
        setMainImage(data.imageUrl || "/placeholder.svg");
      })
      .catch(console.error);
  }, [hotelInfo?.requiredVals]);

  if (!accommodationData) return <div>Loading accommodation info...</div>;

  return (
    <div className="SA-description-box">
      {/* Gallery */}
      <div className="homestay-gallery">
        <div className="main-image-container">
          <img
            src={mainImage}
            alt={accommodationData.name}
            className="main-image"
            onError={(e) => {
              e.target.src = "/placeholder.svg";
            }}
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="homestay-info-box">
        <div className="homestay-header">
          <h1>{accommodationData.name}</h1>
          <div className="location-container">
            <span className="location-icon">📍</span>
            <span className="location-text">{accommodationData.location}</span>
            <span className="attraction-text">{accommodationData.attraction}</span>
          </div>
          <div className="rating-container">
            <div className="stars">{renderStars(parseInt(accommodationData.rating) || 0)}</div>
          </div>
        </div>

        <div className="homestay-content">
          <div className="homestay-details">
            <div className="description-section">
              <p>{accommodationData.extraInfo}</p>
            </div>

            {/* Room Features */}
            {accommodationData.roomFeatures?.length > 0 && (
  <div className="amenities-section">
    <h3>Room Features</h3>
    <ul className="features-list">
      {accommodationData.roomFeatures.map((feature, index) => (
        <li key={index} className="feature-item">
          <span className="feature-icon">✓</span>
          <span>{typeof feature === "string" ? feature : feature.roomFeatures}</span>
        </li>
      ))}
    </ul>
  </div>
)}

            {/* Services */}
            {accommodationData.services?.length > 0 && (
  <div className="amenities-section">
    <h3>Services</h3>
    <ul className="features-list">
      {accommodationData.services.map((service, index) => (
        <li key={index} className="feature-item">
          <span className="feature-icon">✓</span>
          <span>{typeof service === "string" ? service : service.services}</span>
        </li>
      ))}
    </ul>
  </div>
)}

          </div>

          {/* Booking Form */}
          <SABookingForm hotelInfo={accommodationData} />
        </div>
      </div>

      {/* Reviews */}
      <Reviews reviews={accommodationData.reviews || []} />
    </div>
  );
};

export default DescriptionBox;
