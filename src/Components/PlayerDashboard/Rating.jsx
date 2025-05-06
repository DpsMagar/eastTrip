"use client"

import { useState } from "react"
import "./Rating.css"
import { X } from "lucide-react"
import hotel from "../../Assest/hotelimage.png"

const Rating = ({ onClose, hotelData }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (rating === 0 || review.trim() === "") {
      setError("Please provide both a star rating and a review.")
      return
    }
    setError("") 
    alert(`Rating for ${hotelData.name}: ${rating} stars\nReview: ${review}`)
    
    setRating(0)
    setReview("")
    onClose()
  }

  return (
    <div className="rating-modal">
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>

      <h1 className="rating-title">Write a Review</h1>
      <p className="rating-subtitle">Share your experience at {hotelData.name}</p>

      <div className="hotel-image-container">
        <img src={hotelData.image || hotel} alt="Hotel" className="hotel-image" />
      </div>

      <div className="rating-section">
        <h2>Your Rating</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? "filled" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="review-section">
        <h2>Your Review</h2>
        <textarea
          placeholder="Tell us about your stay..."
          className="review-textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  )
}

export default Rating