"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Minus, Plus } from "lucide-react"
import "./booking-form.css"
import { useDispatch, useSelector } from "react-redux"
import { setGlobalGuests, setGlobalRooms, setHotelCheckInDate, setHotelCheckOutDate } from "../../features/slice/hotelSlice"

const BookingForm = ({ hotelInfo }) => {
  const dispatch = useDispatch();
  const { rooms: roomFromStore, guests: guestsFromStore } = useSelector((state) => state.hotel)

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split("T")[0];
  }

  // Initialize dates
  const [checkInDate, setCheckInDate] = useState(getTodayDate())
  const [checkOutDate, setCheckOutDate] = useState("")
  const [minCheckOutDate, setMinCheckOutDate] = useState("")

  // Update Redux store when dates change
  useEffect(() => {
    dispatch(setHotelCheckInDate(checkInDate))
    if (checkOutDate) {
      dispatch(setHotelCheckOutDate(checkOutDate))
    }
  }, [checkInDate, checkOutDate, dispatch])

  // Calculate minimum check-out date whenever check-in changes
  useEffect(() => {
    if (checkInDate) {
      const nextDay = new Date(checkInDate)
      nextDay.setDate(nextDay.getDate() + 1)
      setMinCheckOutDate(nextDay.toISOString().split("T")[0])
      
      // Reset check-out if it's now invalid
      if (checkOutDate && new Date(checkOutDate) <= new Date(checkInDate)) {
        setCheckOutDate("")
      }
    }
  }, [checkInDate])

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

  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false)
  const [adults, setAdults] = useState(guestsFromStore)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(roomFromStore)

  const basePrice = validHotelInfo.price
  const RewardPoint = validHotelInfo.rewardPoints
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
    let summary = `${adults} Guest${adults !== 1 ? "s" : ""}`
    summary += ` · ${rooms} Room${rooms !== 1 ? "s" : ""}`
    return summary
  }

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value)
  }

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value)
  }

  useEffect(() => {
    dispatch(setGlobalGuests(adults + children)) 
  }, [adults, children, dispatch])
  
  useEffect(() => {
    dispatch(setGlobalRooms(rooms))
  }, [rooms, dispatch])

  return (
    <div className="booking-form">
      <div className="price-header">
        <h2 className="per-night-price">NPR {validHotelInfo.price}</h2>
        <span className="per-night-label">per night</span>
      </div>

      <div className="price-breakdown">
        <div className="price-row">
          <span className="price-label">Base Price</span>
          <span className="price-value">NPR {basePrice - 416}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Taxes & Fees</span>
          <span className="price-value">NPR {taxesAndFees.toLocaleString()}</span>
        </div>
        <div className="price-row total-row">
          <span className="price-label">Total</span>
          <span className="price-value">NPR {validHotelInfo.price}</span>
        </div>
        <div className="price-row">
          <span className="reward-label">Reward Points</span>
          <span className="reward-value">{RewardPoint.toLocaleString()}</span>
        </div>
      </div>

      <div className="booking-inputs">
        <div className="input-group">
          <label htmlFor="check-in">Check-in</label>
          <div className="date-input-wrapper">
            <input 
              type="date" 
              id="check-in" 
              className="date-input" 
              value={checkInDate} 
              onChange={handleCheckInChange}
              min={getTodayDate()}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="check-out">Check-out</label>
          <div className="date-input-wrapper">
            <input 
              type="date" 
              id="check-out" 
              className="date-input" 
              value={checkOutDate} 
              onChange={handleCheckOutChange} 
              min={minCheckOutDate}
              disabled={!checkInDate}
              placeholder={checkInDate ? "Select date" : "Select check-in first"}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Guests & Rooms</label>
          <div
            className="guest-dropdown"
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
          >
            <span>{getGuestSummary()}</span>
            <ChevronDown
              size={18}
              className={`dropdown-icon ${isGuestDropdownOpen ? "open" : ""}`}
            />

            {isGuestDropdownOpen && (
              <div className="guest-options-panel">
                <div className="guest-option-row">
                  <div className="guest-option-label">Guests</div>
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



    </div>
  )
}

export default BookingForm