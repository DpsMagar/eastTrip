"use client"

import { useState } from "react"
import { Star } from "lucide-react"

import Reviews from "./Review"
import "./descriptionBox.css"
import { useSelector } from "react-redux"
import { useGetHotelInfoQuery } from "../../features/api/hotelApi"
import { useGetHomeStayInfoQuery } from "../../features/api/homeStayApi"

const DescriptionBox = ({ hotelInfo }) => {

  const activeItemIndex= useSelector((state)=> state.active.activeItemIndex);
  const activeItemType= useSelector((state)=> state.active.activeTypeIndex );

  const isHotel = activeItemType === 1;
  const isHomeStay = activeItemType ===2;

  console.log(activeItemIndex);
  console.log(activeItemType);
  

  const {data:infoHotel}= useGetHotelInfoQuery(activeItemIndex, {skip: !isHotel});
  const {data:infoHomeStay}= useGetHomeStayInfoQuery(activeItemIndex, {skip: !isHomeStay});

const info = infoHotel || infoHomeStay

  console.log(info);

  const [mainImage, setMainImage] = useState(hotelInfo["Main-Image"] || "/placeholder.svg")

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} className={`star ${i <= rating ? "filled" : ""}`} size={18} />)
    }
    return stars
  } 
  if (!info) {
    return <div>Loading accommodation info...</div>
  }

  return (
    <div className="description-box">
      {/* Gallery Section */}
      <div className="homestay-gallery">
        <div className="main-image-container">
          <img
            src={info.imageUrl}
            alt={hotelInfo.Name}
            className="main-image"
            onError={(e) => {
              e.target.src = "/placeholder.svg"
            }}
          />
        </div>
        
      </div>

      {/* Info Box Section */}
      <div className="homestay-info-box">
        <div className="homestay-header">
          <h1>{info.name}</h1>
          <div className="location-container">
            <span className="location-icon">📍</span>
            <span className="location-text">{info.Location}</span>
            <span className="attraction-text">{info.attraction}</span>
          </div>
          <div className="rating-container">
            <div className="stars">{renderStars(info.rating)}</div>
          </div>
        </div>

        <div className="homestay-content">
          <div className="homestay-details">
            <div className="description-section">
              <p>{info.extraInfo}</p>
            </div>

            <div className="amenities-section">
              <h3>Room Features</h3>
              <ul className="features-list">
                {info.roomFeatures.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature.roomFeature || feature.roomFeatures}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="amenities-section">
              <h3>Homestay Features</h3>
              <ul className="features-list">
                {info.services.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature.services}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          
         
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews reviews={hotelInfo.reviews || []} />
    </div>
  )
}


export default DescriptionBox
