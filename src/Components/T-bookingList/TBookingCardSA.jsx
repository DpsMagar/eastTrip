import React, { useState, useEffect } from 'react';
import './TBookingCard.css';
import { FaUsers, FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import NoProfile from "../../Assest/nonprofile.png";
import axios from 'axios';

const initialUsers = [
  { id: 1, ImgUrl: NoProfile, name: "Sarah Wilson", email: "dumby@gmail.com", property: "Hotel Pool", location: "Kathmandu", checkIn: "2023-05-10", checkOut: "2023-05-15", amount: "$450", status: "Active", colsId:21 },
];


const TBookingCardSA = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [fadingUserId, setFadingUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const usersPerPage = 10;

  const userID= sessionStorage.getItem("userId");

     useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://easttrip.onrender.com/api/inn-bookings/all-bookings`);
      const bookings = response.data;
      console.log(response.data);
      

      const usersWithTransformedFields = bookings.map((booking, index) => ({
        id: index + 1,
        ImgUrl: NoProfile,
        name: booking.name || "Guest User",
        email: "guest@example.com", // Fallback or fetch from user if available
        property: booking.name,
        location: "N/A", // Add location if available in backend
        checkIn: booking.checkInDate,
        checkOut: booking.checkOutDate,
        amount: `₹${booking.totalPrice}`,
        status: "Active" ,// Or derive based on date logic
        colsId: booking.colsId,
      }));

      setUsers(usersWithTransformedFields);
      setFilteredUsers(usersWithTransformedFields);
    } catch (err) {
      setError("Failed to fetch booking data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

 useEffect(() => {
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredUsers(filtered);

  const totalPages = Math.ceil(filtered.length / usersPerPage);
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
}, [users, searchQuery, currentPage, usersPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
  // console.log(paginatedUsers);
  

  const groupSize = 3;
  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const groupStart = currentGroup * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  const showingFrom = startIndex + 1;
  const showingTo = Math.min(startIndex + usersPerPage, filteredUsers.length);

  const handleDeleteUser = async (id) => {
    console.log(id);
    

    await axios.delete(`https://easttrip.onrender.com/api/inn-bookings/${id}`)
    .then( (response)=>
      console.log(response)
    )
    setFadingUserId(id);
    setShowConfirm(false);

    setTimeout(() => {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setDeleteSuccess(true);
      setFadingUserId(null);

      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      setTimeout(() => {
        setDeleteSuccess(false);
      }, 2000);
    }, 300);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowDashboard(true);
  };

  const closeDashboardPopup = () => {
    setShowDashboard(false);
    setSelectedUser(null);
  };

  // const renderStatus = (status) => {
  //   const statusLower = status.toLowerCase();
  //   let statusClass = '';
    
  //   if (statusLower === 'active') {
  //     statusClass = 'status-active';
  //   } else if (statusLower === 'completed') {
  //     statusClass = 'status-completed';
  //   } else if (statusLower === 'cancelled') {
  //     statusClass = 'status-cancelled';
  //   } else if (statusLower === 'pending') { 
  //     statusClass = 'status-pending';
  //   }
    
  //   return <span className={`status-badge ${statusClass}`}>{status}</span>;
  // };
  // console.log(user);
  

  return (
    <div className='t-booking'>
      <div className='t-booking-header'>
        <h1>Bookings list</h1>
        <p>Review and manage all the bookings</p>
      </div>

      <div className='t-booking-card'>
        <div className="icon"><FaUsers /></div>
        <div className="text">
          <p>Total Users</p>
          <h2>{users.length}</h2>
        </div>
      </div>

      <div className='t-booking-UserList'>
        <div className="t-booking-header-box">
          <h2>User List</h2>
        </div>

        <div className="t-bookingSearch-box">
          <div className="t-booking-search-bar">
            <input
              type="text"
              placeholder='Search by property name'
              className='search-input'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className='search-icon' />
          </div>
        </div>

        <div className="t-booking-user-table">
          <div className="table-header-row">
            <div className="user-table-cell">User</div>
            <div className="property-table-cell">Property</div>
            <div className="checkin-table-cell">Check In</div>
            <div className="checkout-table-cell">Check Out</div>
            <div className="amount-table-cell">Amount</div>
            <div className="status-table-cell">Status</div>
            <div className="action-table-cell">Actions</div>
          </div>

          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              
              <div
                className={`table-row ${fadingUserId === user.id ? 'fade-out' : ''}`}
                key={user.id}
                onClick={() => handleUserClick(user)}
              >
                <div className="customer-cell">
                  <img src={user.ImgUrl} alt="profile" className="user-profile" />
                  <div>
                    <div className="name">{user.name}</div>
                    <div className="email">{user.email}</div>
                  </div>
                </div>
                <div className="property-cell">
                  <div className="property-name">{user.property}</div>
                  {/* <div className="location">{user.location}</div> */}
                </div>
                <div className="checkin-cell">{user.checkIn}</div>
                <div className="checkout-cell">{user.checkOut}</div>
                <div className="amount-cell">{user.amount}</div>
                <div className="status-cell">{(user.status)}</div>
                <div className="action-cell">
                  <button
                    className='delete-btn'
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUserId(user.colsId);
                      setShowConfirm(true);
                    }}
                  >
                    <FaTrash className='delete-icon' />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No Booking found matching your criteria</div>
          )}

          <div className="pagination-container">
            <div className="entries-count">
              Showing {filteredUsers.length > 0 ? `${showingFrom} to ${showingTo}` : 0} of {filteredUsers.length} entries
            </div>
            <div className="pagination">
              <button
                onClick={() => {
                  if (groupStart > 1) setCurrentPage(groupStart - 1);
                }}
                disabled={groupStart === 1}
              >
                Previous
              </button>

              {[...Array(groupEnd - groupStart + 1)].map((_, i) => {
                const page = groupStart + i;
                return (
                  <button
                    key={page}
                    className={currentPage === page ? 'active' : ''}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  if (groupEnd < totalPages) setCurrentPage(groupEnd + 1);
                }}
                disabled={groupEnd === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Popup */}
      {showConfirm && (
        <div className="popup-overlay" onClick={() => setShowConfirm(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowConfirm(false)}>×</button>
            <p className="popup-text">Are you sure you want to remove this user?</p>
            <div className="popup-buttons">
              <button className="popup-btn no" onClick={() => setShowConfirm(false)}>No</button>
              <button className="popup-btn yes" onClick={() => handleDeleteUser(selectedUserId)}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Popup */}
      {deleteSuccess && (
        <div className="success-popup">User deleted successfully!</div>
      )}
    </div>
  );
};

export default TBookingCardSA;