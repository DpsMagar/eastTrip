import React, { useState } from 'react';
import './Rating.css';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || message.trim() === "") {
      setError("Please provide both a star rating and a message.");
      return;
    }
    setError(""); // Clear any previous errors
    alert(`Rating: ${rating} stars\nMessage: ${message}`);
    // Reset fields
    setRating(0);
    setMessage("");
  };

  return (
    <div className="rating-box">
      
      <h3 className="rating-title">Rate your stay</h3>
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

      {error && <p className="error-text">{error}</p>}

      <textarea
        placeholder="Write a message"
        className="rating-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <div className="submit-container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Rating;
