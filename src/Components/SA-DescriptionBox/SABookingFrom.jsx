"use client"

import { useState } from "react"
import "./booking-form.css"

const SABookingFrom = ({ hotelInfo }) => {
  // Fallback dummy data if hotelInfo is not provided or incomplete
  const fallbackHotelInfo = {
    price: 7500,
    rewardPoints: 1200,
    extraInfo: "20% off for early bookings!"
  }

  const validHotelInfo = {
    price: hotelInfo?.price ?? fallbackHotelInfo.price,
    rewardPoints: hotelInfo?.rewardPoints ?? fallbackHotelInfo.rewardPoints,
    extraInfo: hotelInfo?.extraInfo ?? fallbackHotelInfo.extraInfo
  }

  // Local state management (replaces Redux)
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split("T")[0])
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  })
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  const basePrice = validHotelInfo.price
  const rewardPoints = validHotelInfo.rewardPoints
  const taxesAndFees = Math.round(basePrice * 0.16)
  const totalPrice = basePrice + taxesAndFees

  const handleIncrement = (setter, value, max = 10) => {
    if (value < max) setter(value + 1)
  }

  const handleDecrement = (setter, value, min = 0) => {
    if (value > min) setter(value - 1)
  }

  const handleBookNow = (action) => {
    const bookingData = {
      name: hotelInfo?.name || "Unknown Property",
      checkInDate,
      checkOutDate,
      numberOfGuests: adults + children,
      numberOfRooms: rooms,
      totalPrice,
      action // "approve" or "reject"
    }
    console.log("Booking action:", action, bookingData)
    // Here you would typically handle the booking action
    // For frontend-only, we just log it
  }

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


    </div>
  )
}

export default SABookingFrom