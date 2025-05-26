"use client"

import { useState } from "react"
import "./Rating.css"
import { X } from "lucide-react"
import hotel from "../../Assest/hotelimage.png"

const Rating = ({ onClose, hotelData }) => {
  const userId = sessionStorage.getItem('userId');
  const iddd = hotelData.InnId;
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState("")
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0 || review.trim() === "") {
      setError("Please provide both a star rating and a review.")
      return
    }

    setError("")

    const payload = {
      rating,
      comment: review,
      userId: userId, 
      hId: iddd,
    }

    let url = ""
    console.log("User ID:", userId);
    console.log("Hotel Data:", hotelData);
    console.log("Inn ID:", iddd);

    if (hotelData.typeOfInn === 1) {
      url = "https://easttrip.onrender.com/api/hotel-reviews"
    } else if (hotelData.typeOfInn === 2) {
      url = "https://easttrip.onrender.com/api/homestay-reviews"
    } else {
      setError("Unknown property type.")
      return
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review.")
      }

      setShowSuccess(true)
      setRating(0)
      setReview("")
      
      
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 3000)

    } catch (err) {
      console.error(err)
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <div className="rating-modal">
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>

      <h1 className="rating-title">Write a Review</h1>
      <p className="rating-subtitle">Share your experience at {hotelData.name}</p>

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

      {showSuccess && (
        <div className="success-popup">
          Review submitted successfully!
        </div>
      )}

      {showError && (
        <div className="failed-popup">
          Submission unsuccessful!
        </div>
      )}
    </div>
  )
}

export default Rating