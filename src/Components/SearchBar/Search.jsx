"use client"

import { useState, useEffect } from "react"
import "./Search.css"
import { useNavigate } from "react-router-dom"
import { useGetAirportsAllQuery } from "../../features/api/flightApi"
import { useGetHotelsAllQuery } from "../../features/api/hotelApi"
import { useGetHomeStayAllQuery } from "../../features/api/homeStayApi"
import { useDispatch, useSelector } from "react-redux"
import { setFromFlightLocation,setToFlightLocation , setTo, setDayOfWeek, setTravellers as globalTraveller, setflightDate} from "../../features/slice/flightSlice"
import { setHotelLocation, setHotelCheckInDate, setHotelCheckOutDate } from "../../features/slice/hotelSlice"
import {  setGlobalGuests , setGlobalRooms } from "../../features/slice/hotelSlice"
import { setHomeStayLocation } from "../../features/slice/homeStaySlice"
import { RiHotelLine } from "react-icons/ri";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


export default function TravelBooking() {



  const dispatch = useDispatch();

  const[airports, setAirports]= useState([])
  const[hotelzz, setHotelzzz]= useState([])
  const[homeStayzz, setHomeStayzz]= useState([])



  const {data:airport} = useGetAirportsAllQuery()
  console.log(airport);
  

  useEffect(() => {
    if (airport) {
      setAirports(airport);
    }
  }, [airport]);

  const{data: hotel}= useGetHotelsAllQuery()
  useEffect(() => {
    if (hotel) {
      setHotelzzz(hotel);
    }
  }, [hotel]);
  

  const{data: homeStay}= useGetHomeStayAllQuery()

  useEffect(() => {
    if (homeStay) {
      setHomeStayzz(homeStay);
    }
  }, [homeStay]);
  
  const months1 = [
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
  ];
  
  const days1 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  
   
    const today = new Date();
    const formattedToday = `${today.getDate()} ${months1[today.getMonth()].substring(0, 3)} ${today.getFullYear()}`;
    const todayDay = days1[today.getDay()];

  


  const navigate = useNavigate()


  
  const [activeTab, setActiveTab] = useState("hotels")
  const [activePopup, setActivePopup] = useState(null)
  const [tripType, setTripType] = useState("One Way")

  // Flight state
  const [fromLocation, setFromLocation] = useState("Kathmandu")
  const [fromAirport, setFromAirport] = useState("Tribhuvan International Airport")
  const [toLocation, setToLocation] = useState("Pokhara")
  const [toAirport, setToAirport] = useState("Pokhara International Airport")
  const [departureDate, setDepartureDate] = useState(formattedToday)
  const [departureDay, setDepartureDay] = useState(todayDay)
  const [returnDate, setReturnDate] = useState("")
  const [returnDay, setReturnDay] = useState("")
  const [travellers, setTravellers] = useState(1)
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [hotelSearch, setHotelSearch] = useState("");
  const [homeStaySearch, setHomeStaySearch] = useState("");
  
   const { location: selectedLocations, rooms: selectedRooms, guests: selectedGuests, hotelCheckInDate:checkIn, hotelCheckOutDate: checkOut} = useSelector((state) => state.hotel);
  // Hotel state
  // const [location, setLocation] = useState("Kathmandu")
  const [location, setLocation] = useState(selectedLocations?.trim() || "Kathmandu");

  const [checkInDate, setCheckInDate] = useState(formattedToday);
  const [checkInDay, setCheckInDay] = useState(todayDay);
  const [checkOutDate, setCheckOutDate] = useState(
   
    `${today.getDate() + 1} ${months1[today.getMonth()].substring(0, 3)} ${today.getFullYear()}`
  );
  const [checkOutDay, setCheckOutDay] = useState(days1[(today.getDay() + 1) % 7]);
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(2)

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

 
  const locationsHotel = hotel ? Array.from(new Set(hotel.map((hotelItem) => hotelItem.hotelCity))) : [];

  const locationsHomeStay = homeStay ? Array.from(new Set(homeStay.map((hotelItem) => hotelItem.hotelCity))) : [];

  const handleLocationSelect = (airport, type) => {
    if (type === "from") {
      setFromLocation(airport.airportLocation)
      setFromAirport(airport.airportName)
    } else if (type === "to") {
      setToLocation(airport.airportLocation)
      setToAirport(airport.airportName)
    } else if (type === "hotel") {
      setLocation(airport)
      console.log(airport);
      
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

  const generateCalendarDays = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const calendarDays = []


    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null)
    }


    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i)
    }

    return calendarDays
  }

  const handleDateSelect = (day, month, year, type) => {
    const selectedDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
  
    // Prevent selecting past dates for departure/check-in
    if ((type === "departure" || type === "checkIn") && selectedDate < today) {
      return; // Don't proceed with selection
    }
  
    const formattedDate = `${day} ${months1[month].substring(0, 3)} ${year}`;
    const dayOfWeek = days1[selectedDate.getDay()];
  
    if (type === "departure") {
      setDepartureDate(formattedDate);
      dispatch(setDayOfWeek(dayOfWeek));
      setDepartureDay(dayOfWeek);
    } else if (type === "return") {
      setReturnDate(formattedDate);
      setReturnDay(dayOfWeek);
    } else if (type === "checkIn") {
      setCheckInDate(formattedDate);
      setCheckInDay(dayOfWeek);
    } else if (type === "checkOut") {
      setCheckOutDate(formattedDate);
      setCheckOutDay(dayOfWeek);
    }
  
    setActivePopup(null);
  };

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

  
  const handleLogoClick = () => {
    dispatch(globalTraveller(travellers))
    dispatch(setGlobalRooms(rooms))
    dispatch(setGlobalGuests(guests))
    dispatch(setflightDate(departureDate))
    dispatch(setHotelCheckInDate(checkInDate))
    dispatch(setHotelCheckOutDate(checkOutDate))

    navigate("/search");

  };

  // localStorage.setItem('active', 'hotels');
  useEffect(()=>{
      localStorage.setItem('active', 'hotels');

  },[])

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <div className="tabs">
          <div className={`tab ${activeTab === "flights" ? "active" : ""}`} onClick={() => {setActiveTab("flights")
           localStorage.setItem('active', 'flights')
          }}>
            <div className="tab-icon">
            <RiFlightTakeoffFill className="flight-icon" color={activeTab === "flights" ? "#FF7E45" : "#000"} size={24} />
            </div>
            <div className="tab-text">Flights</div>
          </div>
          <div className={`tab ${activeTab === "hotels" ? "active" : ""}`} onClick={() => {setActiveTab("hotels")
           localStorage.setItem('active', 'hotels')}}>
            <div className="tab-icon">
            <RiHotelLine className="hotel-icon" color={activeTab === "hotels" ? "#FF7E45" : "#000"} size={24} />
            </div>
            <div className="tab-text">Hotels</div>
          </div>
          <div className={`tab ${activeTab === "homestays" ? "active" : ""}`} onClick={() => {setActiveTab("homestays")
          localStorage.setItem('active', 'homeStays' )}}>
            <div className="tab-icon">
            <IoHomeOutline className="home-icon" color={activeTab === "homestays" ? "#FF7E45" : "#000"} size={24} />
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
              <IoSwapVerticalOutline className="swap-icon" size={24} />
              </div>

              <div className="form-group" onClick={() => setActivePopup("to")}>
                <div className="field-label">To</div>
                <div className="field-value">{toLocation}</div>
                <div className="field-subtext">{toAirport}</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("departure")}>
                <div className="field-label">Departure</div>
                <div className="field-value">{departureDate}</div>
                <div className="field-subtext">{departureDay}</div>
              </div>

              <div className="form-group" onClick={() => tripType !== "One Way" && setActivePopup("return")}>
                <div className="field-label">Return</div>
                {returnDate ? (
                  <>
                    <div className="field-value">{returnDate}</div>
                    <div className="field-subtext">{returnDay}</div>
                  </>
                ) : (
                  <div className="field-placeholder">Tap to add return date</div>
                )}
              </div>

              <div className="form-group" onClick={() => setActivePopup("travellers")}>
                <div className="field-label">Travellers</div>
                <div className="field-value">
                  {travellers} Traveller{travellers !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "hotels" ) && (
          <div className="hotel-search">
            <div className="search-form-row">
              <div className="form-group" onClick={() => setActivePopup("hotelLocation")}>
                {/* <div className="field-label">City, Hotel Name or Location</div> */}
                <div className="field-label">Location or city name of Hotel</div>
                <div className="field-value">{location}</div>
                <div className="field-subtext">{location}, Nepal</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("checkIn")}>
                <div className="field-label">Check In</div>
                <div className="field-value">{checkInDate}</div>
                <div className="field-subtext">{checkInDay}</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("checkOut")}>
                <div className="field-label">Check Out</div>
                <div className="field-value">{checkOutDate}</div>
                <div className="field-subtext">{checkOutDay}</div>
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

        {( activeTab === "homestays") && (
          <div className="hotel-search">
            <div className="search-form-row">
              <div className="form-group" onClick={() => setActivePopup("homeStays")}>
                <div className="field-label">Location or city name of HomeStay</div>
                {/* <div className="field-label">City, Home Stay Name or Location</div> */}
                <div className="field-value">{location}</div>
                <div className="field-subtext">{location}, Nepal</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("checkIn")}>
                <div className="field-label">Check In</div>
                <div className="field-value">{checkInDate}</div>
                <div className="field-subtext">{checkInDay}</div>
              </div>

              <div className="form-group" onClick={() => setActivePopup("checkOut")}>
                <div className="field-label">Check Out</div>
                <div className="field-value">{checkOutDate}</div>
                <div className="field-subtext">{checkOutDay}</div>
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

        <button className="search-button" onClick={handleLogoClick} style={{cursor:"pointer"}}>Search</button>
      </div>

      {/* From Location Popup */}
      {activePopup === "from" && (
  <div className="popup-overlay" onClick={() => setActivePopup(null)}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
      <div className="popup-header">
        <h3>Select Departure City</h3>
        <button className="close-button" onClick={() => setActivePopup(null)}>
          <IoMdClose className="close-icon" size={24} />
        </button>
      </div>
      <div className="popup-content">
        <div className="location-search">
          <input 
            type="text" 
            placeholder="Search for a city" 
            value={fromSearch}
            onChange={(e) => setFromSearch(e.target.value)}
          />
        </div>
        <div className="location-list">
          {airports
            .filter(airport => 
              airport.airportLocation.toLowerCase().includes(fromSearch.toLowerCase()) ||
              airport.airportName.toLowerCase().includes(fromSearch.toLowerCase())
            )
            .map((airport, index) => (
              <div
                key={index}
                className={`location-item ${airport.airportLocation === fromLocation ? "active" : ""}`}
                onClick={() => {
                  handleLocationSelect(airport, "from");
                  dispatch(setFromFlightLocation(airport.airportLocation));
                  setFromSearch(""); // Clear search after selection
                }}
              >
                <div className="location-name">{airport.airportLocation}</div>
                <div className="location-airport">{airport.airportName}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
)}

      {/* To Location Popup */}
      {activePopup === "to" && (
  <div className="popup-overlay" onClick={() => setActivePopup(null)}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
      {/* ... same header ... */}
      <div className="popup-content">
        <div className="location-search">
          <input 
            type="text" 
            placeholder="Search for a city" 
            value={toSearch}
            onChange={(e) => setToSearch(e.target.value)}
          />
        </div>
        <div className="location-list">
          {airports
            .filter(airport => 
              airport.airportLocation.toLowerCase().includes(toSearch.toLowerCase()) ||
              airport.airportName.toLowerCase().includes(toSearch.toLowerCase())
            )
            .map((airport, index) => (
              <div
                key={index}
                className={`location-item ${airport.airportLocation === toLocation ? "active" : ""}`}
                onClick={() => {
                  handleLocationSelect(airport, "to");
                  dispatch(setToFlightLocation(airport.airportLocation));
                  setToSearch(""); // Clear search after selection
                }}
              >
                <div className="location-name">{airport.airportLocation}</div>
                <div className="location-airport">{airport.airportName}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
)}

      {/* Hotel Location Popup */}
      {activePopup === "hotelLocation" && (
  <div className="popup-overlay" onClick={() => setActivePopup(null)}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
      {/* ... same header ... */}
      <div className="popup-content">
        <div className="location-search">
          <input 
            type="text" 
            placeholder="Search for a city or hotel" 
            value={hotelSearch}
            onChange={(e) => setHotelSearch(e.target.value)}
          />
        </div>
        <div className="location-list">
          {locationsHotel
            .filter(loc => loc.toLowerCase().includes(hotelSearch.toLowerCase()))
            .map((loc, index) => (
              <div
                key={index}
                className={`location-item ${loc === location ? "active" : ""}`}
                onClick={() => {
                  handleLocationSelect(loc, "hotel"); 
                  dispatch(setHotelLocation(loc));
                  setHotelSearch(""); // Clear search after selection
                }}
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
      {/* HomeStay Location Popup */}
      {activePopup === "homeStays" && (
  <div className="popup-overlay" onClick={() => setActivePopup(null)}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
      {/* ... same header ... */}
      <div className="popup-content">
        <div className="location-search">
          <input 
            type="text" 
            placeholder="Search for a city or homestay" 
            value={homeStaySearch}
            onChange={(e) => setHomeStaySearch(e.target.value)}
          />
        </div>
        <div className="location-list">
          {locationsHomeStay
            .filter(loc => loc.toLowerCase().includes(homeStaySearch.toLowerCase()))
            .map((loc, index) => (
              <div
                key={index}
                className={`location-item ${loc === location ? "active" : ""}`}
                onClick={() => {
                  handleLocationSelect(loc, "hotel"); 
                  dispatch(setHomeStayLocation(loc));
                  setHomeStaySearch(""); // Clear search after selection
                }}
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
{(activePopup === "departure" ||
  activePopup === "return" ||
  activePopup === "checkIn" ||
  activePopup === "checkOut") && (
  <div className="popup-overlay" onClick={() => setActivePopup(null)}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
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
          <IoMdClose className="close-icon" size={24} />
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
                const dateStr = day
                  ? `${day} ${months[currentMonth].substring(0, 3)} ${currentYear}`
                  : "";

                const isSelected =
                  (activePopup === "departure" && dateStr === departureDate) ||
                  (activePopup === "return" && dateStr === returnDate) ||
                  (activePopup === "checkIn" && dateStr === checkInDate) ||
                  (activePopup === "checkOut" && dateStr === checkOutDate);

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const currentDate = day ? new Date(currentYear, currentMonth, day) : null;

                const isDisabled = day
                  ? activePopup === "departure" || activePopup === "checkIn"
                    ? currentDate < today
                    : activePopup === "return"
                    ? currentDate <
                      new Date(
                        Number.parseInt(departureDate.split(" ")[2]),
                        months.findIndex(
                          (m) => m.substring(0, 3) === departureDate.split(" ")[1]
                        ),
                        Number.parseInt(departureDate.split(" ")[0])
                      )
                    : activePopup === "checkOut"
                    ? currentDate <
                      new Date(
                        Number.parseInt(checkInDate.split(" ")[2]),
                        months.findIndex(
                          (m) => m.substring(0, 3) === checkInDate.split(" ")[1]
                        ),
                        Number.parseInt(checkInDate.split(" ")[0])
                      )
                    : false
                  : false;

                return (
                  <div
                    key={`current-${index}`}
                    className={`calendar-day ${!day ? "empty" : ""} ${
                      isSelected ? "selected" : ""
                    } ${isDisabled ? "disabled" : ""}`}
                    onClick={() =>
                      day &&
                      !isDisabled &&
                      handleDateSelect(day, currentMonth, currentYear, activePopup)
                    }
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Travellers Popup */}
      {activePopup === "travellers" && (
 <div className="popup-overlay"
 onClick={() => setActivePopup(null)}>
   <div className="popup"
    onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Select Travellers</h3>
              <button className="close-button" onClick={() => setActivePopup(null)}>
              <IoMdClose className="close-icon" size={24} />
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
 <div className="popup-overlay"
 onClick={() => setActivePopup(null)}>
   <div className="popup"
    onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Select Rooms & Guests</h3>
              <button className="close-button" onClick={() => setActivePopup(null)}>
              <IoMdClose className="close-icon" size={24} />
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