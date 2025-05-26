import { useEffect, useState } from "react";
import "./booking.css";
import Rating from "./Rating";
import logo from "../../Assest/logo-color.png"
import axios from "axios";
import { Hotel } from "lucide-react";
import { useBookNowMutation } from "../../features/api/bookApi";
import { useNavigate } from "react-router-dom";

export default function RecentBookings() {
  const userId = sessionStorage.getItem('userId');
  const [bookNow] = useBookNowMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;

  useEffect(() => {
    const book = async () => {
      const storedData = sessionStorage.getItem("pendingBooking");
      try {
        const bookingDTO = JSON.parse(storedData);
        const response = await bookNow(bookingDTO).unwrap();
        console.log("Booking successful", response);
        sessionStorage.removeItem("pendingBooking");
      } catch (err) {
        console.error("Booking failed after payment", err);
      }
    };

    book();
  }, []);

  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/inn-bookings/user/${userId}`);
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const [showRating, setShowRating] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleRateClick = (booking) => {
    setSelectedBooking(booking);
    setShowRating(true);
  };

  const closeRating = () => {
    setShowRating(false);
    setSelectedBooking(null);
  };

  const handlePrintDetails = (booking) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Booking E-Ticket</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              background: #fff;
              color: #000;
            }
            .ticket-container {
              max-width: 800px;
              margin: 0 auto;
              border: 2px solid #0a6c4e;
              padding: 30px;
            }
            .ticket-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 30px;
            }
            .ticket-header img {
              height: 30px;
            }
            .ticket-title {
              text-align: center;
              color: green;
              font-weight: bold;
              font-size: 20px;
              margin-top: 10px;
            }
            .section-title {
              font-weight: bold;
              margin: 25px 0 10px;
              font-size: 16px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
            }
            td, th {
              border: 1px solid #333;
              padding: 8px 12px;
              font-size: 14px;
              text-align: left;
            }
            .report-time {
              font-weight: bold;
              color: #cc0000;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            <div class="ticket-header">
              <img src="${window.location.origin}/logo-color.png" alt="Logo">
              <div class="ticket-title">Accommodation E-Ticket</div>
            </div>

            <p><strong>NOTE:</strong> This e-ticket must be presented during check-in along with valid ID.</p>

            <div class="section-title">Booking Details</div>
            <table>
              <tr>
                <td><strong>Booking ID:</strong></td><td>${booking.colsId}</td>
                <td><strong>Status:</strong></td><td>${booking.status}</td>
              </tr>
              <tr>
                <td><strong>Guest Name:</strong></td><td>${booking.name}</td>
                <td><strong>Booking Type:</strong></td><td>${booking.innType === 1 ? "Hotel" : "Homestay"}</td>
              </tr>
              <tr>
                <td><strong>Check-in Date:</strong></td><td>${booking.checkInDate}</td>
                <td><strong>Check-out Date:</strong></td><td>${booking.checkOutDate}</td>
              </tr>
              <tr>
                <td><strong>Guests:</strong></td><td>${booking.totalGuests || 'N/A'}</td>
                <td><strong>Room Type:</strong></td><td>${booking.roomType || 'Standard'}</td>
              </tr>
            </table>

            <div class="section-title">Payment Details</div>
            <table>
              <tr>
                <td><strong>Payment Method:</strong></td><td>Online</td>
                <td><strong>Total Amount:</strong></td><td>Rs ${booking.price || 'XXXX'}</td>
              </tr>
              <tr>
                <td><strong>Transaction ID:</strong></td><td>${booking.transactionId || 'N/A'}</td>
                <td><strong>Transaction Date:</strong></td><td>${booking.transactionDate || 'N/A'}</td>
              </tr>
            </table>

            <p class="report-time">Check-in Time: Please arrive at least 30 minutes before your check-in time.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Get current bookings
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = [...booking].reverse().slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(booking.length / bookingsPerPage);

  return (
    <div className="bookings-container">
      <h2 className="section-title">Recent Bookings</h2>

      <div className="bookings-list">
        {currentBookings.map((booking) => (
          <div key={booking.colsId} className="booking-card">
            <div className="booking-info">
              <h3 className="booking-destination">{booking.name}</h3>
              <p className="booking-type">
                {booking.innType === 1 ? "Hotel •  " : "HomeStay •  "}
                {booking.checkInDate.slice(5)} - {booking.checkOutDate.slice(5)}
              </p>
              <p className="booking-id">Booking ID: {booking.colsId}</p>
            </div>

            <div className="booking-status">
              <span className={`status-badge ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>
            </div>

            <div className="rate-it">
              {booking.status === "completed" ? (
                <button
                  className="rate-button"
                  onClick={() => handleRateClick(booking)}
                >
                  Rate It
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

      {booking.length > bookingsPerPage && (
        <div className="pagination-container1">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          
          <div className="page-number-box">
            {currentPage}
          </div>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}

      {showRating && selectedBooking && (
        <div className="rating-overlay">
          <div className="rating-popup">
            <Rating 
              onClose={closeRating} 
              hotelData={{
                name: selectedBooking.name,
                image: selectedBooking.hotelImage || null,
                typeOfInn: selectedBooking.innType,
                InnId: selectedBooking.innId
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}