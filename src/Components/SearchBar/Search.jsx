"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Search.css"

export default function Search() {
  const navigate = useNavigate()
  const handleLogoClick = () => {
    navigate("/search")
  }
  const [activeTab, setActiveTab] = useState("flights")
  const [activePopup, setActivePopup] = useState(null)
  const [tripType, setTripType] = useState("One Way")

  // Flight state
  const [fromLocation, setFromLocation] = useState("Kathmandu")
  const [fromAirport, setFromAirport] = useState("Tribhuvan International Airport")
  const [toLocation, setToLocation] = useState("Lumbini")
  const [toAirport, setToAirport] = useState("Lumbini Airport")
  const [departureDate, setDepartureDate] = useState("21 Mar 2025")
  const [departureDay, setDepartureDay] = useState("Friday")
  const [returnDate, setReturnDate] = useState("")
  const [returnDay, setReturnDay] = useState("")
  const [travellers, setTravellers] = useState(2)

  // Hotel state
  const [location, setLocation] = useState("Kathmandu")
  const [hotelName, setHotelName] = useState("")
  const [checkInDate, setCheckInDate] = useState("21 Feb 2025")
  const [checkInDay, setCheckInDay] = useState("Friday")
  const [checkOutDate, setCheckOutDate] = useState("22 Feb 2025")
  const [checkOutDay, setCheckOutDay] = useState("Saturday")
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(4)

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const months = [
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
  ]

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const airports = {
    Kathmandu: "Tribhuvan International Airport",
    Pokhara: "Pokhara International Airport",
    Lumbini: "Lumbini Airport",
    Biratnagar: "Biratnagar Airport",
    Nepalgunj: "Nepalgunj Airport",
    Bharatpur: "Bharatpur Airport",
    Janakpur: "Janakpur Airport",
    Dhangadhi: "Dhangadhi Airport",
    Lukla: "Tenzing-Hillary Airport",
    Jomsom: "Jomsom Airport",
    Simara: "Simara Airport",
    Tumlingtar: "Tumlingtar Airport",
    Surkhet: "Surkhet Airport",
    Bhadrapur: "Bhadrapur Airport",
    Bhojpur: "Bhojpur Airport",
    Phaplu: "Phaplu Airport",
    Taplejung: "Taplejung Airport",
  }

  const locations = [
    "Kathmandu",
    "Pokhara",
    "Lumbini",
    "Biratnagar",
    "Nepalgunj",
    "Bharatpur",
    "Janakpur",
    "Dhangadhi",
    "Lukla",
    "Jomsom",
    "Simara",
    "Tumlingtar",
    "Surkhet",
    "Bhadrapur",
    "Bhojpur",
    "Phaplu",
    "Taplejung",
  ]

  const handleLocationSelect = (location, type) => {
    if (type === "from") {
      setFromLocation(location)
      setFromAirport(airports[location])
    } else if (type === "to") {
      setToLocation(location)
      setToAirport(airports[location])
    } else if (type === "hotel") {
      setLocation(location)
    }
    setActivePopup(null)
  }

  const handleSwapLocations = () => {
    const tempLocation = fromLocation
    const tempAirport = fromAirport
    setFromLocation(toLocation)
    setFromAirport(toAirport)
    setToLocation(tempLocation)
    setToAirport(tempAirport)
  }

  const handleTripTypeChange = (type) => {
    setTripType(type)
    if (type === "One Way") {
      setReturnDate("")
      setReturnDay("")
    }
  }

  const handleTravellerChange = (operation) => {
    if (operation === "add" && travellers < 9) {
      setTravellers(travellers + 1)
    } else if (operation === "subtract" && travellers > 1) {
      setTravellers(travellers - 1)
    }
  }

  const handleRoomsChange = (operation) => {
    if (operation === "add" && rooms < 5) {
      setRooms(rooms + 1)
    } else if (operation === "subtract" && rooms > 1) {
      setRooms(rooms - 1)
    }
  }

  const handleGuestsChange = (operation) => {
    if (operation === "add" && guests < 10) {
      setGuests(guests + 1)
    } else if (operation === "subtract" && guests > 1) {
      setGuests(guests - 1)
    }
  }

  const handleHotelNameChange = (e) => {
    setHotelName(e.target.value)
  }

  const generateCalendarDays = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const calendarDays = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i)
    }

    return calendarDays
  }

  const handleDateSelect = (day, month, year, type) => {
    const date = new Date(year, month, day)
    const formattedDate = `${day} ${months[month].substring(0, 3)} ${year}`
    const dayOfWeek = days[date.getDay()]

    if (type === "departure") {
      setDepartureDate(formattedDate)
      setDepartureDay(dayOfWeek)
    } else if (type === "return") {
      setReturnDate(formattedDate)
      setReturnDay(dayOfWeek)
    } else if (type === "checkIn") {
      setCheckInDate(formattedDate)
      setCheckInDay(dayOfWeek)
    } else if (type === "checkOut") {
      setCheckOutDate(formattedDate)
      setCheckOutDay(dayOfWeek)
    }

    setActivePopup(null)
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

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <div className="tabs">
          <div className={`tab ${activeTab === "flights" ? "active" : ""}`} onClick={() => setActiveTab("flights")}>
            <div className="tab-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 15L15 21M21 15H13.5M21 15V22.5M3 9L9 3M3 9H10.5M3 9V1.5"
                  stroke={activeTab === "flights" ? "#FF7E45" : "#000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="tab-text">Flights</div>
          </div>
          <div className={`tab ${activeTab === "hotels" ? "active" : ""}`} onClick={() => setActiveTab("hotels")}>
            <div className="tab-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 21H21M3 18H21M5 18V8C5 7.46957 5.21071 6.96086 5.58579 6.58579C5.96086 6.21071 6.46957 6 7 6H17C17.5304 6 18.0391 6.21071 18.4142 6.58579C18.7893 6.96086 19 7.46957 19 8V18M9 6V3H15V6"
                  stroke={activeTab === "hotels" ? "#FF7E45" : "#000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="tab-text">Hotels</div>
          </div>
          <div className={`tab ${activeTab === "homestays" ? "active" : ""}`} onClick={() => setActiveTab("homestays")}>
            <div className="tab-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke={activeTab === "homestays" ? "#FF7E45" : "#000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke={activeTab === "homestays" ? "#FF7E45" : "#000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="tab-text">Homestays</div>
          </div>
        </div>

        {activeTab === "flights" && (
          <div className="flight-search">
            <div className="trip-type">
              <label className="trip-option">
                <input
                  type="radio"
                  name="trip"
                  checked={tripType === "One Way"}
                  onChange={() => handleTripTypeChange("One Way")}
                />
                <span className="radio-circle"></span>
                <span>One Way</span>
              </label>
              <label className="trip-option">
                <input
                  type="radio"
                  name="trip"
                  checked={tripType === "Round Trip"}
                  onChange={() => handleTripTypeChange("Round Trip")}
                />
                <span className="radio-circle"></span>
                <span>Round Trip</span>
              </label>
            </div>

            <div className="search-form-row">
              <div className="form-group" onClick={() => setActivePopup("from")}>
                <div className="field-label">From</div>
                <div className="field-value">{fromLocation}</div>
                <div className="field-subtext">{fromAirport}</div>
              </div>

              <div className="swap-button" onClick={handleSwapLocations}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 10L3 14L7 18"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 14L21 10L17 6"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M21 10H3" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 14H21" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="form-group" onClick={() => setActivePopup("to")}>
                <div className="field-label">To</div>
                <div className="field-value">{toLocation}</div>
                <div className="field-subtext">{toAirport}</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("departure")}>
                <div className="field-label">Departure</div>
                <div className="field-value">{departureDate.split(" ")[0]}</div>
                <div className="field-subtext">
                  {departureDate.split(" ")[1]} {departureDate.split(" ")[2]}
                </div>
                <div className="field-day">{departureDay}</div>
              </div>

              <div className="form-group" onClick={() => tripType !== "One Way" && setActivePopup("return")}>
                <div className="field-label">Return</div>
                {returnDate ? (
                  <>
                    <div className="field-value">{returnDate.split(" ")[0]}</div>
                    <div className="field-subtext">
                      {returnDate.split(" ")[1]} {returnDate.split(" ")[2]}
                    </div>
                    <div className="field-day">{returnDay}</div>
                  </>
                ) : (
                  <div className="field-placeholder">Tap to add return date</div>
                )}
              </div>

              <div className="form-group" onClick={() => setActivePopup("travellers")}>
                <div className="field-label">Travellers</div>
                <div className="field-value">{travellers}</div>
                <div className="field-subtext">Traveller{travellers !== 1 ? "s" : ""}</div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "hotels" || activeTab === "homestays") && (
          <div className="hotel-search">
            <div className="search-form-row">
              <div className="form-group location-field" onClick={() => setActivePopup("hotelLocation")}>
                <div className="field-label">City, Hotel Name or Location</div>
                <div className="field-value">{location}</div>
                <div className="field-subtext">{location}, Nepal</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("checkIn")}>
                <div className="field-label">Check In</div>
                <div className="field-value">{checkInDate.split(" ")[0]}</div>
                <div className="field-subtext">
                  {checkInDate.split(" ")[1]} {checkInDate.split(" ")[2]}
                </div>
                <div className="field-day">{checkInDay}</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("checkOut")}>
                <div className="field-label">Check Out</div>
                <div className="field-value">{checkOutDate.split(" ")[0]}</div>
                <div className="field-subtext">
                  {checkOutDate.split(" ")[1]} {checkOutDate.split(" ")[2]}
                </div>
                <div className="field-day">{checkOutDay}</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("roomsGuests")}>
                <div className="field-label">Rooms & Guests</div>
                <div className="field-value">
                  {rooms} Room{rooms !== 1 ? "s" : ""} & {guests} Guest{guests !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>
        )}

        <button className="search-button" onClick={handleLogoClick}>
          Search
        </button>
      </div>

      {/* From Location Popup */}
      {activePopup === "from" && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3>Select Departure City</h3>
              <button className="close-button" onClick={() => setActivePopup(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="popup-content">
              <div className="location-search">
                <input type="text" placeholder="Search for a city" />
              </div>
              <div className="location-list">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className={`location-item ${location === fromLocation ? "active" : ""}`}
                    onClick={() => handleLocationSelect(location, "from")}
                  >
                    <div className="location-name">{location}</div>
                    <div className="location-airport">{airports[location]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* To Location Popup */}
      {activePopup === "to" && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3>Select Destination City</h3>
              <button className="close-button" onClick={() => setActivePopup(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="popup-content">
              <div className="location-search">
                <input type="text" placeholder="Search for a city" />
              </div>
              <div className="location-list">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className={`location-item ${location === toLocation ? "active" : ""}`}
                    onClick={() => handleLocationSelect(location, "to")}
                  >
                    <div className="location-name">{location}</div>
                    <div className="location-airport">{airports[location]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hotel Location Popup */}
      {activePopup === "hotelLocation" && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3>Select Location or Enter Hotel Name</h3>
              <button className="close-button" onClick={() => setActivePopup(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="popup-content">
              <div className="location-search">
                <input
                  type="text"
                  placeholder="Search for a city or hotel"
                  value={hotelName}
                  onChange={handleHotelNameChange}
                />
              </div>
              <div className="location-list">
                {locations.map((loc, index) => (
                  <div
                    key={index}
                    className={`location-item ${loc === location ? "active" : ""}`}
                    onClick={() => handleLocationSelect(loc, "hotel")}
                  >
                    <div className="location-name">{loc}</div>
                    <div className="location-airport">{loc}, Nepal</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Popup */}
      {(activePopup === "departure" ||
        activePopup === "return" ||
        activePopup === "checkIn" ||
        activePopup === "checkOut") && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3>
                Select{" "}
                {activePopup === "departure"
                  ? "Departure"
                  : activePopup === "return"
                    ? "Return"
                    : activePopup === "checkIn"
                      ? "Check In"
                      : "Check Out"}{" "}
                Date
              </h3>
              <button className="close-button" onClick={() => setActivePopup(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="popup-content">
              <div className="calendar-container">
                <div className="calendar">
                  <div className="calendar-header">
                    <button className="calendar-nav" onClick={handlePrevMonth}>
                      &lt;
                    </button>
                    <div className="calendar-title">
                      {months[currentMonth]} {currentYear}
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

                    {generateCalendarDays(currentMonth, currentYear).map((day, index) => {
                      const dateStr = day ? `${day} ${months[currentMonth].substring(0, 3)} ${currentYear}` : ""
                      const isSelected =
                        (activePopup === "departure" && dateStr === departureDate) ||
                        (activePopup === "return" && dateStr === returnDate) ||
                        (activePopup === "checkIn" && dateStr === checkInDate) ||
                        (activePopup === "checkOut" && dateStr === checkOutDate)

                      const isDisabled =
                        activePopup === "return" && day
                          ? new Date(currentYear, currentMonth, day) <
                            new Date(
                              Number.parseInt(departureDate.split(" ")[2]),
                              months.findIndex((m) => m.substring(0, 3) === departureDate.split(" ")[1]),
                              Number.parseInt(departureDate.split(" ")[0]),
                            )
                          : activePopup === "checkOut" && day
                            ? new Date(currentYear, currentMonth, day) <
                              new Date(
                                Number.parseInt(checkInDate.split(" ")[2]),
                                months.findIndex((m) => m.substring(0, 3) === checkInDate.split(" ")[1]),
                                Number.parseInt(checkInDate.split(" ")[0]),
                              )
                            : false

                      return (
                        <div
                          key={`current-${index}`}
                          className={`calendar-day ${!day ? "empty" : ""} ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                          onClick={() =>
                            day &&
                            !isDisabled &&
                            handleDateSelect(
                              day,
                              currentMonth,
                              currentYear,
                              activePopup === "departure"
                                ? "departure"
                                : activePopup === "return"
                                  ? "return"
                                  : activePopup === "checkIn"
                                    ? "checkIn"
                                    : "checkOut",
                            )
                          }
                        >
                          {day}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {(activePopup === "return" || activePopup === "checkOut") && (
                  <div className="date-selection-info">
                    <div className="date-range">
                      <div className="date-range-item">
                        <span className="date-label">{activePopup === "return" ? "Departure:" : "Check In:"}</span>
                        <span className="date-value-small">
                          {activePopup === "return" ? departureDate : checkInDate}
                        </span>
                      </div>
                      <div className="date-range-item">
                        <span className="date-label">{activePopup === "return" ? "Return:" : "Check Out:"}</span>
                        <span className="date-value-small">
                          {activePopup === "return" ? returnDate || "Not selected" : checkOutDate || "Not selected"}
                        </span>
                      </div>
                    </div>
                    <button className="apply-button" onClick={() => setActivePopup(null)}>
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Travellers Popup */}
      {activePopup === "travellers" && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3>Select Travellers</h3>
              <button className="close-button" onClick={() => setActivePopup(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="popup-content">
              <div className="traveller-selector">
                <div className="traveller-type">
                  <div className="traveller-label">Adults</div>
                  <div className="traveller-controls">
                    <button
                      className="traveller-button"
                      onClick={() => handleTravellerChange("subtract")}
                      disabled={travellers <= 1}
                    >
                      -
                    </button>
                    <span className="traveller-count">{travellers}</span>
                    <button
                      className="traveller-button"
                      onClick={() => handleTravellerChange("add")}
                      disabled={travellers >= 9}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="traveller-info">
                  <p>Maximum 9 travellers allowed</p>
                </div>
                <button className="apply-button" onClick={() => setActivePopup(null)}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rooms & Guests Popup */}
      {activePopup === "roomsGuests" && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3>Select Rooms & Guests</h3>
              <button className="close-button" onClick={() => setActivePopup(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="popup-content">
              <div className="traveller-selector">
                <div className="traveller-type">
                  <div className="traveller-label">Rooms</div>
                  <div className="traveller-controls">
                    <button
                      className="traveller-button"
                      onClick={() => handleRoomsChange("subtract")}
                      disabled={rooms <= 1}
                    >
                      -
                    </button>
                    <span className="traveller-count">{rooms}</span>
                    <button className="traveller-button" onClick={() => handleRoomsChange("add")} disabled={rooms >= 5}>
                      +
                    </button>
                  </div>
                </div>
                <div className="traveller-type">
                  <div className="traveller-label">Guests</div>
                  <div className="traveller-controls">
                    <button
                      className="traveller-button"
                      onClick={() => handleGuestsChange("subtract")}
                      disabled={guests <= 1}
                    >
                      -
                    </button>
                    <span className="traveller-count">{guests}</span>
                    <button
                      className="traveller-button"
                      onClick={() => handleGuestsChange("add")}
                      disabled={guests >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="traveller-info">
                  <p>Maximum 5 rooms and 10 guests allowed</p>
                </div>
                <button className="apply-button" onClick={() => setActivePopup(null)}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

