import { useState } from "react";
import "./booking.css";
import Rating from "./Rating";

export default function RecentBookings({ bookings }) {
  const [showRating, setShowRating] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleRateClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowRating(true);
  };

  const closeRating = () => {
    setShowRating(false);
    setSelectedBookingId(null);
  };

  const handlePrintDetails = (booking) => {
    const printContent = `
      Booking ID: ${booking.id}
      Type: ${booking.type}
      Destination: ${booking.destination}
      Date: ${booking.date}
      Status: ${booking.status}
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<pre>${printContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bookings-container">
      <h2 className="section-title">Recent Bookings</h2>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-info">
              <h3 className="booking-destination">{booking.destination}</h3>
              <p className="booking-type">
                {booking.type} • {booking.date}
              </p>
              <p className="booking-id">Booking ID: {booking.id}</p>
            </div>

            <div className="booking-status">
              <span className={`status-badge ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>
            </div>

            <div className="rate-it">
              {booking.status === "Completed" ? (
                <button
                  className="rate-button"
                  onClick={() => handleRateClick(booking.id)}
                >
                  Rate your stay
                </button>
              ) : (
                <button
                  className="details-button"
                  onClick={() => handlePrintDetails(booking)}
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showRating && (
        <div className="rating-overlay">
          <div className="rating-popup">
            <button className="popup-close" onClick={closeRating}>
              &times;
            </button>
            <Rating />
          </div>
        </div>
      )}
    </div>
  );
}
