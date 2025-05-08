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
    <div className="sa-booking-form">
      <div className="sa-price-header">
        <h2 className="sa-per-night-price">NPR {hotelInfo.price }</h2>
        <span className="sa-per-night-label">per night</span>
      </div>

      <div className="sa-price-breakdown">
        <div className="sa-price-row">
          <span className="sa-price-label">Base Price</span>
          <span className="sa-price-value">NPR {basePrice -416}</span>
        </div>
        <div className="sa-price-row">
          <span className="sa-price-label">Taxes & Fees</span>
          <span className="sa-price-value">NPR {taxesAndFees.toLocaleString()}</span>
        </div>
        <div className="sa-price-row total-row">
          <span className="sa-price-label">Total</span>
          <span className="sa-price-value">NPR {hotelInfo.price}</span>
        </div>
        <div className="sa-price-row">
          <span className="sa-reward-label">Reward Points</span>
          <span className="sa-reward-value">{RewardPoint.toLocaleString()}</span>
        </div>
      </div>
      <div className="sa-button">
        <button className="sa-reject-button" onClick={handleBookNow}>
          Reject
        </button>
        <button className="sa-Approve-button" onClick={handleBookNow}>
          Approve
        </button>
      </div>


    </div>
  )
}

export default BookingForm