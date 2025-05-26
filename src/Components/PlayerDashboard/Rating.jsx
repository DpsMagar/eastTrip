"use client"

import { useState } from "react"
import "./Rating.css"
import { X } from "lucide-react"
import hotel from "../../Assest/hotelimage.png"

const Rating = ({ onClose, hotelData }) => {
  const userId= sessionStorage.getItem('userId');
  const iddd= hotelData.InnId;
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState("")
  const [error, setError] = useState("")

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
      url = "http://localhost:8080/api/hotel-reviews"
      // payload.hId = hotelData.innId
    } else if (hotelData.typeOfInn === 2) {
      url = "http://localhost:8080/api/homestay-reviews"
      // payload.hId = hotelData.innId
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

      alert(`Successfully submitted review for ${hotelData.name}`)
      setRating(0)
      setReview("")
      onClose()
    } catch (err) {
      console.error(err)
      setError("An error occurred while submitting your review.")
    }
  }

  return (
    <div className="rating-modal">
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>

      <h1 className="rating-title">Write a Review</h1>
      <p className="rating-subtitle">Share your experience at {hotelData.name}</p>

      {/* <div className="hotel-image-container">
        <img src={hotelData.image || hotel} alt="Hotel" className="hotel-image" />
      </div> */}

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
