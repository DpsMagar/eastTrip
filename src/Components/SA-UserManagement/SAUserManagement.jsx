import React, { useState, useEffect } from 'react';
import './SAUserManagement.css';
import { FaUsers, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import CustomProfile from "../../Assest/profile.jpg";

const initialUsers = [
  { id: 1, profile: CustomProfile, name: "Sarah Wilson", email: "sarah.wilson@example.com" },
  { id: 2, profile: CustomProfile, name: "Michael Chen", email: "michael.chen@example.com" },
  { id: 3, profile: CustomProfile, name: "Emma Thompson", email: "emma.t@example.com" },
  { id: 4, profile: CustomProfile, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 5, profile: CustomProfile, name: "Alice Johnson", email: "alice.j@example.com" },
  { id: 6, profile: CustomProfile, name: "David Wilson", email: "david.w@example.com" },
  { id: 7, profile: CustomProfile, name: "Chris Evans", email: "chris.e@example.com" },
  { id: 8, profile: CustomProfile, name: "Robert Brown", email: "robert.b@example.com" },
  { id: 9, profile: CustomProfile, name: "Lisa Wong", email: "lisa.w@example.com" },
  { id: 10, profile: CustomProfile, name: "James Taylor", email: "james.t@example.com" },
  { id: 11, profile: CustomProfile, name: "Olivia Martinez", email: "olivia.m@example.com" },
  { id: 12, profile: CustomProfile, name: "Daniel Garcia", email: "daniel.g@example.com" },
  { id: 13, profile: CustomProfile, name: "Sophia Lee", email: "sophia.l@example.com" },
  { id: 14, profile: CustomProfile, name: "Matthew Clark", email: "matthew.c@example.com" },
  { id: 15, profile: CustomProfile, name: "Emily Rodriguez", email: "emily.r@example.com" },
  { id: 16, profile: CustomProfile, name: "Andrew Lewis", email: "andrew.l@example.com" },
  { id: 17, profile: CustomProfile, name: "Ava Walker", email: "ava.w@example.com" },
  { id: 18, profile: CustomProfile, name: "Joshua Hall", email: "joshua.h@example.com" },
  { id: 19, profile: CustomProfile, name: "Mia Young", email: "mia.y@example.com" },
  { id: 20, profile: CustomProfile, name: "Christopher Allen", email: "chris.a@example.com" },
  { id: 21, profile: CustomProfile, name: "Charlotte King", email: "charlotte.k@example.com" },
  { id: 22, profile: CustomProfile, name: "Ethan Scott", email: "ethan.s@example.com" },
  { id: 23, profile: CustomProfile, name: "Amelia Green", email: "amelia.g@example.com" },
  { id: 24, profile: CustomProfile, name: "Benjamin Adams", email: "benjamin.a@example.com" },
  { id: 25, profile: CustomProfile, name: "Harper Nelson", email: "harper.n@example.com" }
];

const SAUserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [fadingUserId, setFadingUserId] = useState(null); // <-- For fade effect

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
    setFadingUserId(id); // trigger fade out
    setShowConfirm(false);

    setTimeout(() => {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setDeleteSuccess(true);
      setFadingUserId(null); // clear fade user after deletion

      // Adjust current page if needed
      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      setTimeout(() => {
        setDeleteSuccess(false);
      }, 2000);

    }, 300); // match fade-out transition time
  };

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
          <h2>{users.length}</h2>
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
              >
                <div className="user-cell">
                  <img src={user.profile} alt="User" className='user-profile' />
                  <span className='user-name'>{user.name}</span>
                </div>
                <div className="email-cell">
                  <span className='user-email'>{user.email}</span>
                </div>
                <div className="action-cell">
                  <button className='edit-btn'><FiEdit className='edit-icon' /></button>
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

export default SAUserManagement;
