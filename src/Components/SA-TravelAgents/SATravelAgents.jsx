import React, { useState, useEffect } from 'react';
import './SATravelAgents.css';
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import CustomProfile from "../../Assest/profile.jpg";
import { MdRealEstateAgent } from "react-icons/md";

const SATravelAgents = () => {
  const initialUsers = [
    { id: 1, profile: CustomProfile, name: "Sarah Wilson", properties: 3 },
    { id: 2, profile: CustomProfile, name: "John Doe", properties: 5 },
    { id: 3, profile: CustomProfile, name: "Jane Smith", properties: 2 },
    { id: 4, profile: CustomProfile, name: "Michael Brown", properties: 4 },
    { id: 5, profile: CustomProfile, name: "Emily Davis", properties: 1 },
    { id: 6, profile: CustomProfile, name: "David Johnson", properties: 3 },
    { id: 7, profile: CustomProfile, name: "Emma Wilson", properties: 2 },
    { id: 8, profile: CustomProfile, name: "James Taylor", properties: 4 },
    { id: 9, profile: CustomProfile, name: "Olivia Martinez", properties: 5 },
    { id: 10, profile: CustomProfile, name: "Liam Anderson", properties: 3 },
    { id: 11, profile: CustomProfile, name: "Sophia Thomas", properties: 2 },
    { id: 12, profile: CustomProfile, name: "Benjamin Jackson", properties: 4 },
    { id: 13, profile: CustomProfile, name: "Ava White", properties: 1 },
    { id: 14, profile: CustomProfile, name: "Lucas Harris", properties: 3 },
    { id: 15, profile: CustomProfile, name: "Mia Clark", properties: 2 },
    { id: 16, profile: CustomProfile, name: "Ethan Lewis", properties: 4 },
    { id: 17, profile: CustomProfile, name: "Charlotte Walker", properties: 5 },
    { id: 18, profile: CustomProfile, name: "Alexander Hall", properties: 3 },
    { id: 19, profile: CustomProfile, name: "Amelia Allen", properties: 2 },
    { id: 20, profile: CustomProfile, name: "William Young", properties: 4 },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [fadingUserId, setFadingUserId] = useState(null); // Fade out logic

  const usersPerPage = 3;

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.properties.toString().includes(searchQuery)
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
    setFadingUserId(id); // Trigger fade out
    setShowConfirm(false);

    setTimeout(() => {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setDeleteSuccess(true);
      setFadingUserId(null); // Clear fade user after deletion

      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      setTimeout(() => {
        setDeleteSuccess(false);
      }, 2000);
    }, 300); // Match fade-out transition time
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

          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <div
                className={`table-row ${fadingUserId === user.id ? 'fade-out' : ''}`}
                key={user.id}
              >
                <div className="user-cell">
                  <img src={user.profile} alt="User" className='user-profile' />
                  <span className='user-name'>{user.name}</span>
                </div>
                <div className="email-cell">
                  <span className='user-email'>{user.properties}</span>
                </div>
                <div className="action-cell">
                  
                  <button
                    className='delete-btn'
                    onClick={() => {
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
    </div>
  );
};

export default SATravelAgents;
