"use client"

import { useState } from "react"
import { ChevronDown, Minus, Plus } from "lucide-react"
import "./booking-form.css"

const BookingForm = ({ hotelInfo }) => {
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  
  const basePrice = hotelInfo.price
  const RewardPoint = hotelInfo.rewardPoints
  const taxesAndFees = Math.round(basePrice * 0.16)
  const totalPrice = basePrice + taxesAndFees
  const perNightPrice = Math.round(totalPrice / 3) 
  const handleIncrement = (setter, value, max = 10) => {
    if (value < max) {
      setter(value + 1)
    }
  }

  const handleDecrement = (setter, value, min = 0) => {
    if (value > min) {
      setter(value - 1)
    }
  }

  const getGuestSummary = () => {
    let summary = `${adults} Adult${adults !== 1 ? "s" : ""}`
    if (children > 0) {
      summary += `, ${children} Child${children !== 1 ? "ren" : ""}`
    }
    summary += ` · ${rooms} Room${rooms !== 1 ? "s" : ""}`
    return summary
  }

  return (
    <div className="booking-form">
      <div className="price-header">
        <h2 className="per-night-price">NPR {perNightPrice}</h2>
        <span className="per-night-label">per night</span>
      </div>

      <div className="price-breakdown">
        <div className="price-row">
          <span className="price-label">Base Price</span>
          <span className="price-value">NPR {basePrice.toLocaleString()}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Taxes & Fees</span>
          <span className="price-value">NPR {taxesAndFees.toLocaleString()}</span>
        </div>
        <div className="price-row total-row">
          <span className="price-label">Total</span>
          <span className="price-value">NPR {totalPrice.toLocaleString()}</span>
        </div>
        <div className="price-row">
        <span className="reward-label">Reward Points</span>
        <span className="reward-value"> {RewardPoint.toLocaleString()}</span>
        </div>
      </div>

      <div className="booking-inputs">
        <div className="input-group">
          <label htmlFor="check-in">Check-in</label>
          <div className="date-input-wrapper">
            <input type="date" id="check-in" className="date-input" />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="check-out">Check-out</label>
          <div className="date-input-wrapper">
            <input type="date" id="check-out" className="date-input" />
          </div>
        </div>

        <div className="input-group">
          <label>Guests & Rooms</label>
          <div className="guest-dropdown" onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}>
            <span>{getGuestSummary()}</span>
            <ChevronDown size={18} className={`dropdown-icon ${isGuestDropdownOpen ? "open" : ""}`} />

            {isGuestDropdownOpen && (
              <div className="guest-options-panel">
                <div className="guest-option-row">
                  <div className="guest-option-label">Adults</div>
                  <div className="guest-counter">
                    <button
                      className="counter-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDecrement(setAdults, adults, 1)
                      }}
                      disabled={adults <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="counter-value">{adults}</span>
                    <button
                      className="counter-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleIncrement(setAdults, adults)
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="guest-option-row">
                  <div className="guest-option-label">Children</div>
                  <div className="guest-counter">
                    <button
                      className="counter-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDecrement(setChildren, children)
                      }}
                      disabled={children <= 0}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="counter-value">{children}</span>
                    <button
                      className="counter-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleIncrement(setChildren, children)
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="guest-option-row">
                  <div className="guest-option-label">Rooms</div>
                  <div className="guest-counter">
                    <button
                      className="counter-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDecrement(setRooms, rooms, 1)
                      }}
                      disabled={rooms <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="counter-value">{rooms}</span>
                    <button
                      className="counter-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleIncrement(setRooms, rooms)
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button className="book-now-btn">Book Now</button>

      <div className="cancellation-policy">
        <span className="info-icon">ⓘ</span>
        <span className="policy-text">Free cancellation until 24 hours before check-in</span>
      </div>

      {hotelInfo.extraInfo && <div className="offer-badge">{hotelInfo.extraInfo}</div>}
    </div>
  )
}

export default BookingForm

