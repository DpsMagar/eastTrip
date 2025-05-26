import { useEffect, useState } from "react";
import "./booking.css";
import Rating from "./Rating";
import logo from "../../Assest/logo-color.png"
import axios from "axios";
import { Hotel } from "lucide-react";
import { useBookNowMutation } from "../../features/api/bookApi";
import { useNavigate } from "react-router-dom";

export default function RecentBookings() {
  const userId= sessionStorage.getItem('userId')

  const [bookNow] = useBookNowMutation();
  // const navigate = useNavigate();
  
  useEffect(() => {
    const book = async () => {
      const storedData = sessionStorage.getItem("pendingBooking");
      // if (!storedData) {
      //   return navigate("/error");
      // }

      try {
        const bookingDTO = JSON.parse(storedData);
        const response = await bookNow(bookingDTO).unwrap();
        console.log("Booking successful", response);

        sessionStorage.removeItem("pendingBooking");
        // navigate("/recent-bookings"); 
      } catch (err) {
        console.error("Booking failed after payment", err);
        // navigate("/error");
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
        console.log("------------------");
        console.log(response.data);
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
          <title>Flight E-Ticket</title>
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
              <img src={logo}>
              <div class="ticket-title">E-Ticket</div>
            
            </div>
  
            <p><strong>THIS ELECTRONIC TICKET</strong> is not transferable and must be presented at check-in. Please present ID card and all necessary travel documents.</p>
  
            <div class="section-title">Booking Details</div>
            <table>
              <tr>
                <td><strong>PNR No:</strong></td><td>IH5PPB</td>
                <td><strong>Refundable:</strong></td><td>No</td>
              </tr>
              <tr>
                <td><strong>Passenger Name:</strong></td><td>John Doe</td>
                <td><strong>Nationality:</strong></td><td>Nepalese</td>
              </tr>
              <tr>
                <td><strong>Passenger Type:</strong></td><td>Adult</td>
                <td><strong>Ticket No:</strong></td><td>GH123456</td>
              </tr>
              <tr>
                <td><strong>Baggage:</strong></td><td>15 KG</td>
                <td><strong>Status:</strong></td><td>${booking.status}</td>
              </tr>
            </table>
  
            <div class="section-title">Flight Details</div>
            <table>
              <tr>
                <td><strong>Sector:</strong></td><td>${booking.from} - ${booking.destination}</td>
                <td><strong>Flight No:</strong></td><td>GG123</td>
              </tr>
              <tr>
                <td><strong>Flight Time:</strong></td><td>${booking.date}</td>
                <td><strong>Class:</strong></td><td>E</td>
              </tr>
              <tr>
                <td><strong>Flight Charge (NPR):</strong></td><td colspan="3">Rs ${booking.price || 'XXXX'}</td>
              </tr>
            </table>
  
            <div class="section-title">Transaction Details</div>
            <table>
              <tr>
                <td><strong>Transaction ID:</strong></td><td>0TUP6YS</td>
                <td><strong>Transaction Date:</strong></td><td>26-Feb-2025 08:10 NPT</td>
                <td><strong>Total Amount:</strong></td><td>Rs ${booking.price || 'XXXX'}</td>
              </tr>
            </table>
  
            <p class="report-time">REPORTING TIME - 1 hour prior of flight time.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  
  

  return (
    <div className="bookings-container">
      <h2 className="section-title">Recent Bookings</h2>

      <div className="bookings-list">
        {[...booking].reverse().map((booking) => (
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
              {booking.status === "Completed" ? (
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

      {showRating && selectedBooking && (
        <div className="rating-overlay">
          <div className="rating-popup">
            <Rating 
              onClose={closeRating} 
              hotelData={{
                name: selectedBooking.destination,
                image: selectedBooking.hotelImage || null
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}