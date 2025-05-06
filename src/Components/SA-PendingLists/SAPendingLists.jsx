import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import dumby from "../../Assest/hotelimage.png";
import "./SAPendingLists.css";

const SAPendingLists = () => {
  const initialProperties = [
    { id: 1, ImgUrl: dumby, name: "Hotel Everest", PropertyType: "Hotel", Owner: "John Doe", Location: "Kathmandu", aprrovalStatus: "Pending" },
    { id: 2, ImgUrl: dumby, name: "Hotel Annapurna", PropertyType: "Hotel", Owner: "Jane Smith", Location: "Lalitpur", aprrovalStatus: "Pending" },
    { id: 3, ImgUrl: dumby, name: "Peaceful Homestay", PropertyType: "Homestay", Owner: "Hari Bahadur", Location: "Pokhara", aprrovalStatus: "Pending" },
    { id: 4, ImgUrl: dumby, name: "Mountain View", PropertyType: "Hotel", Owner: "Sita Ram", Location: "Chitwan", aprrovalStatus: "Pending" },
    { id: 5, ImgUrl: dumby, name: "Lumbini Retreat", PropertyType: "Homestay", Owner: "Gita Devi", Location: "Lumbini", aprrovalStatus: "Pending" },
    { id: 6, ImgUrl: dumby, name: "Nagarkot Paradise", PropertyType: "Hotel", Owner: "Ramesh Kumar", Location: "Nagarkot", aprrovalStatus: "Pending" },
    { id: 7, ImgUrl: dumby, name: "Bandipur Heritage", PropertyType: "Homestay", Owner: "Anita Sharma", Location: "Bandipur", aprrovalStatus: "Pending" },
    { id: 8, ImgUrl: dumby, name: "Gosaikunda Lodge", PropertyType: "Hotel", Owner: "Prakash Thapa", Location: "Gosaikunda", aprrovalStatus: "Pending" },
    { id: 9, ImgUrl: dumby, name: "Rara Lake Resort", PropertyType: "Homestay", Owner: "Sunita Rai", Location: "Rara", aprrovalStatus: "Pending" },
    { id: 10, ImgUrl: dumby, name: "Himalayan Escape", PropertyType: "Hotel", Owner: "Bishnu Prasad", Location: "Kathmandu", aprrovalStatus: "Pending" },
  ];
  console.log(initialProperties);
  const [properties, setProperties] = useState(initialProperties);
  const cities = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Lumbini", "Nagarkot", "Bandipur", "Gosaikunda", "Rara"];
  const PropertyTypes = ["Hotel", "Homestay"];

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [approveSuccess, setApproveSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [fadeOutId, setFadeOutId] = useState(null);
  const [actionType, setActionType] = useState(null); // 'reject' or 'approve'

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (cityFilter ? property.Location === cityFilter : true) &&
    (typeFilter ? property.PropertyType === typeFilter : true) &&
    property.aprrovalStatus === "Pending"
  );

  const propertiesPerPage = 2;
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  let groupSize = 3;
  let groupStart = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  let groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  let showingFrom = (currentPage - 1) * propertiesPerPage + 1;
  let showingTo = Math.min(currentPage * propertiesPerPage, filteredProperties.length);

  const confirmAction = (id, type) => {
    setShowConfirm(true);
    setActionType(type);
    if (type === 'reject') {
      setDeleteId(id);
    } else {
      setApproveId(id);
    }
  };

  const handleAction = () => {
    const id = actionType === 'reject' ? deleteId : approveId;
    setFadeOutId(id);
    setShowConfirm(false);

    setTimeout(() => {
      if (actionType === 'reject') {
        const updatedProperties = properties.filter(property => property.id !== id);
        setProperties(updatedProperties);
        setDeleteSuccess(true);
      } else {
        const updatedProperties = properties.map(property => 
          property.id === id ? { ...property, aprrovalStatus: "Approved" } : property
        );
        setProperties(updatedProperties);
        setApproveSuccess(true);
      }

      const filteredAfterAction = properties.filter((property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (cityFilter ? property.Location === cityFilter : true) &&
        (typeFilter ? property.PropertyType === typeFilter : true) &&
        property.aprrovalStatus === "Pending"
      );

      const totalPagesAfterAction = Math.ceil(filteredAfterAction.length / propertiesPerPage);

      if (currentPage > totalPagesAfterAction && totalPagesAfterAction > 0) {
        setCurrentPage(totalPagesAfterAction);
      } else if (paginatedProperties.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      setFadeOutId(null);

      setTimeout(() => {
        setDeleteSuccess(false);
        setApproveSuccess(false);
      }, 2000);
    }, 300);
  };

  return (
    <div className="sa-pending">
      <div className="sa-pending-header">
        <h1>Pending list</h1>
        <p>Add or Remove property listings</p>
      </div>

      <div className="sa-pending-search">
        <div className="sa-pending-search-section">
          <CiSearch className="sa-pending-search-icon" />
          <input
            type="text"
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select 
          className="sa-pending-search-select" 
          value={typeFilter} 
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Types</option>
          {PropertyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select 
          className="sa-pending-search-select" 
          value={cityFilter} 
          onChange={(e) => {
            setCityFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Locations</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {paginatedProperties.length > 0 ? (
        paginatedProperties.map((property) => (
          <div 
            key={property.id} 
            className={`sa-pending-card ${fadeOutId === property.id ? "fade-out" : ""}`}
          >
            <div className="sa-pending-card-left">
              <img src={property.ImgUrl || "/placeholder.svg"} alt="Hotel" />
            </div>
            <div className="sa-pending-card-middle">
              <h2 className="sa-pending-property-name">{property.name}</h2>
              <div className="property-details-grid">
                <div className="property-detail-column">
                  <p className="detail-label">Property Type</p>
                  <p className="detail-value">{property.PropertyType}</p>
                </div>
                <div className="property-detail-column">
                  <p className="detail-label">Location</p>
                  <p className="detail-value">{property.Location}</p>
                </div>
                <div className="property-detail-column">
                  <p className="detail-label">Owner</p>
                  <p className="detail-value">{property.Owner}</p>
                </div>
              </div>
              <p className="view-details-link">View Details</p>
            </div>
            <div className="sa-pending-card-right">
              <button 
                className="sa-pending-reject-btn"
                onClick={() => confirmAction(property.id, 'reject')}
              >
                Reject
              </button>
              <button 
                className="sa-pending-approve-btn"
                onClick={() => confirmAction(property.id, 'approve')}
              >
                Approve
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">No pending properties found matching your criteria</div>
      )}

      <div className="bottom-section">
        <div>
          Showing {filteredProperties.length > 0 ? `${showingFrom} to ${showingTo}` : 0} of {filteredProperties.length} Results
        </div>
        <div className="pagination">
          <button
            className="sa-pending-pagination-btn"
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
                className={`sa-pending-pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="sa-pending-pagination-btn"
            onClick={() => {
              if (groupEnd < totalPages) setCurrentPage(groupEnd + 1);
            }}
            disabled={groupEnd === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirm Popup */}
      {showConfirm && (
        <div className="popup-overlay" onClick={() => setShowConfirm(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowConfirm(false)}>×</button>
            <p className="popup-text">
              {actionType === 'reject' 
                ? "Are you sure you want to reject this property?" 
                : "Are you sure you want to approve this property?"}
            </p>
            <div className="popup-buttons">
              <button className="popup-btn no" onClick={() => setShowConfirm(false)}>No</button>
              <button 
                className={`popup-btn ${actionType === 'reject' ? 'yes' : 'approve'}`} 
                onClick={handleAction}
              >
                {actionType === 'reject' ? 'Reject' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popups */}
      {deleteSuccess && (
        <div className="success-popup reject">Property rejected successfully!</div>
      )}
      {approveSuccess && (
        <div className="success-popup approve">Property approved successfully!</div>
      )}
    </div>
  );
};

export default SAPendingLists;