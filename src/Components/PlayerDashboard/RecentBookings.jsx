import "./booking.css"

export default function RecentBookings({ bookings }) {
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
              <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

