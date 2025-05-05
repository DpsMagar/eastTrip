"use client"

import { useDispatch } from "react-redux"
import "./Box.css"
import { useNavigate } from "react-router-dom"
import { setActiveItemIndex, setActiveTypeIndex } from "../../features/slice/activeCardSlice"

function Box({ hotel, index }) {

  // console.log(hotel);
  // console.log(index);
  console.log("Box");
  console.log(hotel.hotelName);
  
  
  
  
  // Default props for when properties are missing
  // const defaultHotel = {
  //   name: "Hotel Name",
  //   formerName: "",
  //   stars: 4,
  //   location: "Location",
  //   walkTime: "",
  //   metroInfo: "",
  //   roomType: "Standard Room",
  //   bedType: "Double Bed",
  //   viewType: "",
  //   homeStayFeatures: ["Wifi", "Parking"],
  //   topSelling: false,
  //   bookings: 0,
  //   offers: "Special offer",
  //   price: 50,
  //   taxes: 10,
  //   rating: 4.0,
  //   ratingText: "Good",
  //   reviews: 100,
  //   image: "/placeholder.svg?height=400&width=600",
  //   thumbnails: [],
  // }

  // Merge with defaults to prevent errors from missing properties
  // const hotel = { ...defaultHotel, ...hotel }
  const navigate = useNavigate()

  const dispatch= useDispatch()

  const handleLogoClick = () => {

    dispatch(setActiveItemIndex(hotel.hotelId))
    dispatch(setActiveTypeIndex(1))

    navigate("/description?hotelName=" + hotel.hotelName)
  }

  return (
    <div className="hotel-card" onClick={handleLogoClick}>
      <div className="hotel-card-container">
        {/* Left side - Images */}
        <div className="hotel-image-section">
          <div className="hotel-main-image">
            <img src={hotel.imageUrl || "/placeholder.svg"} alt={hotel.hotelName} />
          </div>

        </div>

        {/* Middle section - Hotel details */}
        <div className="hotel-details-section">
          <div className="hotel-name-container">
            <h3 className="hotel-name">
              {hotel.hotelName}
              {hotel.formerName && <span className="former-name"> (formerly {hotel.formerName})</span>}
            </h3>
            <div className="hotel-stars">
    {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`star ${i < hotel.rating ? 'filled' : 'empty'}`}>
            {i < hotel.rating ? '★' : '☆'}
        </span>
    ))}
</div>
          </div>

          <div className="hotel-location">
            <p>
              <span className="location-name">{hotel.hotelLocation}</span>
              {hotel.attraction && <span> | {hotel.attraction}</span>}
            </p>
            {hotel.metroInfo && <p>{hotel.metroInfo}</p>}
          </div>

          <div className="hotel-room-info">
            {hotel.roomFeatures} | {hotel.bedType} {hotel.viewType && `| ${hotel.viewType}`}
          </div>

          <div className="hotel-amenities">
            {hotel.hotelFeatures.map((amenity, index) => (
              <div key={index} className="amenity">
                <span className="amenity-icon">✓</span> {amenity}
              </div>
            ))}
          </div>

          {hotel.topSelling && (
            <div className="top-selling">
              <span className="top-selling-icon">⚡</span> Top Selling! Booked {hotel.bookings} times in last 30
              days
            </div>
          )}

          


        </div>

        {/* Right section - Price and booking */}
        <div className="hotel-price-section">
          <div className="rating-badge">
            {hotel.ratingText} {hotel.rating}
            <div className="reviews-count">({hotel.reviews} Ratings)</div>
          </div>

          <div className="price-container">
            <div className="price">Rs {hotel.price}</div>
            <div className="taxes">+ Rs 1200 taxes & fees</div>
            <div className="per-night">Per Night</div>
          </div>

          <button className="book-button">Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default Box