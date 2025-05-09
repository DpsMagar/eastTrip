"use client"

import { useState, useEffect } from "react"
import "./TwoSearch.css"
import { ArrowLeftRight, ChevronDown, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setHotelLocation } from "../../features/slice/hotelSlice"
import { setGlobalRooms, setGlobalGuests, setHotelCheckInDate, setHotelCheckOutDate } from "../../features/slice/hotelSlice"
import { setTravellers as globalTraveller, setflightDate } from "../../features/slice/flightSlice"
import { useGetHotelsAllQuery } from "../../features/api/hotelApi"
import { useGetHomeStayAllQuery } from "../../features/api/homeStayApi"
export default function TwoSearch() {

  const navigate= useNavigate()
  const dispatch= useDispatch()

  const{data: hotel}= useGetHotelsAllQuery()
    
    const{data: homeStay}= useGetHomeStayAllQuery()

    const locationsHotel = hotel ? Array.from(new Set(hotel.map((hotelItem) => hotelItem.hotelCity))) : [];
    // console.log(locationsHotel);
    

  const locationsHomeStay = homeStay ? Array.from(new Set(homeStay.map((hotelItem) => hotelItem.hotelCity))) : [];


   const { from, to, dayOfWeek, travellers, flightDate,fromLocationFlight, toLocationFlight } = useSelector((state) => state.flight);
  //  console.log("hiiii");
   
  //  console.log(flightDate,"kjhkjh");
   
   const { location: selectedLocations, rooms: selectedRooms, guests: selectedGuests, hotelCheckInDate:checkIn, hotelCheckOutDate: checkOut} = useSelector((state) => state.hotel);
  //  console.log(selectedRooms,"rooms");
  //  console.log(selectedGuests,"guests");
// console.log(checkIn);a[is
  




  const presentTab=  localStorage.getItem('active')
  const [activeTab, setActiveTab] = useState(presentTab)
  const [activePopup, setActivePopup] = useState(null)

  // Flights state
  const [tripType, setTripType] = useState("One Way")
  const [fromLocation, setFromLocation] = useState(fromLocationFlight)
  const [toLocation, setToLocation] = useState(toLocationFlight)
  const [departDate, setDepartDate] = useState(flightDate)
  const [returnDate, setReturnDate] = useState("Select here")

  // Hotels state
  const [location, setLocation] = useState(selectedLocations)
  const [checkInDate, setCheckInDate] = useState(checkIn)
  const [checkOutDate, setCheckOutDate] = useState(checkOut)
  const [rooms, setRooms] = useState(selectedRooms)
  const [guests, setGuests] = useState(selectedGuests)

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [hotelSearch, setHotelSearch] = useState("");
  const [homeStaySearch, setHomeStaySearch] = useState("");

  const locations = [
    { name: "Kathmandu", info: "Tribhuvan International Airport" },
    { name: "Pokhara", info: "Pokhara International Airport" },
    { name: "Lumbini", info: "Lumbini Airport" },
    { name: "Biratnagar", info: "Biratnagar Airport" },
    { name: "Nepalgunj", info: "Nepalgunj Airport" },
  ]

const isPastDate = (day, month, year) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(year, month, day);
  return selectedDate < today;
};

