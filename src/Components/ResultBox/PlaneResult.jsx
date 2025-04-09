"use client"

import { useState } from "react"
import FlightCard from "../Boxcard/FlightCard"
import "./flight-result.css"
export default function PlaneResult() {
 
  const [flightFilter, setFlightFilter] = useState({ from: "", to: "", dayOfWeek: "" })

  const plane = {
    flights: [
      {
        id: 1,
        fightlogo: "https://www.buddhaair.com/images/buddhaair.png",
        airway: "Buddha Air",
        flightNumber: "BHA123",
        to: "Pokhara",
        from: "Kathmandu",
        tocode: "PKR",
        fromcode: "KTM",
        toairport: "Pokhara Airport",
        fromairport: "Tribhuvan International Airport",
        flightDuration: "30 minutes",
        departure: "9:00 AM",
        arrival: "9:30 AM",
        price: 5000,
        class: "Economy",
        availableSeats: 50,
        totalSeats: 100,
      },
      {
        id: 2,
        fightlogo: "https://www.yetiairlines.com/images/yeti-logo.png",
        airway: "Yeti Airlines",
        flightNumber: "YT456",
        to: "Chitwan",
        from: "Kathmandu",
        tocode: "BHR",
        fromcode: "KTM",
        toairport: "Bharatpur Airport",
        fromairport: "Tribhuvan International Airport",
        flightDuration: "25 minutes",
        departure: "10:30 AM",
        arrival: "10:55 AM",
        price: 4500,
        class: "Economy",
        availableSeats: 40,
        totalSeats: 80,
      },
      {
        id: 3,
        fightlogo: "https://www.shreeairlines.com/images/logo.png",
        airway: "Shree Airlines",
        flightNumber: "SA789",
        to: "Biratnagar",
        from: "Kathmandu",
        tocode: "BIR",
        fromcode: "KTM",
        toairport: "Biratnagar Airport",
        fromairport: "Tribhuvan International Airport",
        flightDuration: "40 minutes",
        departure: "12:00 PM",
        arrival: "12:40 PM",
        price: 5200,
        class: "Business",
        availableSeats: 30,
        totalSeats: 70,
      },
      {
        id: 4,
        fightlogo: "https://www.summitair.com.np/images/logo.png",
        airway: "Summit Air",
        flightNumber: "SM123",
        to: "Lukla",
        from: "Kathmandu",
        tocode: "LUA",
        fromcode: "KTM",
        toairport: "Tenzing-Hillary Airport",
        fromairport: "Tribhuvan International Airport",
        flightDuration: "35 minutes",
        departure: "7:15 AM",
        arrival: "7:50 AM",
        price: 6500,
        class: "Economy",
        availableSeats: 45,
        totalSeats: 90,
      },
    ],
  }

  const [currentFlightPage, setCurrentFlightPage] = useState(1)
  const flightsPerPage = 4
  const totalFlightPages = Math.ceil(plane.flights.length / flightsPerPage)
  const indexOfLastFlight = currentFlightPage * flightsPerPage
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage
  const currentFlights = plane.flights.slice(indexOfFirstFlight, indexOfLastFlight)

  const paginateFlights = (pageNumber) => setCurrentFlightPage(pageNumber)

  return (
    <section className="page-content">
      <div className="flight-listing-container">
        <h1 className="flight-listing-title">Showing Results for Flights</h1>

        <div className="flight-cards-container">
          {currentFlights.map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))}
        </div>

        {totalFlightPages > 1 && (
          <div className="pagination-container">
            <button
              className={`pagination-button ${currentFlightPage === 1 ? "disabled" : ""}`}
              onClick={() => currentFlightPage > 1 && paginateFlights(currentFlightPage - 1)}
              disabled={currentFlightPage === 1}
            >
              Previous
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalFlightPages }).map((_, index) => (
                <button
                  key={index}
                  className={`pagination-number ${currentFlightPage === index + 1 ? "active" : ""}`}
                  onClick={() => paginateFlights(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className={`pagination-button ${currentFlightPage === totalFlightPages ? "disabled" : ""}`}
              onClick={() => currentFlightPage < totalFlightPages && paginateFlights(currentFlightPage + 1)}
              disabled={currentFlightPage === totalFlightPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
