"use client"

import { useEffect, useState } from "react"
import Box2 from '../Boxcard/Box2';
import "./Result.css"
import { useSelector } from "react-redux";
import { useGetHomeStayQuery } from "../../features/api/homeStayApi";

export default function Result2() {

  const[homeStayData, setHomeStay]= useState([])

  const {location}=  useSelector((state)=> state.homeStay)

  const{data: homeStayInfo} = useGetHomeStayQuery({location})
  console.log(homeStayInfo);
  
  useEffect(() => {
    if (homeStayInfo) {
      setHomeStay(homeStayInfo);
    }
  }, [homeStayInfo]);



    const dumby = "https://lh3.googleusercontent.com/p/AF1QipMd4VA7pfadcudwAyE-kMvQyoprQsmxBRYaDDmy=s1360-w1360-h1020" 
  // const allHotels = [
  //   {
  //     name: "Yatri Suites & Spa",
  //     stars: 4,
  //     location: "Thamel | 2 minutes walk to Thamel Market",
  //     roomType: "Super Deluxe Double Room",
  //     bedType: "King Bed",
  //     viewType: "Courtyard View",
  //     amenities: ["Free Shuttle Service", "Spa", "Breakfast Included"],
  //     rating: 4.6,
  //     ratingText: "Very Good",
  //     reviews: 174,
  //     price: 5132,
  //     taxes: 1620,
  //     City: "Kathmandu",
  //     image: dumby,
  //     thumbnails: [dumby, dumby, dumby, dumby],
  //   },
  // ]

  const [currentPage, setCurrentPage] = useState(1)
  const hotelsPerPage = 4

  // Calculate total number of pages
  const totalPages = Math.ceil(homeStayData.length / hotelsPerPage)

  // Get current hotels
  const indexOfLastHotel = currentPage * hotelsPerPage
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage
  const currentHomeStays = homeStayData.slice(indexOfFirstHotel, indexOfLastHotel)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <section className="page-content">
    <div className="hotel-listing-container">
      <h1 className="hotel-listing-title">Showing Results for Homestays in Kathmandu</h1>

      <div className="hotel-cards-container">
        {currentHomeStays.map((hotel, index) => (
          <Box2 key={index} hotel={hotel} />
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