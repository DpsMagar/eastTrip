import React, { useState, useEffect } from 'react';
import './TBookingCard.css';
import { FaUsers, FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import NoProfile from "../../Assest/nonprofile.png";

const initialUsers = [
  { id: 1, ImgUrl: NoProfile, name: "Sarah Wilson", email: "dumby@gmail.com", property: "Hotel Pool", location: "Kathmandu", checkIn: "2023-05-10", checkOut: "2023-05-15", amount: "$450", status: "Active" },
  { id: 2, ImgUrl: NoProfile, name: "Ronaldo Jr", email: "rondldo@gmail.com", property: "China Pool", location: "Bhaktapur", checkIn: "2023-06-01", checkOut: "2023-06-07", amount: "$620", status: "Completed" },
  { id: 3, ImgUrl: NoProfile, name: "Emily Carter", email: "emilyc@gmail.com", property: "Hill Resort", location: "Pokhara", checkIn: "2023-07-02", checkOut: "2023-07-06", amount: "$500", status: "Active" },
  { id: 4, ImgUrl: NoProfile, name: "Liam Smith", email: "liam.smith@gmail.com", property: "Lakeview Hotel", location: "Lalitpur", checkIn: "2023-08-10", checkOut: "2023-08-15", amount: "$720", status: "Cancelled" },
  { id: 5, ImgUrl: NoProfile, name: "Olivia Brown", email: "olivia.b@gmail.com", property: "Sunshine Lodge", location: "Chitwan", checkIn: "2023-09-01", checkOut: "2023-09-05", amount: "$400", status: "Completed" },
  { id: 6, ImgUrl: NoProfile, name: "Noah Davis", email: "noah.davis@gmail.com", property: "Everest Inn", location: "Kathmandu", checkIn: "2023-10-11", checkOut: "2023-10-16", amount: "$550", status: "Active" },
  { id: 7, ImgUrl: NoProfile, name: "Ava Johnson", email: "ava.johnson@gmail.com", property: "Moonlight Resort", location: "Pokhara", checkIn: "2023-11-01", checkOut: "2023-11-06", amount: "$630", status: "Completed" },
  { id: 8, ImgUrl: NoProfile, name: "James Lee", email: "jameslee@gmail.com", property: "Royal View", location: "Dhulikhel", checkIn: "2023-12-05", checkOut: "2023-12-10", amount: "$470", status: "Active" },
  { id: 9, ImgUrl: NoProfile, name: "Sophia Martin", email: "sophia.martin@gmail.com", property: "Valley Stay", location: "Lalitpur", checkIn: "2024-01-02", checkOut: "2024-01-07", amount: "$490", status: "Pending" },
  { id: 10, ImgUrl: NoProfile, name: "Benjamin Walker", email: "ben.walker@gmail.com", property: "City Hotel", location: "Bhaktapur", checkIn: "2024-02-15", checkOut: "2024-02-20", amount: "$560", status: "Completed" },
  { id: 11, ImgUrl: NoProfile, name: "Chloe King", email: "chloe.king@gmail.com", property: "Green Villa", location: "Kathmandu", checkIn: "2024-03-10", checkOut: "2024-03-14", amount: "$410", status: "Cancelled" },
  { id: 12, ImgUrl: NoProfile, name: "Lucas Scott", email: "lucas.scott@gmail.com", property: "Tranquil Stay", location: "Pokhara", checkIn: "2024-04-05", checkOut: "2024-04-10", amount: "$590", status: "Completed" },
  { id: 13, ImgUrl: NoProfile, name: "Grace Young", email: "grace.young@gmail.com", property: "Riverside Lodge", location: "Chitwan", checkIn: "2024-05-01", checkOut: "2024-05-05", amount: "$430", status: "Active" },
  { id: 14, ImgUrl: NoProfile, name: "Henry Adams", email: "henry.adams@gmail.com", property: "Ocean Inn", location: "Lalitpur", checkIn: "2024-06-10", checkOut: "2024-06-15", amount: "$600", status: "Completed" },
  { id: 15, ImgUrl: NoProfile, name: "Amelia Hall", email: "amelia.hall@gmail.com", property: "Sky Hotel", location: "Dhulikhel", checkIn: "2024-07-02", checkOut: "2024-07-06", amount: "$520", status: "Active" },
  { id: 16, ImgUrl: NoProfile, name: "Jack Allen", email: "jack.allen@gmail.com", property: "Evergreen Resort", location: "Pokhara", checkIn: "2024-08-01", checkOut: "2024-08-05", amount: "$480", status: "Pending" },
  { id: 17, ImgUrl: NoProfile, name: "Ella Turner", email: "ella.turner@gmail.com", property: "Central Inn", location: "Kathmandu", checkIn: "2024-09-01", checkOut: "2024-09-06", amount: "$550", status: "Completed" },
  { id: 18, ImgUrl: NoProfile, name: "Daniel Hill", email: "daniel.hill@gmail.com", property: "Bluewater Hotel", location: "Lalitpur", checkIn: "2024-10-10", checkOut: "2024-10-15", amount: "$530", status: "Cancelled" },
  { id: 19, ImgUrl: NoProfile, name: "Mia Nelson", email: "mia.nelson@gmail.com", property: "Luxury Stay", location: "Bhaktapur", checkIn: "2024-11-05", checkOut: "2024-11-10", amount: "$610", status: "Active" },
  { id: 20, ImgUrl: NoProfile, name: "Alexander Perez", email: "alex.perez@gmail.com", property: "Cityscape Hotel", location: "Chitwan", checkIn: "2024-12-01", checkOut: "2024-12-06", amount: "$470", status: "Completed" },
  { id: 21, ImgUrl: NoProfile, name: "Aria Robinson", email: "aria.robinson@gmail.com", property: "Vista Lodge", location: "Pokhara", checkIn: "2025-01-10", checkOut: "2025-01-15", amount: "$490", status: "Completed" },
  { id: 22, ImgUrl: NoProfile, name: "Logan Green", email: "logan.green@gmail.com", property: "Forest Retreat", location: "Dhulikhel", checkIn: "2025-02-10", checkOut: "2025-02-14", amount: "$530", status: "Pending" },
  { id: 23, ImgUrl: NoProfile, name: "Harper Wright", email: "harper.wright@gmail.com", property: "Zen Hotel", location: "Kathmandu", checkIn: "2025-03-05", checkOut: "2025-03-09", amount: "$580", status: "Cancelled" },
  { id: 24, ImgUrl: NoProfile, name: "Ethan Harris", email: "ethan.harris@gmail.com", property: "Alpine Stay", location: "Lalitpur", checkIn: "2025-04-01", checkOut: "2025-04-06", amount: "$610", status: "Completed" },
  { id: 25, ImgUrl: NoProfile, name: "Isabella Campbell", email: "isabella.c@gmail.com", property: "Eco Resort", location: "Bhaktapur", checkIn: "2025-05-01", checkOut: "2025-05-07", amount: "$600", status: "Active" }
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

  const usersPerPage = 10;

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
    const statusLower = status.toLowerCase();
    let statusClass = '';
    
    if (statusLower === 'active') {
      statusClass = 'status-active';
    } else if (statusLower === 'completed') {
      statusClass = 'status-completed';
    } else if (statusLower === 'cancelled') {
      statusClass = 'status-cancelled';
    } else if (statusLower === 'pending') { 
      statusClass = 'status-pending';
    }
    
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
              placeholder='Search by name/email or properties'
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

export default TBookingCard;