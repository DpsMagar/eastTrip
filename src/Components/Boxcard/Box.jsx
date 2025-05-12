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
  

  // Merge with defaults to prevent errors from missing properties
  // const hotel = { ...defaultHotel, ...hotel }
  const navigate = useNavigate()

  const dispatch= useDispatch()

  const handleLogoClick = () => {

    dispatch(setActiveItemIndex(hotel.hotelId))
    dispatch(setActiveTypeIndex(1))

    navigate("/description?hotelName=" + hotel.hotelName)
  }

const ratingtext = (() => {
  switch (hotel.rating) {
    case 1: return "Bad";
    case 2: return "Good";
    case 3: return "Very Good";
    case 4: return "Excellent";
    case 5: return "Outstanding";
    default: return "No Rating";
  }
})();
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



          


        </div>

        {/* Right section - Price and booking */}
        <div className="hotel-price-section">
          <div className="rating-badge">
            {ratingtext} {hotel.rating}
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