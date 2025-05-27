"use client"

import { useEffect, useState } from "react"
import HotelCard from '../Boxcard/Box';
import "./Result.css"
import { useSelector } from "react-redux";
import { useGetHotelsQuery } from "../../features/api/hotelApi";
import LoadingDots2 from "../LoadingDots2"

export default function Result2() {
  const [hotelData, setHotelData] = useState([])
  const { location } = useSelector((state) => state.hotel)
  const { data: hotelInfo, isLoading } = useGetHotelsQuery({ location }, { refetchOnMountOrArgChange: true })
  
  useEffect(() => {
    if (hotelInfo) {
      setHotelData(hotelInfo);
    }
  }, [hotelInfo]);

  const [currentPage, setCurrentPage] = useState(1)
  const hotelsPerPage = 4

  // Calculate total number of pages
  const totalPages = Math.ceil(hotelData.length / hotelsPerPage)

  // Get current hotels
  const indexOfLastHotel = currentPage * hotelsPerPage
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage
  const currentHotels = hotelData.slice(indexOfFirstHotel, indexOfLastHotel)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <section className="page-content">
      <div className="hotel-listing-container">
        <h1 className="hotel-listing-title">Showing Results for Hotels in {location}</h1>

        <div className="hotel-cards-container">
          {isLoading ? (
            <LoadingDots2 />
          ) : (
            currentHotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))
          )}
        </div>

        {!isLoading && hotelData.length > 0 && (
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
        )}
      </div>
    </section>
  )
}