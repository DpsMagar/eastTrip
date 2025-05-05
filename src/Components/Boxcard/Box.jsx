"use client"

import { useDispatch } from "react-redux"
import { useGetHotelInfoQuery } from "../../features/api/hotelApi"
import "./Box.css"
import { useNavigate } from "react-router-dom"
import { setActiveItemIndex, setActiveTypeIndex } from "../../features/slice/activeCardSlice"

function Box({ hotel, index }) {
  const navigate = useNavigate()

  console.log("box1");
  console.log(hotel.hotelId);
  
  
  const dispatch= useDispatch();

  // console.log(index);
  
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
  //   services: ["Wifi", "Parking"],
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

    dispatch(setActiveItemIndex(hotel.hotelId))
    dispatch(setActiveTypeIndex(1))
    console.log(hotel);
    
    navigate("/description?hotelname=" + hotel.hotelName)


    
  }

  return (
    <div className="hotel-card" onClick={handleLogoClick} >
      <div className="hotel-card-container" >
  
        <div className="hotel-image-section">
          <div className="hotel-main-image">
            <img src={hotel.imageUrl || "/placeholder.svg"} alt={hotel.hotelName} />
          </div>

        </div>

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
          {hotel.services && Array.isArray(hotel.services) && hotel.services.length > 0 ? (
            hotel.services.map((amenity, index) => (
              <div key={index} className="amenity">
                <span className="amenity-icon">✓</span> {amenity}
              </div>
            ))
          ) : (
            <p>No amenities available.</p> 
          )}
        </div>


          {hotel.topSelling && (
            <div className="top-selling">
              
             
            </div>
          )}

          {hotel.extraInfo && (
            <div className="hotel-offers">
              <span className="offers-icon"></span> 
            </div>
          )}

     
        </div>

        
        <div className="hotel-price-section">
          <div className="rating-badge">
            {hotel.ratingText} {hotel.rating}
            <div className="reviews-count">({hotel.reviews} Ratings)</div>
          </div>

          <div className="price-container">
            <div className="price">Rs {hotel.price}</div>
            <div className="taxes">+ Rs 100 taxes & fees</div>
            <div className="per-night">Per Night</div>
          </div>

          <button className="book-button">Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default Box

