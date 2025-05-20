import React, { useState, useEffect } from 'react';
import './SATravelAgents.css';
import { FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdRealEstateAgent } from "react-icons/md";
import SATDashBoard from '../../Page/SA-travel-DashBoard/SATDashBoard';
import axios from 'axios';
import CustomProfile from "../../Assest/profile.png";

const SATravelAgents = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [fadingUserId, setFadingUserId] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false); 

  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://easttrip.onrender.com/api/users/with-properties');
        setUsers(response.data || []);
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
      (user.properties && user.properties.toString().includes(searchQuery))
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
    await axios.delete(`http://localhost:8080/api/user-properties/user/${id}`);
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

      setTimeout(() => setDeleteSuccess(false), 2000);
    }, 300);
  };

  const handleRowClick = (user) => {
    setSelectedAgent(user);
    setShowDashboard(true);
  };

  return (
    <div className='sa-UserManagement'>
      <div className='sa-UserManagement-header'>
        <h1>Travel Agents</h1>
        <p>Manage and monitor travel agent accounts</p>
      </div>

      <div className='sa-UserManagement-card'>
        <div className="icon"><MdRealEstateAgent /></div>
        <div className="text">
          <p>Total Agents</p>
          <h2>{users.length}</h2>
        </div>
      </div>

      <div className='sa-UserManagement-UserList'>
        <div className="um-header-box">
          <h2>Travel Agents</h2>
        </div>

        <div className="um-Search-box">
          <div className="search-bar">
            <input
              type="text"
              placeholder='Search by name or properties'
              className='search-input'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className='search-icon' />
          </div>
        </div>

        <div className="um-user-table">
          <div className="table-header-row">
            <div className="user-table-cell">Agent</div>
            <div className="email-table-cell">Properties</div>
            <div className="action-table-cell">Actions</div>
          </div>

          {loading ? (
            <div className="loading">Loading agents...</div>
          ) : paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <div
                className={`table-row ${fadingUserId === user.id ? 'fade-out' : ''}`}
                key={user.id}
                onClick={() => handleRowClick(user)}
              >
                <div className="user-cell">
                  <img src={CustomProfile} alt="User" className='user-profile' />
                  <span className='user-name'>{user.fullName}</span>
                </div>
                <div className="email-cell">
                  <span className='user-email'>{user.count}</span>
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
            <div className="no-results">No Agent found matching your criteria</div>
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
                onClick={() => groupEnd < totalPages && setCurrentPage(groupEnd + 1)}
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
            <p className="popup-text">Are you sure you want to remove this agent?</p>
            <div className="popup-buttons">
              <button className="popup-btn no" onClick={() => setShowConfirm(false)}>No</button>
              <button className="popup-btn yes" onClick={() => handleDeleteUser(selectedUserId)}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Popup */}
      {deleteSuccess && (
        <div className="success-popup">Agent deleted successfully!</div>
      )}

      {/* Dashboard Popup */}
      {showDashboard && (
        <div className="popup-overlay" onClick={() => setShowDashboard(false)}>
          <div className="dashboard-popup-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="popup-close-button"
              onClick={() => setShowDashboard(false)}
            >
              ×
            </button>
            <SATDashBoard agent={selectedAgent} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SATravelAgents;
