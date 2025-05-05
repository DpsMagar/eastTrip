"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Minus, Plus } from "lucide-react"
import "./booking-form.css"
import { useDispatch, useSelector } from "react-redux"
import { setGlobalGuests, setGlobalRooms, setHotelCheckInDate, setHotelCheckOutDate } from "../../features/slice/hotelSlice"
import { useBookNowMutation } from "../../features/api/bookApi"

const BookingForm = ({ hotelInfo }) => {

  const [book] = useBookNowMutation();

  console.log(hotelInfo);
    const innType= useSelector((state)=> state.active.activeTypeIndex );
  


  

  const userID= localStorage.getItem('userId');

  const dispatch= useDispatch();

  const {hotelCheckInDate, hotelCheckOutDate, rooms: roomFromStore, guests: guestsFromStore}= useSelector((state)=> state.hotel)

  const checkInDate= new Date(hotelCheckInDate).toISOString().split("T")[0];
  const checkOutDate= new Date(hotelCheckOutDate).toISOString().split("T")[0];
  


  
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

  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false)
  const [adults, setAdults] = useState(guestsFromStore)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(roomFromStore)

  const basePrice = validHotelInfo.price
  const RewardPoint = validHotelInfo.rewardPoints
  const taxesAndFees = Math.round(basePrice * 0.16)
  const totalPrice = basePrice + taxesAndFees
  const perNightPrice = Math.round(totalPrice / 3)

  function convertDateFormat(inputDate) {
    const date = new Date(inputDate);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const Cin = convertDateFormat(hotelCheckInDate);
  const Cout = convertDateFormat(hotelCheckOutDate);

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

  const handleCheckIn=(e)=>{
    dispatch(setHotelCheckInDate(e.target.value))
  }

  const handleCheckOut= (e)=>{
    dispatch(setHotelCheckOutDate(e.target.value))
  }
  useEffect(() => {
    dispatch(setGlobalGuests(adults + children)) 
  }, [adults, children])
  
  useEffect(() => {
    dispatch(setGlobalRooms(rooms))
  }, [rooms])

  const handleBookNow= async ()=>{

    const bookDTO={
      name:hotelInfo.name,
      userId:userID,
      innId: hotelInfo.id,
      checkInDate:Cin, 
      checkOutDate:Cout,
      numberOfGuests:guestsFromStore, 
      numberOfRooms:roomFromStore,
      innType,
      totalPrice: hotelInfo.price
    }

    console.log(bookDTO);
    
    try {
      const response = await book(bookDTO).unwrap();
      console.log(response);
    } catch (error) {
      console.error("Error booking:", error);
    }
  }
    
  return (
    <div className="booking-form">
      <div className="price-header">
        <h2 className="per-night-price">NPR {hotelInfo.price }</h2>
        <span className="per-night-label">per night</span>
      </div>

      <div className="price-breakdown">
        <div className="price-row">
          <span className="price-label">Base Price</span>
          <span className="price-value">NPR {basePrice -416}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Taxes & Fees</span>
          <span className="price-value">NPR {taxesAndFees.toLocaleString()}</span>
        </div>
        <div className="price-row total-row">
          <span className="price-label">Total</span>
          <span className="price-value">NPR {hotelInfo.price}</span>
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
            <input type="date" id="check-in" className="date-input" value={checkInDate} onChange={handleCheckIn}/>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="check-out">Check-out</label>
          <div className="date-input-wrapper">
            <input type="date" id="check-out" className="date-input" value={checkOutDate} onChange={handleCheckOut} />
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

      <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>

      <div className="cancellation-policy">
        <span className="info-icon">ⓘ</span>
        <span className="policy-text">Free cancellation until 24 hours before check-in</span>
      </div>

      {validHotelInfo.extraInfo && (
        <div className="offer-badge">{validHotelInfo.extraInfo}</div>
      )}
    </div>
  )
}

export default BookingForm
