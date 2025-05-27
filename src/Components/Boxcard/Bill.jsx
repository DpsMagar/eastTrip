"use client"
import React, { useState } from "react"
import "./Bill.css"
import { IoClose } from "react-icons/io5"

const Bill = (props) => {
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const {
    SeatNumber,
    onClose,
    flightLogo = "https://www.buddhaair.com/images/buddhaair.png",
    rewardPoints = "88.5",
    airway = "Buddha Air",
    flightNumber = "U4901",
    departure = "19:00",
    from = "Kathmandu",
    fromcode = "KTM",
    flightDuration = "0h 45m",
    arrival = "19:45",
    to = "Bhadrapur",
    tocode = "BDP",
    date = "N/A",
    class: flightClass = "Economy",
    baggageLimit = "15kg",
    adultFare = "5000",
    tax = "500",
    fuelSurcharge = "300",
    totalPrice = "5800",
  } = props

  const handleBillClick = (e) => {
    e.stopPropagation()
  }

  if (bookingSuccess) {
    return (
      <div className="bill-box success-message">
        <h2>✅ Booking Successful!</h2>
        <p>Thank you for choosing {airway}. Have a safe flight!</p>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    )
  }

  return (
    <div className="bill-box" onClick={handleBillClick}>
      <div className="bill-box-header">
        <h1>Departure Flight Details</h1>
        <button
          className="close-button"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <IoClose />
        </button>
      </div>

      <div className="flight-route">
        <h2>
          {from} to {to}
        </h2>
        <p className="flight-info">
          {airway}, {date}
        </p>
      </div>

      <div className="flight-time">
        <p>
          {departure} - {arrival}
        </p>
      </div>

      <div className="flight-details-grid">
        <div className="detail-row">
          <span className="detail-label">Flight No.</span>
          <span className="detail-value">{flightNumber}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Class</span>
          <span className="detail-value">{flightClass}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Baggage Limit</span>
          <span className="detail-value">{baggageLimit}</span>
        </div>
      </div>

      <div className="price-breakdown">
        <div className="price-row">
          <span className="price-label">Adult Fare</span>
          <span className="price-value">{adultFare} X 1</span>
        </div>
        <div className="price-row">
          <span className="price-label">Tax</span>
          <span className="price-value">{tax} X 1</span>
        </div>
        <div className="price-row">
          <span className="price-label">Fuel Surcharge</span>
          <span className="price-value">{fuelSurcharge} X 1</span>
        </div>
        <div className="price-row total">
          <span className="price-label">Total Ticket Price</span>
          <span className="price-value">{totalPrice}</span>
        </div>
        <div className="price-row reward">
          <span className="price-label">Reward Points</span>
          <span className="price-value reward-value">{rewardPoints}</span>
        </div>
      </div>

      <div className="payment-section">
        <div className="payment-row">
          <span className="payment-label">Paying Amount</span>
          <span className="payment-value">{totalPrice}</span>
        </div>
      </div>

      <button className="button" onClick={() => setBookingSuccess(true)}>
        Proceed
      </button>
    </div>
  )
}

export default Bill
