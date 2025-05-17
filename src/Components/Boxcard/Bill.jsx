"use client"
import "./Bill.css"
import { IoClose } from "react-icons/io5"

const Bill = (props) => {
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
  date,
  class: flightClass,
  baggageLimit,
  adultFare,
  tax,
  fuelSurcharge,
  totalPrice,
} = props;

  return (
    <div className="bill-box">
      <div className="bill-box-header">
        <h1>Departure Flight Details</h1>
        <button className="close-button" onClick={onClose}>
          <IoClose />
        </button>
      </div>

      <div className="flight-route">
        <h2>
          {flight.from} to {flight.to}
        </h2>
        <p className="flight-info">
          {flight.airway}, {flight.date}
        </p>
      </div>

      <div className="flight-time">
        <p>
          {flight.departure} - {flight.arrival}
        </p>
      </div>

      <div className="flight-details-grid">
        <div className="detail-row">
          <span className="detail-label">Flight No.</span>
          <span className="detail-value">{flight.flightNumber}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Class</span>
          <span className="detail-value">{flight.class}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Baggage Limit</span>
          <span className="detail-value">{flight.baggageLimit}</span>
        </div>
      </div>

      <div className="price-breakdown">
        <div className="price-row">
          <span className="price-label">Adult Fare</span>
          <span className="price-value">{flight.adultFare} X 1</span>
        </div>
        <div className="price-row">
          <span className="price-label">Tax</span>
          <span className="price-value">{flight.tax} X 1</span>
        </div>
        <div className="price-row">
          <span className="price-label">Fuel Surcharge</span>
          <span className="price-value">{flight.fuelSurcharge} X 1</span>
        </div>
        <div className="price-row total">
          <span className="price-label">Total Ticket Price</span>
          <span className="price-value">{flight.totalPrice}</span>
        </div>
        <div className="price-row reward">
          <span className="price-label">Reward Points</span>
          <span className="price-value reward-value">{flight.rewardPoints}</span>
        </div>
      </div>

      <div className="payment-section">
        <div className="payment-row">
          <span className="payment-label">Paying Amount</span>
          <span className="payment-value">{flight.totalPrice}</span>
        </div>
      </div>

      <button className="button">Proceed</button>
    </div>
  )
}

export default Bill
