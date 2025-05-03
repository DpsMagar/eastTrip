"use client"

import { useDispatch } from "react-redux"
import { useGetHotelInfoQuery } from "../../features/api/hotelApi"
import "./Box.css"
import { useNavigate } from "react-router-dom"
import { setActiveItemIndex, setActiveTypeIndex } from "../../features/slice/activeCardSlice"

function Box({ hotel, key }) {
  const navigate = useNavigate()

  const dispatch= useDispatch();

  console.log(key);
  
  // const {data: hotelData}= useGetHotelInfoQuery(index);

  if (!hotel) {
    return <div>Loading...</div>; 
  }
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
  //   hotelFeatures: ["Wifi", "Parking"],
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
  

  const handleLogoClick = () => {

    navigate("/description?hotelname=" + hotel.hotelName)
    dispatch(setActiveItemIndex(key))
    dispatch(setActiveTypeIndex(1))
  }

  return (
    <div className="hotel-card" >
      <div className="hotel-card-container" onClick={handleLogoClick}>
  
        <div className="hotel-image-section">
          <div className="hotel-main-image">
            <img src={hotel.image || "/placeholder.svg"} alt={hotel.hotelName} />
          </div>
          <div className="hotel-thumbnails">
            {hotel.hotelFeatures && hotel.hotelFeatures.length > 0 ? (
              hotel.hotelFeatures.slice(0, 4).map((thumb, index) => (
                <div key={index} className="thumbnail">
                  
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="hotel-details-section">
          <div className="hotel-name-container">
            <h3 className="hotel-name">
              {hotel.hotelName}
              {hotel.formerName && <span className="former-name"> (formerly {hotel.formerName})</span>}
            </h3>
            <div className="hotel-stars">
              {Array.from({ length: hotel.rating }).map((_, i) => (
                <span key={i} className="star">
                  ★
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
          {hotel.hotelFeatures && Array.isArray(hotel.hotelFeatures) && hotel.hotelFeatures.length > 0 ? (
            hotel.hotelFeatures.map((amenity, index) => (
              <div key={index} className="amenity">
                <span className="amenity-icon">✓</span> {amenity}
              </div>
            ))
          ) : (
            <p>No amenities available.</p> // Or any fallback content
          )}
        </div>


          {hotel.topSelling && (
            <div className="top-selling">
              
             
            </div>
          )}

          {hotel.extraInfo && (
            <div className="hotel-offers">
              <span className="offers-icon">ℹ️</span> {hotel.extraInfo}
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
            <div className="price">${hotel.price}</div>
            <div className="taxes">+ $1200 taxes & fees</div>
            <div className="per-night">Per Night</div>
          </div>

          <button className="book-button">Login to Book Now & Pay Later!</button>
        </div>
      </div>
    </div>
  )
}

export default Box

