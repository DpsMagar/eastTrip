"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import BookingForm from "./BookingFrom"
import Reviews from "./Review"
import "./descriptionBox.css"

const DescriptionBox = ({ hotelInfo }) => {
  const [mainImage, setMainImage] = useState(hotelInfo["Main-Image"] || "/placeholder.svg")

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} className={`star ${i <= rating ? "filled" : ""}`} size={18} />)
    }
    return stars
  }

  return (
    <div className="description-box">
      {/* Gallery Section */}
      <div className="homestay-gallery">
        <div className="main-image-container">
          <img
            src={mainImage || "/placeholder.svg"}
            alt={hotelInfo.Name}
            className="main-image"
            onError={(e) => {
              e.target.src = "/placeholder.svg"
            }}
          />
        </div>
        <div className="thumbnail-container">
          {hotelInfo["extra-image"].map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${image === mainImage ? "active" : ""}`}
              onClick={() => setMainImage(image || "/placeholder.svg")}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${hotelInfo.Name} - Image ${index + 1}`}
                onError={(e) => {
                  e.target.src = "/placeholder.svg"
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Box Section */}
      <div className="homestay-info-box">
        <div className="homestay-header">
          <h1>{hotelInfo.Name}</h1>
          <div className="location-container">
            <span className="location-icon">📍</span>
            <span className="location-text">{hotelInfo.location}</span>
            <span className="attraction-text">{hotelInfo.attraction}</span>
          </div>
          <div className="rating-container">
            <div className="stars">{renderStars(hotelInfo.rating)}</div>
          </div>
        </div>

        <div className="homestay-content">
          <div className="homestay-details">
            <div className="description-section">
              <p>{hotelInfo.description}</p>
            </div>

            <div className="amenities-section">
              <h3>Room Features</h3>
              <ul className="features-list">
                {hotelInfo.roomFeatures.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="amenities-section">
              <h3>Homestay Features</h3>
              <ul className="features-list">
                {hotelInfo.homeStayFeatures.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <BookingForm hotelInfo={hotelInfo} />
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews reviews={hotelInfo.reviews || []} />
    </div>
  )
}

export default DescriptionBox

