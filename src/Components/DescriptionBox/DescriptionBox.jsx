"use client"

import { useSelector } from "react-redux"
import { Star } from "lucide-react"
import BookingForm from "./BookingFrom"
import Reviews from "./Review"
import "./descriptionBox.css"
import { useGetHotelInfoQuery } from "../../features/api/hotelApi"
import { useGetHomeStayInfoQuery } from "../../features/api/homeStayApi"

const DescriptionBox = () => {
  const activeItemIndex = useSelector((state) => state.active.activeItemIndex)
  const activeItemType = useSelector((state) => state.active.activeTypeIndex)

  const isHotel = activeItemType === 1
  const isHomeStay = activeItemType === 2

  const { data: infoHotel } = useGetHotelInfoQuery(activeItemIndex, { skip: !isHotel })
  const { data: infoHomeStay } = useGetHomeStayInfoQuery(activeItemIndex, { skip: !isHomeStay })

  const dataInfo = infoHotel || infoHomeStay

  if (!dataInfo) {
    return <div>Loading accommodation info...</div>
  }

  const {
    name = "Accommodation",
    location = "",
    attraction = "",
    rating = 0,
    description = "No description available.",
    roomFeatures = [],
    services = [],
    imageUrl,
    reviews = [],
  } = dataInfo

  const renderStars = (rating) => {
    const stars = []
    const numericRating = parseInt(rating)
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`star ${i <= numericRating ? "filled" : ""}`}
          size={18}
        />
      )
    }
    return stars
  }

  return (
    <div className="description-box">
      {/* Gallery Section */}
      <div className="homestay-gallery">
        <div className="main-image-container">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="main-image"
            onError={(e) => {
              e.target.src = "/placeholder.svg"
            }}
          />
        </div>
        {/* You can render extra images here later if needed */}
      </div>

      {/* Info Box Section */}
      <div className="homestay-info-box">
        <div className="homestay-header">
          <h1>{name}</h1>
          <div className="location-container">
            <span className="location-icon">📍</span>
            <span className="location-text">{location}</span>
            <span className="attraction-text">{attraction}</span>
          </div>
          <div className="rating-container">
            <div className="stars">{renderStars(rating)}</div>
          </div>
        </div>

        <div className="homestay-content">
          <div className="homestay-details">
            <div className="description-section">
              <p>{description}</p>
            </div>

            <div className="amenities-section">
              <h3>Room Features</h3>
              <ul className="features-list">
                {roomFeatures.length > 0 ? (
                  roomFeatures.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span>{typeof feature === "object" ? feature.roomFeature : feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="feature-item">No room features listed.</li>
                )}
              </ul>
            </div>

            <div className="amenities-section">
              <h3>Homestay Features</h3>
              <ul className="features-list">
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span>{typeof service === "object" ? service.service : service}</span>
                    </li>
                  ))
                ) : (
                  <li className="feature-item">No services listed.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <BookingForm dataInfo={dataInfo} />
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews reviews={reviews} />
    </div>
  )
}

export default DescriptionBox
