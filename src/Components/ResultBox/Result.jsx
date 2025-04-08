"use client"

import { useState } from "react"
import HotelCard from '../Boxcard/Box';
import "./Result.css"

export default function Result() {
    const dumby = "https://lh3.googleusercontent.com/p/AF1QipMd4VA7pfadcudwAyE-kMvQyoprQsmxBRYaDDmy=s1360-w1360-h1020" 
  const allHotels = [
    {
      name: "Yatri Suites & Spa",
      stars: 4,
      location: "Thamel | 2 minutes walk to Thamel Market",
      roomType: "Super Deluxe Double Room",
      bedType: "King Bed",
      viewType: "Courtyard View",
      amenities: ["Free Shuttle Service", "Spa", "Breakfast Included"],
      rating: 4.6,
      ratingText: "Very Good",
      reviews: 174,
      price: 5132,
      taxes: 1620,
      City: "Kathmandu",
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
    },
    {
      name: "Hotel Crowne Imperial",
      stars: 4,
      location: "Naxal",
      roomType: "Deluxe Double Or Twin Room",
      bedType: "Double Bed Or 2 Twin Beds",
      viewType: "City View",
      amenities: ["Jacuzzi", "Gym", "Premium Lift"],
      rating: 4.2,
      ratingText: "Excellent",
      reviews: 274,
      price: 4295,
      taxes: 1134,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
      City: "Kathmandu",
    },
    {
      name: "Himalaya Hotel Kathmandu",
      stars: 5,
      location: "Lalitpur | 6.6 km drive to Tribhuvan International Airport (Kathmandu)",
      roomType: "Deluxe Room",
      bedType: "King Bed",
      viewType: "",
      amenities: ["Free Shuttle Service", "Jacuzzi", "Spa", "Breakfast Included"],
      rating: 4.3,
      ratingText: "Excellent",
      reviews: 108,
      price: 6637,
      taxes: 1749,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
      City: "Kathmandu",
    },
    {
      name: "Pashupati Boutique Hotel & Spa",
      stars: 3,
      location: "Pashupatinath | About a minute walk to Shri Pashupatinath",
      roomType: "Deluxe Room",
      bedType: "Double Bed Or 2 Twin Beds",
      viewType: "",
      amenities: ["Spa", "Swimming Pool", "Breakfast Included"],
      rating: 4.2,
      ratingText: "Very Good",
      reviews: 98,
      price: 4104,
      taxes: 1108,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
      City: "Kathmandu",
    },
    {
      name: "Hotel Shanker-Palatial Heritage Kathmandu",
      stars: 4,
      location: "Lazimpat | 10 minutes walk to Narayanhiti Palace Museum",
      roomType: "Deluxe Twin Bed Room Early Checkin And Late Checkout By 2 Hrs",
      bedType: "Twin Bed",
      viewType: "City View",
      amenities: ["Spa", "Swimming Pool", "Gym"],
      rating: 4.4,
      ratingText: "Excellent",
      reviews: 44,
      price: 9444,
      taxes: 982,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
      City: "Kathmandu",
    },
    {
      name: "Kathmandu Marriott Hotel",
      stars: 5,
      location: "Naxal | 5.2 km to Tribhuvan International Airport",
      roomType: "Deluxe King Room",
      bedType: "King Bed",
      viewType: "Mountain View",
      amenities: ["Free Wifi", "Pool", "Spa", "Fitness Center"],
      rating: 4.7,
      ratingText: "Excellent",
      reviews: 312,
      price: 8500,
      taxes: 1950,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
      City: "Kathmandu",
    },
    {
      name: "Hotel Annapurna",
      stars: 4,
      location: "Durbar Marg | 15 minutes to Thamel",
      roomType: "Premium Room",
      bedType: "Queen Bed",
      viewType: "Garden View",
      amenities: ["Restaurant", "Bar", "Conference Room"],
      rating: 4.1,
      ratingText: "Very Good",
      reviews: 187,
      price: 5800,
      taxes: 1200,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
      City: "Kathmandu",
    },
    {
      name: "Hyatt Regency Kathmandu",
      stars: 5,
      location: "Boudha | Near Boudhanath Stupa",
      roomType: "Club Room",
      bedType: "King Bed",
      viewType: "Stupa View",
      amenities: ["Club Access", "Breakfast", "Airport Transfer"],
      rating: 4.8,
      ratingText: "Excellent",
      reviews: 423,
      price: 12000,
      taxes: 2500,
      image: dumby,
      thumbnails: [dumby, dumby, dumby, dumby],
      City: "Kathmandu",
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const hotelsPerPage = 4

  // Calculate total number of pages
  const totalPages = Math.ceil(allHotels.length / hotelsPerPage)

  // Get current hotels
  const indexOfLastHotel = currentPage * hotelsPerPage
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage
  const currentHotels = allHotels.slice(indexOfFirstHotel, indexOfLastHotel)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <section className="page-content">
    <div className="hotel-listing-container">
      <h1 className="hotel-listing-title">Showing Results for Hotels in Kathmandu</h1>

      <div className="hotel-cards-container">
        {currentHotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>

      <div className="pagination-container">
        <button
          className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="pagination-numbers">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`pagination-number ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </section>
  )
}