const formatDateString = (dateStr) => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split(' ');
  const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
  return new Date(year, monthIndex, parseInt(day));
};
  const handleSwapLocations = () => {
    const temp = fromLocation
    setFromLocation(toLocation)
    setToLocation(temp)
  }

  const handleTripTypeChange = (type) => {
    setTripType(type)
    setActivePopup(null)
  }

  const handleLocationSelect = (loc, type) => {
    if (type === "from") {
      setFromLocation(loc)
    } else if (type === "to") {
      setToLocation(loc)
    } else {
      setLocation(loc)
    }
    setActivePopup(null)
  }

  const handleDateSelect = (date, type) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = formatDateString(date);
    
    // Prevent selecting past dates for departure/check-in
    if ((type === "depart" || type === "checkIn") && selectedDate < today) {
      return; // Don't proceed with selection
    }
    
    // For return date, must be after departure date
    if (type === "return" && departDate !== "Select here") {
      const departDateObj = formatDateString(departDate);
      if (selectedDate < departDateObj) {
        return;
      }
    }
    
    // For check-out date, must be after check-in date
    if (type === "checkOut" && checkInDate) {
      const checkInDateObj = formatDateString(checkInDate);
      if (selectedDate < checkInDateObj) {
        return;
      }
    }
  
    if (type === "depart") {
      setDepartDate(date);
    } else if (type === "return") {
      setReturnDate(date);
    } else if (type === "checkIn") {
      setCheckInDate(date);
    } else if (type === "checkOut") {
      setCheckOutDate(date);
    }
    
    setActivePopup(null);
  };


  const handleRoomsGuestsChange = (operation) => {
    if (operation === "addRoom" && rooms < 5) {
      setRooms(rooms + 1)
    } else if (operation === "subtractRoom" && rooms > 1) {
      setRooms(rooms - 1)
    } else if (operation === "addGuest" && guests < 10) {
      setGuests(guests + 1)
    } else if (operation === "subtractGuest" && guests > 1) {
      setGuests(guests - 1)
    }
  }

  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const formatDate = (day) => {
    if (!day) return ""
    const date = new Date(currentYear, currentMonth, day)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${day} ${monthNames[currentMonth]} ${currentYear}`
  }

  const handleSearch=()=>{
    console.log("Search triggered for tab:", activeTab);
    dispatch(setHotelLocation(location))
    // dispatch(globalTraveller(travellers))
    dispatch(setGlobalRooms(rooms))
    dispatch(setGlobalGuests(guests))
    dispatch(setflightDate(departDate))
    dispatch(setHotelCheckInDate(checkInDate))
    dispatch(setHotelCheckOutDate(checkOutDate))
    navigate("/search")
  }
  const handleHotel=()=>{
    console.log("Search triggered for tab:", activeTab);
    dispatch(setHotelLocation(location))
    // dispatch(globalTraveller(travellers))
    dispatch(setGlobalRooms(rooms))
    dispatch(setGlobalGuests(guests))
    dispatch(setHotelCheckInDate(checkInDate))
    dispatch(setHotelCheckOutDate(checkOutDate))
    navigate("/search")
  }
  const handleHomeStay=()=>{
    console.log("Search triggered for tab:", activeTab);
    dispatch(setHotelLocation(location))
    // dispatch(globalTraveller(travellers))
    dispatch(setGlobalRooms(rooms))
    dispatch(setGlobalGuests(guests))
    dispatch(setHotelCheckInDate(checkInDate))
    dispatch(setHotelCheckOutDate(checkOutDate))
    navigate("/search")
  }

  return (
    <div className="travel-search">
      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "flights" ? "active" : ""}`} onClick={() => {setActiveTab("flights");
         handleSearch()}}>
          Flights
        </button>
        <button className={`tab ${activeTab === "hotels" ? "active" : ""}`} onClick={() => {setActiveTab("hotels");
        handleSearch()}}>
          Hotel
        </button>
        <button
          className={`tab ${activeTab === "homeStays" ? "active" : ""}`}
          onClick={() => {setActiveTab("homeStays");
          handleSearch()}}
        >
          HomeStays
        </button>
      </div>

      {/* Flights Search Form */}
      {activeTab === "flights" && (
        <div className="search-form">
          {/* Trip Type */}
          <div className="field" onClick={() => setActivePopup("tripType")}>
            <div className="field-label">Trip Type</div>
            <div className="field-value">
              {tripType}
              <ChevronDown size={16} />
            </div>
          </div>

          {/* From */}
          <div className="field" onClick={() => setActivePopup("from")}>
            <div className="field-label">From</div>
            <div className="field-value">{fromLocation}</div>
          </div>

          {/* Swap Button */}
          <button className="swap-button" onClick={handleSwapLocations}>
            <ArrowLeftRight size={16} />
          </button>

          {/* To */}
          <div className="field" onClick={() => setActivePopup("to")}>
            <div className="field-label">To</div>
            <div className="field-value">{toLocation}</div>
          </div>

          {/* Depart Time */}
          <div className="field" onClick={() => setActivePopup("depart")}>
            <div className="field-label">Depart Time</div>
            <div className="field-value">{departDate}</div>
          </div>

          {/* Return */}
          <div
            className={`field ${tripType === "One Way" ? "disabled" : ""}`}
            onClick={() => tripType !== "One Way" && setActivePopup("return")}
          >
            <div className="field-label">Return</div>
            <div className="field-value">{returnDate}</div>
          </div>

          {/* Search Button */}
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      )}

      {/* Hotels Search Form */}
      {(activeTab === "hotels") && (
        <div className="search-form">
          {/* Location */}
          <div className="field" onClick={() => setActivePopup("Hotellocation")}>
            <div className="field-label">City, Hotel Name or Location</div>
            <div className="field-value">{location}</div>
          </div>

          {/* Check In */}
          <div className="field" onClick={() => setActivePopup("checkIn")}>
            <div className="field-label">Check In</div>
            <div className="field-value">{checkInDate}</div>
            <div className="field-subtext">Saturday</div>
          </div>

          {/* Check Out */}
          <div className="field" onClick={() => setActivePopup("checkOut")}>
            <div className="field-label">Check Out</div>
            <div className="field-value">{checkOutDate}</div>
            <div className="field-subtext">Sunday</div>
          </div>

          {/* Rooms & Guests */}
          <div className="field" onClick={() => setActivePopup("roomsGuests")}>
            <div className="field-label">Rooms & Guests</div>
            <div className="field-value">
              {rooms} Room & {guests} Guests
            </div>
          </div>

          {/* Search Button */}
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      )}

      {(activeTab === "homeStays") && (
        <div className="search-form">
          {/* Location */}
          <div className="field" onClick={() => setActivePopup("HomeStaylocation")}>
            <div className="field-label">City, homeStay Name or Location</div>
            <div className="field-value">{location}</div>
          </div>

          {/* Check In */}
          <div className="field" onClick={() => setActivePopup("checkIn")}>
            <div className="field-label">Check In</div>
            <div className="field-value">{checkInDate}</div>
            <div className="field-subtext">Saturday</div>
          </div>

          {/* Check Out */}
          <div className="field" onClick={() => setActivePopup("checkOut")}>
            <div className="field-label">Check Out</div>
            <div className="field-value">{checkOutDate}</div>
            <div className="field-subtext">Sunday</div>
          </div>

          {/* Rooms & Guests */}
          <div className="field" onClick={() => setActivePopup("roomsGuests")}>
            <div className="field-label">Rooms & Guests</div>
            <div className="field-value">
              {rooms} Room & {guests} Guests
            </div>
          </div>

          {/* Search Button */}
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      )}

      {/* Popups */}
      {activePopup && (
        <div className="popup-overlay" onClick={() => setActivePopup(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            {/* Trip Type Popup */}
            {activePopup === "tripType" && (
              <>
                <div className="popup-header">
                  <h3>Select Trip Type</h3>
                  <button className="close-button" onClick={() => setActivePopup(null)}>
                    <X size={16} />
                  </button>
                </div>
                <div className="popup-content">
                  <div className="option-list">
                    <div
                      className={`option ${tripType === "One Way" ? "selected" : ""}`}
                      onClick={() => handleTripTypeChange("One Way")}
                    >
                      <div className="radio-button">
                        <div className="radio-inner"></div>
                      </div>
                      <span>One Way</span>
                    </div>
                    <div
                      className={`option ${tripType === "Round Trip" ? "selected" : ""}`}
                      onClick={() => handleTripTypeChange("Round Trip")}
                    >
                      <div className="radio-button">
                        <div className="radio-inner"></div>
                      </div>
                      <span>Round Trip</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Location Popup */}
{(activePopup === "from" || activePopup === "to") && (
  <>
    <div className="popup-header">
      <h3>
        {activePopup === "from"
          ? "Select Departure City"
          : "Select Destination City"}
      </h3>
      <button className="close-button" onClick={() => setActivePopup(null)}>
        <X size={16} />
      </button>
    </div>
    <div className="popup-content">
      <div className="search-input">
        <input 
          type="text" 
          placeholder="Search for a city" 
          value={activePopup === "from" ? fromSearch : toSearch}
          onChange={(e) => 
            activePopup === "from" 
              ? setFromSearch(e.target.value) 
              : setToSearch(e.target.value)
          }
        />
      </div>
      <div className="location-list">
        {locations
          .filter(loc => 
            loc.name.toLowerCase().includes(
              (activePopup === "from" ? fromSearch : toSearch).toLowerCase()
            )
          )
          .map((loc, index) => (
            <div
              key={index}
              className="location-item"
              onClick={() => {
                handleLocationSelect(loc.name, activePopup);
                activePopup === "from" 
                  ? setFromSearch("") 
                  : setToSearch("");
              }}
            >
              <div className="location-name">{loc.name}</div>
              <div className="location-info">{loc.info}</div>
            </div>
          ))}
      </div>
    </div>
  </>
)}

{(activePopup === "Hotellocation") && (
  <>
    <div className="popup-header">
      <h3>Select Hotel Location</h3>
      <button className="close-button" onClick={() => setActivePopup(null)}>
        <X size={16} />
      </button>
    </div>
    <div className="popup-content">
      <div className="search-input">
        <input 
          type="text" 
          placeholder="Search for a city or hotel" 
          value={hotelSearch}
          onChange={(e) => setHotelSearch(e.target.value)}
        />
      </div>
      <div className="location-list">
        {locationsHotel
          .filter(loc => 
            loc.toLowerCase().includes(hotelSearch.toLowerCase())
          )
          .map((loc, index) => (
            <div
              key={index}
              className="location-item"
              onClick={() => {
                handleLocationSelect(loc, activePopup);
                setHotelSearch("");
              }}
            >
              <div className="location-name">{loc}</div>
              <div className="location-info">{loc}, Nepal</div>
            </div>
          ))}
      </div>
    </div>
  </>
)}

{(activePopup === "HomeStaylocation") && (
  <>
    <div className="popup-header">
      <h3>Select HomeStay Location</h3>
      <button className="close-button" onClick={() => setActivePopup(null)}>
        <X size={16} />
      </button>
    </div>
    <div className="popup-content">
      <div className="search-input">
        <input 
          type="text" 
          placeholder="Search for a city or homestay" 
          value={homeStaySearch}
          onChange={(e) => setHomeStaySearch(e.target.value)}
        />
      </div>
      <div className="location-list">
        {locationsHomeStay
          .filter(loc => 
            loc.toLowerCase().includes(homeStaySearch.toLowerCase())
          )
          .map((loc, index) => (
            <div
              key={index}
              className="location-item"
              onClick={() => {
                handleLocationSelect(loc, activePopup);
                setHomeStaySearch("");
              }}
            >
              <div className="location-name">{loc}</div>
              <div className="location-info">{loc}</div>
            </div>
          ))}
      </div>
    </div>
  </>
)}

{(activePopup === "depart" ||
  activePopup === "return" ||
  activePopup === "checkIn" ||
  activePopup === "checkOut") && (
  <>
    <div className="popup-header">
      <h3>
        {activePopup === "depart"
          ? "Select Departure Date"
          : activePopup === "return"
            ? "Select Return Date"
            : activePopup === "checkIn"
              ? "Select Check In Date"
              : "Select Check Out Date"}
      </h3>
      <button className="close-button" onClick={() => setActivePopup(null)}>
        <X size={16} />
      </button>
    </div>
    <div className="popup-content1">
      <div className="calendar">
        <div className="calendar-header">
          <button className="calendar-nav" onClick={handlePrevMonth}>
            &lt;
          </button>
          <div className="calendar-title">
            {["January", "February", "March", "April", "May", "June", 
              "July", "August", "September", "October", "November", "December"][currentMonth]} {currentYear}
          </div>
          <button className="calendar-nav" onClick={handleNextMonth}>
            &gt;
          </button>
        </div>
        <div className="calendar-days">
          <div className="weekday">Su</div>
          <div className="weekday">Mo</div>
          <div className="weekday">Tu</div>
          <div className="weekday">We</div>
          <div className="weekday">Th</div>
          <div className="weekday">Fr</div>
          <div className="weekday">Sa</div>

          {generateCalendarDays().map((day, index) => {
            const formattedCurrentDate = formatDate(day);
            const isSelected = 
              (activePopup === "depart" && departDate === formattedCurrentDate) ||
              (activePopup === "return" && returnDate === formattedCurrentDate) ||
              (activePopup === "checkIn" && checkInDate === formattedCurrentDate) ||
              (activePopup === "checkOut" && checkOutDate === formattedCurrentDate);

            const isDisabled = 
              !day ? true : // Empty cells are always disabled
              (activePopup === "depart" || activePopup === "checkIn") ? 
                isPastDate(day, currentMonth, currentYear) :
              activePopup === "return" ?
                formatDateString(departDate) && 
                new Date(currentYear, currentMonth, day) < formatDateString(departDate) :
              activePopup === "checkOut" ?
                formatDateString(checkInDate) && 
                new Date(currentYear, currentMonth, day) < formatDateString(checkInDate) :
              false;

            return (
              <div
                key={index}
                className={`calendar-day ${!day ? "empty" : ""} ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                onClick={() => !isDisabled && day && handleDateSelect(formattedCurrentDate, activePopup)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </>
)}

            {/* Rooms & Guests Popup */}
            {activePopup === "roomsGuests" && (
              <>
                <div className="popup-header">
                  <h3>Select Rooms & Guests</h3>
                  <button className="close-button" onClick={() => setActivePopup(null)}>
                    <X size={16} />
                  </button>
                </div>
                <div className="popup-content">
                  <div className="counter-section">
                    <div className="counter-label">Rooms</div>
                    <div className="counter-controls">
                      <button
                        className="counter-button"
                        onClick={() => handleRoomsGuestsChange("subtractRoom")}
                        disabled={rooms <= 1}
                      >
                        -
                      </button>
                      <span className="counter-value">{rooms}</span>
                      <button
                        className="counter-button"
                        onClick={() => handleRoomsGuestsChange("addRoom")}
                        disabled={rooms >= 5}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="counter-section">
                    <div className="counter-label">Guests</div>
                    <div className="counter-controls">
                      <button
                        className="counter-button"
                        onClick={() => handleRoomsGuestsChange("subtractGuest")}
                        disabled={guests <= 1}
                      >
                        -
                      </button>
                      <span className="counter-value">{guests}</span>
                      <button
                        className="counter-button"
                        onClick={() => handleRoomsGuestsChange("addGuest")}
                        disabled={guests >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="popup-info">Maximum 5 rooms and 10 guests allowed</div>

                  <button className="apply-button" onClick={() => setActivePopup(null)}>
                    Apply
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}