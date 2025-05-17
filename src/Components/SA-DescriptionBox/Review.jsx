import React, { useState } from "react"
import { Star } from "lucide-react"
import "./reviews.css"

const Review = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 2

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview)

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`review-star ${i <= rating ? "filled" : ""}`} 
          size={16} 
          fill={i <= rating ? "currentColor" : "none"}
        />
      )
    }
    return stars
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Guest Reviews</h2>

      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet. Be the first to leave a review!</p>
      ) : (
        <>
          <div className="reviews-list">
            {currentReviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.avatar ? (
                        <img src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      ) : (
                        <div className="avatar-placeholder">{review.name}</div>
                      )}
                    </div>
                    <div className="reviewer-details">
                      <div className="reviewer-name">{review.name}</div>
                      <div className="review-stars">{renderStars(review.rating)}</div>
                    </div>
                  </div>
                  <div className="review-date">{review.timeSpan}</div>
                </div>
                <div className="review-content">{review.comment}</div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="reviews-pagination">
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className="pagination-button prev"
              >
                Previous
              </button>
              
              <span className="page-indicator">
                Page {currentPage} of {totalPages}
              </span>
              
              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className="pagination-button next"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Review