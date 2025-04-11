"use client"

import { useState } from "react"
import "./TwoSearch.css"
import { ArrowLeftRight, ChevronDown, X } from "lucide-react"

export default function TwoSearch() {
  const [activeTab, setActiveTab] = useState("flights")
  const [activePopup, setActivePopup] = useState(null)

  // Flights state
  const [tripType, setTripType] = useState("One Way")
  const [fromLocation, setFromLocation] = useState("Kathmandu")
  const [toLocation, setToLocation] = useState("Pokhara")
  const [departDate, setDepartDate] = useState("Fri, 29 March 2025")
  const [returnDate, setReturnDate] = useState("Select here")

  // Hotels state
  const [location, setLocation] = useState("Kathmandu")
  const [checkInDate, setCheckInDate] = useState("12 Apr 2025")
  const [checkOutDate, setCheckOutDate] = useState("13 Apr 2025")
  const [rooms, setRooms] = useState(2)
  const [guests, setGuests] = useState(4)

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const locations = [
    { name: "Kathmandu", info: "Tribhuvan International Airport" },
    { name: "Pokhara", info: "Pokhara International Airport" },
    { name: "Lumbini", info: "Lumbini Airport" },
    { name: "Biratnagar", info: "Biratnagar Airport" },
    { name: "Nepalgunj", info: "Nepalgunj Airport" },
  ]

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
    if (type === "depart") {
      setDepartDate(date)
    } else if (type === "return") {
      setReturnDate(date)
    } else if (type === "checkIn") {
      setCheckInDate(date)
    } else if (type === "checkOut") {
      setCheckOutDate(date)
    }
    setActivePopup(null)
  }

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

  return (
    <div className="travel-search">
      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "flights" ? "active" : ""}`} onClick={() => setActiveTab("flights")}>
          Flights
        </button>
        <button className={`tab ${activeTab === "hotels" ? "active" : ""}`} onClick={() => setActiveTab("hotels")}>
          Hotel
        </button>
        <button
          className={`tab ${activeTab === "homestays" ? "active" : ""}`}
          onClick={() => setActiveTab("homestays")}
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
          <button className="search-button">Search</button>
        </div>
      )}

      {/* Hotels Search Form */}
      {(activeTab === "hotels" || activeTab === "homestays") && (
        <div className="search-form">
          {/* Location */}
          <div className="field" onClick={() => setActivePopup("location")}>
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
          <button className="search-button">Search</button>
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
            {(activePopup === "from" || activePopup === "to" || activePopup === "location") && (
              <>
                <div className="popup-header">
                  <h3>
                    {activePopup === "from"
                      ? "Select Departure City"
                      : activePopup === "to"
                        ? "Select Destination City"
                        : "Select Location"}
                  </h3>
                  <button className="close-button" onClick={() => setActivePopup(null)}>
                    <X size={16} />
                  </button>
                </div>
                <div className="popup-content">
                  <div className="search-input">
                    <input type="text" placeholder="Search for a city" />
                  </div>
                  <div className="location-list">
                    {locations.map((loc, index) => (
                      <div
                        key={index}
                        className="location-item"
                        onClick={() => handleLocationSelect(loc.name, activePopup)}
                      >
                        <div className="location-name">{loc.name}</div>
                        <div className="location-info">{loc.info}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Date Picker Popup */}
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
                <div className="popup-content">
                  <div className="calendar">
                    <div className="calendar-header">
                      <button className="calendar-nav" onClick={handlePrevMonth}>
                        &lt;
                      </button>
                      <div className="calendar-title">
                        {
                          [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ][currentMonth]
                        }{" "}
                        {currentYear}
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

                      {generateCalendarDays().map((day, index) => (
                        <div
                          key={index}
                          className={`calendar-day ${!day ? "empty" : ""}`}
                          onClick={() => day && handleDateSelect(formatDate(day), activePopup)}
                        >
                          {day}
                        </div>
                      ))}
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