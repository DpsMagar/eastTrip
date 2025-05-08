import { Star } from "lucide-react"
import "./reviews.css"

const Review = ({ reviews }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} className={`review-star ${i <= rating ? "filled" : ""}`} size={16} />)
    }
    return stars
  }

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Guest Reviews</h2>

      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet. Be the first to leave a review!</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.avatar ? (
                      <img src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    ) : (
                      <div className="avatar-placeholder">{review.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.name}</div>
                    <div className="review-stars">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <div className="review-date">{review.date}</div>
              </div>
              <div className="review-content">{review.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Review

