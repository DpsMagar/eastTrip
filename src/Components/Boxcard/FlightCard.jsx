"use client"
import "./flight-card.css"

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <div className="flight-card-left">
        <div className="airline-info">
          <img
            src={flight.fightlogo || "/placeholder.svg"} // Use the fightlogo property directly
            alt={flight.airway}
            className="airline-logo"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "https://www.buddhaair.com/images/buddhaair.png"
            }}
          />
          <div className="airline-name">
            <h3>{flight.airway}</h3>
            <p className="flight-number">{flight.flightNumber}</p>
          </div>
        </div>
      </div>

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

      <div className="flight-card-right">
        <div className="price-container">
          <h3 className="price">NRs {flight.price}</h3>
          <button className="book-now-btn">BOOK NOW</button>
        </div>
      </div>

      <div className="flight-details-link">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            // sprint 2
          }}
        >
          View Flight Details
        </a>
      </div>
    </div>
  )
}

export default FlightCard
