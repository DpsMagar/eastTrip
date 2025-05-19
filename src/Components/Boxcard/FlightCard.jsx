"use client"
import "./flight-card.css"
import PlaneDetail from "./PlaneDetail"
import Bill from "./Bill"
import { useState } from "react"

const FlightCard = () => {
  const [showPlaneDetail, setShowPlaneDetail] = useState(false)
  const [showBillDetail, setShowBillDetail] = useState(false)

  const flight = {
    fightlogo: "https://www.buddhaair.com/images/buddhaair.png",
    airway: "Buddha Air",
    flightNumber: "U4 123",
    departure: "08:00",
    from: "Kathmandu",
    fromcode: "KTM",
    flightDuration: "1h 10m",
    arrival: "09:10",
    to: "Pokhara",
    tocode: "PKR",
    price: "7500",
    SeatNumber: "A3",
  }

  const handleOverlayClick = () => {
    setShowPlaneDetail(false);
    setShowBillDetail(false);
  };

  return (
    <div className="flight-card">
      {/* Left Section: Airline Info */}
      <div className="flight-card-left">
        <div className="airline-info">
          <img
            src={flight.fightlogo || "/placeholder.svg"}
            alt={flight.airway || "Airline Logo"}
            className="airline-logo"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "https://www.buddhaair.com/images/buddhaair.png"
            }}
          />
          <div className="airline-name">
            <h3 className="airway-name">{flight.airway}</h3>
            <p className="flight-number">{flight.flightNumber}</p>
          </div>
        </div>
      </div>

      {/* Center Section: Times & Duration */}
      <div className="flight-card-center">
        <div className="flight-time-container">
          <div className="departure-info">
            <h3 className="time">{flight.departure}</h3>
            <p className="city">{flight.from}</p>
            <p className="airport-code">{flight.fromcode}</p>
          </div>

          <div className="flight-duration">
            <div className="duration-line">
              <div className="dot"></div>
              <div className="line"></div>
              <div className="dot"></div>
            </div>
            <p className="duration-text">{flight.flightDuration}</p>
            <p className="stop-info">Non stop</p>
          </div>

          <div className="arrival-info">
            <h3 className="time">{flight.arrival}</h3>
            <p className="city">{flight.to}</p>
            <p className="airport-code">{flight.tocode}</p>
          </div>
        </div>
      </div>

      {/* Right Section: Price & Button */}
      <div className="flight-card-right">
        <div className="price-container">
          <h3 className="price">NRs {flight.price}</h3>
          <button
            className="book-now-btn"
            onClick={(e) => {
              e.preventDefault()
              setShowBillDetail(true)
            }}
          >
            BOOK NOW
          </button>
        </div>
      </div>

      {/* Flight Details Link */}
      <div className="flight-details-link">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setShowPlaneDetail(true)
          }}
        >
          View Flight Details
        </a>
      </div>

      {/* Plane Detail Popup */}
      {showPlaneDetail && (
        <div className="plane-detail-modal">
          <div className="modal-overlay" onClick={handleOverlayClick}></div>
          <PlaneDetail
            SeatNumber={flight.SeatNumber}
            flightLogo={flight.fightlogo}
            onClose={() => setShowPlaneDetail(false)}
          />
        </div>
      )}

      {/* Bill Detail Popup */}
      {showBillDetail && (
        <div className="plane-detail-modal">
          <div className="modal-overlay" onClick={handleOverlayClick}></div>
          <Bill
            SeatNumber={flight.SeatNumber}
            flightLogo={flight.fightlogo}
            price={flight.price}
            onClose={() => setShowBillDetail(false)}
          />
        </div>
      )}
    </div>
  )
}

export default FlightCard
