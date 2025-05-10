"use client"

import { useState } from "react"
import "./booking-form.css"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"

const SABookingFrom = ({ hotelInfo }) => {
  
  const fallbackHotelInfo = {
    price: 7500,
    rewardPoints: 1200,
    extraInfo: "20% off for early bookings!",
    totalRooms: 42,
    totalBookings: 1284,
    totalReviews: 356,
    averageRating: 4.2
  }

  const validHotelInfo = {
    price: hotelInfo?.price ?? fallbackHotelInfo.price,
    rewardPoints: hotelInfo?.rewardPoints ?? fallbackHotelInfo.rewardPoints,
    extraInfo: hotelInfo?.extraInfo ?? fallbackHotelInfo.extraInfo,
    totalRooms: hotelInfo?.totalRooms ?? fallbackHotelInfo.totalRooms,
    totalBookings: hotelInfo?.totalBookings ?? fallbackHotelInfo.totalBookings,
    totalReviews: hotelInfo?.totalReviews ?? fallbackHotelInfo.totalReviews,
    averageRating: hotelInfo?.averageRating ?? fallbackHotelInfo.averageRating
  }

  // Render star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />)
      } else {
        stars.push(<FaRegStar key={i} className="star" />)
      }
    }

    return stars
  }

  const basePrice = validHotelInfo.price
  const rewardPoints = validHotelInfo.rewardPoints
  const taxesAndFees = Math.round(basePrice * 0.16)
  const totalPrice = basePrice + taxesAndFees

  return (
    <div className="sa-booking-form">
      <div className="sa-price-header">
        <h2 className="sa-per-night-price">NPR {validHotelInfo.price}</h2>
        <span className="sa-per-night-label">per night</span>
      </div>

      <div className="sa-price-breakdown">
        <div className="sa-price-row">
          <span className="sa-price-label">Base Price</span>
          <span className="sa-price-value">NPR {basePrice - 416}</span>
        </div>
        <div className="sa-price-row">
          <span className="sa-price-label">Taxes & Fees</span>
          <span className="sa-price-value">NPR {taxesAndFees.toLocaleString()}</span>
        </div>
        <div className="sa-price-row total-row">
          <span className="sa-price-label">Total</span>
          <span className="sa-price-value">NPR {validHotelInfo.price}</span>
        </div>
        <div className="sa-price-row">
          <span className="sa-reward-label">Reward Points</span>
          <span className="sa-reward-value">{rewardPoints.toLocaleString()}</span>
        </div>
      </div>

      {/* Hotel Stats Section */}
      <div className="sa-hotel-stats">
        <div className="stat-item">
          <span className="stat-label">Total Rooms</span>
          <span className="stat-value">{validHotelInfo.totalRooms}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Bookings</span>
          <span className="stat-value">{validHotelInfo.totalBookings.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Reviews</span>
          <span className="stat-value">{validHotelInfo.totalReviews.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Rating</span>
          <div className="rating-display">
            {renderStars(validHotelInfo.averageRating)}
            <span className="rating-text">{validHotelInfo.averageRating.toFixed(1)}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SABookingFrom