"use client"

import "./Box.css"
import { useNavigate } from "react-router-dom"

function Box({ hotel }) {
  // Default props for when properties are missing
  const defaultHotel = {
    name: "Hotel Name",
    formerName: "",
    stars: 4,
    location: "Location",
    walkTime: "",
    metroInfo: "",
    roomType: "Standard Room",
    bedType: "Double Bed",
    viewType: "",
    amenities: ["Wifi", "Parking"],
    topSelling: false,
    bookings: 0,
    offers: "Special offer",
    price: 50,
    taxes: 10,
    rating: 4.0,
    ratingText: "Good",
    reviews: 100,
    image: "/placeholder.svg?height=400&width=600",
    thumbnails: [],
  }

  // Merge with defaults to prevent errors from missing properties
  const hotelData = { ...defaultHotel, ...hotel }
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate("/workingpage?hotelname=" + hotelData.name)
  }

  return (
    <div className="hotel-card" onClick={handleLogoClick}>
      <div className="hotel-card-container">
        {/* Left side - Images */}
        <div className="hotel-image-section">
          <div className="hotel-main-image">
            <img src={hotelData.image || "/placeholder.svg"} alt={hotelData.name} />
          </div>
          <div className="hotel-thumbnails">
            {hotelData.thumbnails && hotelData.thumbnails.length > 0 ? (
              hotelData.thumbnails.slice(0, 4).map((thumb, index) => (
                <div key={index} className="thumbnail">
                  <img src={thumb || "/placeholder.svg"} alt={`${hotelData.name} view ${index + 1}`} />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Middle section - Hotel details */}
        <div className="hotel-details-section">
          <div className="hotel-name-container">
            <h3 className="hotel-name">
              {hotelData.name}
              {hotelData.formerName && <span className="former-name"> (formerly {hotelData.formerName})</span>}
            </h3>
            <div className="hotel-stars">
              {Array.from({ length: hotelData.stars }).map((_, i) => (
                <span key={i} className="star">
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="hotel-location">
            <p>
              <span className="location-name">{hotelData.location}</span>
              {hotelData.walkTime && <span> | {hotelData.walkTime}</span>}
            </p>
            {hotelData.metroInfo && <p>{hotelData.metroInfo}</p>}
          </div>

          <div className="hotel-room-info">
            {hotelData.roomType} | {hotelData.bedType} {hotelData.viewType && `| ${hotelData.viewType}`}
          </div>

          <div className="hotel-amenities">
            {hotelData.amenities.map((amenity, index) => (
              <div key={index} className="amenity">
                <span className="amenity-icon">✓</span> {amenity}
              </div>
            ))}
          </div>

          {hotelData.topSelling && (
            <div className="top-selling">
              <span className="top-selling-icon">⚡</span> Top Selling! Booked {hotelData.bookings} times in last 30
              days
            </div>
          )}

          {hotelData.offers && (
            <div className="hotel-offers">
              <span className="offers-icon">ℹ️</span> {hotelData.offers}
            </div>
          )}

          <div className="hotel-tags">
            <div className="mmt-exclusive">MMT exclusive</div>
            <div className="price-guarantee">Lowest Price Guarantee</div>
          </div>
        </div>

        {/* Right section - Price and booking */}
        <div className="hotel-price-section">
          <div className="rating-badge">
            {hotelData.ratingText} {hotelData.rating}
            <div className="reviews-count">({hotelData.reviews} Ratings)</div>
          </div>

          <div className="price-container">
            <div className="price">${hotelData.price}</div>
            <div className="taxes">+ ${hotelData.taxes} taxes & fees</div>
            <div className="per-night">Per Night</div>
          </div>

          <button className="book-button">Login to Book Now & Pay Later!</button>
        </div>
      </div>
    </div>
  )
}

export default Box

