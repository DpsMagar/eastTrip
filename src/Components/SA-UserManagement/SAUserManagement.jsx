import React, { useState, useEffect } from 'react';
import './SAUserManagement.css';
import { FaUsers, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import CustomProfile from "../../Assest/profile.png";
import SADashBoard from '../../Page/SA-DashBoard-User/SADashBoard';
import { IoClose } from "react-icons/io5";
import axios from 'axios';

const SAUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [fadingUserId, setFadingUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(1);

  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/all-with-count'); 
        setUsers(response.data.users);
        setCount(response.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [flag]);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);

    const totalPages = Math.ceil(filtered.length / usersPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [users, searchQuery, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const groupSize = 3;
  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const groupStart = currentGroup * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  const showingFrom = startIndex + 1;
  const showingTo = Math.min(startIndex + usersPerPage, filteredUsers.length);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setFlag(prev => prev + 1);
      setFadingUserId(id);
      setShowConfirm(false);
      setTimeout(() => {
        setDeleteSuccess(true);
        setFadingUserId(null);
        setTimeout(() => setDeleteSuccess(false), 2000);
      }, 300);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowDashboard(true);
  };

  const closeDashboardPopup = () => {
    setShowDashboard(false);
    setSelectedUser(null);
  };

  const mapToProfileData = (user) => ({
    ProfileImage: CustomProfile,
    Firstname: user.fullName.split(' ')[0],
    Lastname: user.fullName.split(' ')[1] || '',
    Email: user.email,
    Phone: user.phone || '1234567890',
    Address: user.address,
    country: user.country,
    district: user.district,
    gender: user.gender,
    martialStatus: user.maritalStatus,
    DateOfBirth: user.dateOfBirth,
    "passport no": "1111111",
    "Issuing place": "usa",
    "expiry date": "01/01/2030",
    rewardpoint: user.rewardPoints || 0,
  });

  const mapToRecentBookings = () => ([{
    id: `B${Math.floor(100000 + Math.random() * 900000)}`,
    type: "Hotel",
    destination: "Sample Hotel",
    date: new Date().toLocaleDateString(),
    status: "Completed",
  }]);

  return (
    <div className='sa-UserManagement'>
      <div className='sa-UserManagement-header'>
        <h1>User Management</h1>
        <p>Manage and monitor user accounts</p>
      </div>

      <div className='sa-UserManagement-card'>
        <div className="icon"><FaUsers /></div>
        <div className="text">
          <p>Total Users</p>
          <h2>{count}</h2>
        </div>
      </div>

      <div className='sa-UserManagement-UserList'>
        <div className="um-header-box">
          <h2>User List</h2>
        </div>

        <div className="um-Search-box">
          <div className="search-bar">
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

        <div className="um-user-table">
          <div className="table-header-row">
            <div className="user-table-cell">User</div>
            <div className="email-table-cell">Email</div>
            <div className="action-table-cell">Actions</div>
          </div>

          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <div
                className={`table-row ${fadingUserId === user.id ? 'fade-out' : ''}`}
                key={user.id}
                onClick={() => handleUserClick(user)}
              >
                <div className="user-cell">
                  <img src={CustomProfile} alt="User" className='user-profile' />
                  <span className='user-name'>{user.fullName}</span>
                </div>
                <div className="email-cell">
                  <span className='user-email'>{user.email}</span>
                </div>
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
                onClick={() => groupStart > 1 && setCurrentPage(groupStart - 1)}
                disabled={groupStart === 1}
              >
                Previous
              </button>
              {[...Array(groupEnd - groupStart + 1)].map((_, i) => (
                <button
                  key={groupStart + i}
                  className={currentPage === groupStart + i ? 'active' : ''}
                  onClick={() => setCurrentPage(groupStart + i)}
                >
                  {groupStart + i}
                </button>
              ))}
              <button
                onClick={() => groupEnd < totalPages && setCurrentPage(groupEnd + 1)}
                disabled={groupEnd === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

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

      {deleteSuccess && (
        <div className="success-popup">User deleted successfully!</div>
      )}

      {showDashboard && selectedUser && (
        <div className="popup-overlay" onClick={closeDashboardPopup}>
          <div className="dashboard-popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-button" onClick={closeDashboardPopup}>
              <IoClose />
            </button>
            <SADashBoard
              profile={mapToProfileData(selectedUser)}
              recentBookings={mapToRecentBookings()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SAUserManagement;