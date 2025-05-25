import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import dumby from "../../Assest/hotelimage.png";
import "./SAPendingLists.css";
import SADescriptionPage from "../../Page/SA-DescriptionPage/SADescriptionPage";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const SAPendingLists = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [approveSuccess, setApproveSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [fadeOutId, setFadeOutId] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user-properties/pending")
      .then((response) => {
        console.log(response.data);
        
        const formatted = response.data.map((item) => ({
          id: item.hotelId,
          ImgUrl: item.imageUrl || dumby,
          name: item.hotelName,
          PropertyType: item.propertyType === 1 ? "Hotel" : "Homestay",
          Rating: item.rating,
          Condition: "In review",
          Location: item.hotelLocation,
          type: item.propertyType,
        }));
        // console.log(formatted);
        
        setProperties(formatted);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const propertiesPerPage = 6;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  let groupSize = 3;
  let groupStart = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  let groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  let showingFrom = (currentPage - 1) * propertiesPerPage + 1;
  let showingTo = Math.min(currentPage * propertiesPerPage, properties.length);

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

      const totalPagesAfterAction = Math.ceil(properties.length / propertiesPerPage);

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

  const handleDetailClick = (property) => {
    setSelectedProperty(property);
    setShowDescription(true);
  };

  const closeDescriptionPopup = () => {
    setShowDescription(false);
    setSelectedProperty(null);
  };

  const mapToHotelInfo = (property) => {
    return {
      Name: property.name,
      location: property.Location,
      attraction: `Located in ${property.Location}`,
      rating: property.rating || 4,
      roomFeatures: property.features || ["Private Bathroom", "Aesthetic Lighting"],
      price: property.price || 2800,
      extraInfo: "Available for booking",
      homeStayFeatures: property.amenities || ["24/7 Customer Support"],
      description: property.description || "No description available",
      "Main-Image": property.ImgUrl || dumby,
      "extra-image": property.images || [dumby, dumby, dumby, dumby],
      rewardPoints: 400,
      reviews: [
        {
          name: "Hinata",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 5,
          date: "2 days ago",
          comment: "Amazing experience! The staff was incredibly helpful.",
        },
        {
          name: "Akainu",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          rating: 4,
          date: "1 week ago",
          comment: "Great location and beautiful rooms.",
        },
      ],
    };
  };

  return (
    <div className="sa-pending">
      <div className="sa-pending-header">
        <h1>Pending list</h1>
        <p>Add or Remove property listings</p>
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
              <p 
                className="view-details-link" 
                onClick={() => handleDetailClick(property)}
              >
                View Details
              </p>
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
        <div className="no-results">No pending properties found</div>
      )}

      <div className="bottom-section">
        <div>
          Showing {properties.length > 0 ? `${showingFrom} to ${showingTo}` : 0} of {properties.length} Results
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

      {deleteSuccess && (
        <div className="success-popup-reject">Property rejected successfully!</div>
      )}
      {approveSuccess && (
        <div className="success-popup approve">Property approved successfully!</div>
      )}

      {showDescription && selectedProperty && (
        <div className="popup-overlay" onClick={closeDescriptionPopup}>
          <div className="description-popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-button" onClick={closeDescriptionPopup}>
              <IoClose />
            </button>
            <SADescriptionPage 
              // hotelInfo={mapToHotelInfo(selectedProperty)} 
                            requiredVals={[selectedProperty.type, selectedProperty.id]}
              
              // onClose={closeDescriptionPopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SAPendingLists;