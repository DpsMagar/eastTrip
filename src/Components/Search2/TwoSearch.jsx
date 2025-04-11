"use client"

import { useState, useRef, useEffect } from "react"
import "./TwoSearch.css"
import { ArrowLeftRight, ChevronDown, X } from "lucide-react"
import { useSelector } from "react-redux"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function TwoSearch() {
  const presentTab = localStorage.getItem('active')
  const [activeTab, setActiveTab] = useState(presentTab || "flights")
  const [activePopup, setActivePopup] = useState(null)
  const popupRef = useRef(null)
  const [searchInput, setSearchInput] = useState("")

  // Flights state
  const [tripType, setTripType] = useState("One Way")
  const [fromLocation, setFromLocation] = useState("Kathmandu")
  const [toLocation, setToLocation] = useState("Pokhara")
  const [departDate, setDepartDate] = useState(new Date(2025, 2, 29)) // March is month 2 in JS
  const [returnDate, setReturnDate] = useState(null)
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 })

  // Hotels state
  const [location, setLocation] = useState("Kathmandu")
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)))
  const [rooms, setRooms] = useState(2)
  const [guests, setGuests] = useState(4)

  // Rest of the code remains the same...

  // Top 20 cities in Nepal
  const topCities = [
    "Kathmandu", "Pokhara", "Lalitpur", "Bharatpur", "Biratnagar",
    "Birgunj", "Butwal", "Dharan", "Bhimdatta", "Hetauda",
    "Dhangadhi", "Nepalgunj", "Itahari", "Kirtipur", "Tulsipur",
    "Bidur", "Ghorahi", "Rajbiraj", "Lahan", "Janakpur"
  ]

  // Airports in Nepal
  const locations = [
    { name: "Kathmandu", info: "Tribhuvan International Airport" },
    { name: "Pokhara", info: "Pokhara International Airport" },
    { name: "Biratnagar", info: "Biratnagar Airport" },
    { name: "Nepalgunj", info: "Nepalgunj Airport" },
    { name: "Bhairahawa", info: "Gautam Buddha Airport" },
    { name: "Lukla", info: "Tenzing-Hillary Airport" },
    { name: "Bhadrapur", info: "Chandragadhi Airport" },
    { name: "Dhangadhi", info: "Dhangadhi Airport" },
    { name: "Janakpur", info: "Janakpur Airport" },
    { name: "Tumlingtar", info: "Tumlingtar Airport" }
  ]

  // Filter locations based on search input
  const filteredLocations = activePopup === "location" 
  ? topCities.filter(city => 
      city.toLowerCase().includes(searchInput.toLowerCase()) ||
      searchInput.toLowerCase().includes(city.toLowerCase())
    )
  : locations.filter(loc => 
      loc.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      loc.info.toLowerCase().includes(searchInput.toLowerCase())
    )
  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopup(null)
        setSearchInput("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [popupRef])

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
    setSearchInput("")
  }

  const handleTravelersChange = (type, operation) => {
    setTravelers(prev => {
      const newValue = operation === "increment" ? prev[type] + 1 : prev[type] - 1
      return {
        ...prev,
        [type]: Math.max(0, newValue)
      }
    })
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

  const formatDate = (date) => {
    if (!date) return "Select here"
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const totalTravelers = travelers.adults + travelers.children

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
          className={`tab ${activeTab === "homeStays" ? "active" : ""}`}
          onClick={() => setActiveTab("homeStays")}
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
          <div className="field">
            <div className="field-label">Depart Time</div>
            <DatePicker
              selected={departDate}
              onChange={(date) => setDepartDate(date)}
              dateFormat="EEE, d MMMM yyyy"
              className="date-picker-input"
              minDate={new Date()}
            />
          </div>

          {/* Return */}
          <div className={`field ${tripType === "One Way" ? "disabled" : ""}`}>
            <div className="field-label">Return</div>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              dateFormat="EEE, d MMMM yyyy"
              className="date-picker-input"
              minDate={departDate}
              disabled={tripType === "One Way"}
              placeholderText="Select return date"
            />
          </div>

          {/* Travelers */}
          <div className="field" onClick={() => setActivePopup("travelers")}>
            <div className="field-label">Travelers</div>
            <div className="field-value">
              {totalTravelers} {totalTravelers === 1 ? "Traveler" : "Travelers"}
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Search Button */}
          <button className="search-button">Search</button>
        </div>
      )}

      {/* Hotels Search Form */}
      {(activeTab === "hotels") && (
        <div className="search-form">
          {/* Location */}
          <div className="field wide-field" onClick={() => setActivePopup("location")}>
            <div className="field-label">City, Hotel Name or Location</div>
            <div className="field-value">{location}</div>
          </div>

          {/* Check In */}
          <div className="field">
            <div className="field-label">Check In</div>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              dateFormat="d MMM yyyy"
              className="date-picker-input"
              minDate={new Date()}
            />
          </div>

          {/* Check Out */}
          <div className="field">
            <div className="field-label">Check Out</div>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              dateFormat="d MMM yyyy"
              className="date-picker-input"
              minDate={checkInDate}
            />
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

      {(activeTab === "homeStays") && (
        <div className="search-form">
          {/* Location */}
          <div className="field" onClick={() => setActivePopup("location")}>
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
          <button className="search-button">Search</button>
        </div>
      )}

      {/* Popups */}
      {activePopup && (
        <div className="popup-overlay">
          <div className="popup" ref={popupRef}>
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
                    <input 
                      type="text" 
                      placeholder={
                        activePopup === "location" 
                          ? "Search for city, hotel or location" 
                          : "Search for a city"
                      }
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="location-list">
                    {filteredLocations.map((loc, index) => (
                      <div
                        key={index}
                        className="location-item"
                        onClick={() => handleLocationSelect(
                          activePopup === "location" ? loc : loc.name, 
                          activePopup
                        )}
                      >
                        <div className="location-name">
                          {activePopup === "location" ? loc : loc.name}
                        </div>
                        {activePopup !== "location" && (
                          <div className="location-info">{loc.info}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Travelers Popup */}
            {activePopup === "travelers" && (
              <>
                <div className="popup-header">
                  <h3>Select Travelers</h3>
                  <button className="close-button" onClick={() => setActivePopup(null)}>
                    <X size={16} />
                  </button>
                </div>
                <div className="popup-content">
                  <div className="counter-section">
                    <div className="counter-label">
                      <div>Adults</div>
                      <div className="counter-subtext">12+ years</div>
                    </div>
                    <div className="counter-controls">
                      <button
                        className="counter-button"
                        onClick={() => handleTravelersChange("adults", "decrement")}
                        disabled={travelers.adults <= 1}
                      >
                        -
                      </button>
                      <span className="counter-value">{travelers.adults}</span>
                      <button
                        className="counter-button"
                        onClick={() => handleTravelersChange("adults", "increment")}
                        disabled={travelers.adults >= 9}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="counter-section">
                    <div className="counter-label">
                      <div>Children</div>
                      <div className="counter-subtext">2-11 years</div>
                    </div>
                    <div className="counter-controls">
                      <button
                        className="counter-button"
                        onClick={() => handleTravelersChange("children", "decrement")}
                        disabled={travelers.children <= 0}
                      >
                        -
                      </button>
                      <span className="counter-value">{travelers.children}</span>
                      <button
                        className="counter-button"
                        onClick={() => handleTravelersChange("children", "increment")}
                        disabled={travelers.children >= 8 || totalTravelers >= 9}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="popup-info">Maximum 9 travelers allowed (including adults and children)</div>

                  <button className="apply-button" onClick={() => setActivePopup(null)}>
                    Apply
                  </button>
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