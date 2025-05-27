"use client"

import { useEffect, useState } from "react"
import Box2 from '../Boxcard/Box2';
import "./Result.css"
import { useSelector } from "react-redux";
import { useGetHomeStayQuery } from "../../features/api/homeStayApi";
import LoadingDots2 from "../LoadingDots2";

export default function Result3() {
  const [homeStayData, setHomeStay] = useState([]);
  const { location } = useSelector((state) => state.hotel);
  
  const { data: homeStayInfo, isLoading, isFetching } = useGetHomeStayQuery({ location }, { refetchOnMountOrArgChange: true });
  
  useEffect(() => {
    if (homeStayInfo) {
      setHomeStay(homeStayInfo);
    }
  }, [homeStayInfo]);

  const [currentPage, setCurrentPage] = useState(1);
  const homeStaysPerPage = 4;

  
  const totalPages = Math.ceil(homeStayData.length / homeStaysPerPage);

  
  const indexOfLastHomeStay = currentPage * homeStaysPerPage;
  const indexOfFirstHomeStay = indexOfLastHomeStay - homeStaysPerPage;
  const currentHomeStays = homeStayData.slice(indexOfFirstHomeStay, indexOfLastHomeStay);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="page-content">
      <div className="hotel-listing-container">
        <h1 className="hotel-listing-title">Showing Results for Homestays in {location}</h1>

        <div className="hotel-cards-container">
          {(isLoading || isFetching) ? (
            <LoadingDots2 />
          ) : currentHomeStays.length > 0 ? (
            currentHomeStays.map((homeStay, index) => (
              <Box2 key={index} hotel={homeStay} />
            ))
          ) : (
            <div className="no-results">No homestays found in this location</div>
          )}
        </div>

        {!isLoading && !isFetching && homeStayData.length > homeStaysPerPage && (
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
  );
}