import React, { useState, useEffect } from 'react';
import './TBookingCard.css';
import { FaUsers, FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import NoProfile from "../../Assest/nonprofile.png";

const initialUsers = [
  { 
    id: 1, 
    ImgUrl: NoProfile, 
    name: "Sarah Wilson", 
    email: "dumby@gmail.com",
    property: "Hotel Pool",
    location: "Kathmandu",
    checkIn: "2023-05-10",
    checkOut: "2023-05-15",
    amount: "$450",
    status: "Active"
  },
  { 
    id: 2, 
    ImgUrl: NoProfile, 
    name: "Ronaldo Jr", 
    email: "rondldo@gmail.com",
    property: "China Pool",
    location: "Bhaktapur",
    checkIn: "2023-06-01",
    checkOut: "2023-06-07",
    amount: "$620",
    status: "Completed"
  }
];

const TBookingCard = () => {
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

  const usersPerPage = 3;

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
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

  const groupSize = 3;
  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const groupStart = currentGroup * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  const showingFrom = startIndex + 1;
  const showingTo = Math.min(startIndex + usersPerPage, filteredUsers.length);

  const handleDeleteUser = (id) => {
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

  const renderStatus = (status) => {
    const statusClass = status.toLowerCase() === 'active' ? 'status-active' : 'status-completed';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

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
              placeholder='Search by name or email'
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
                  <div className="location">{user.location}</div>
                </div>
                <div className="checkin-cell">{user.checkIn}</div>
                <div className="checkout-cell">{user.checkOut}</div>
                <div className="amount-cell">{user.amount}</div>
                <div className="status-cell">{renderStatus(user.status)}</div>
                <div className="action-cell">
                  <button
                    className='delete-btn'
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUserId(user.id);
                      setShowConfirm(true);
                    }}
                  >
                    <FaTrash className='delete-icon' />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No users found matching your criteria</div>
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

export default TBookingCard;