import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import dumby from "../../Assest/hotelimage.png";
import "./SAPendingLists.css";
import SADescriptionPage from "../../Page/SA-DescriptionPage/SADescriptionPage";
import { IoClose } from "react-icons/io5";

const SAPendingLists = () => {
  const initialProperties = [
    { 
      id: 1, 
      ImgUrl: dumby, 
      name: "Hotel Everest", 
      PropertyType: "Hotel", 
      Owner: "John Doe", 
      Location: "Kathmandu", 
      aprrovalStatus: "Pending",
      description: "Nestled in the heart of Kathmandu, Hotel Everest offers a blend of modern comfort and traditional Nepalese charm.",
      rating: 4,
      features: ["Private Bathroom", "Aesthetic Lighting", "Free WiFi", "Mountain View"],
      images: [dumby, dumby, dumby, dumby],
      price: 4500,
      amenities: ["Swimming Pool", "Restaurant", "Spa"]
    },
    { 
      id: 2, 
      ImgUrl: dumby, 
      name: "Hotel Annapurna", 
      PropertyType: "Hotel", 
      Owner: "Jane Smith", 
      Location: "Lalitpur", 
      aprrovalStatus: "Pending",
      description: "Luxury hotel with panoramic views of the Annapurna mountain range.",
      rating: 5,
      features: ["Private Balcony", "Minibar", "Room Service"],
      images: [dumby, dumby, dumby, dumby],
      price: 6800,
      amenities: ["Fitness Center", "Conference Room", "Bar"]
    },
    { 
      id: 3, 
      ImgUrl: dumby, 
      name: "Homestay in Bhaktapur", 
      PropertyType: "Homestay", 
      Owner: "Sita Rai", 
      Location: "Bhaktapur", 
      aprrovalStatus: "Pending",
      description: "Experience the rich culture of Bhaktapur in this cozy homestay.",
      rating: 4.5,
      features: ["Shared Kitchen", "Local Cuisine"],
      images: [dumby, dumby, dumby, dumby],
      price: 2000,
      amenities: ["Cultural Tours", "Cooking Classes"]
    },
    { 
      id: 4, 
      ImgUrl: dumby, 
      name: "Pokhara Lakeside Retreat", 
      PropertyType: "Homestay", 
      Owner: "Ram Thapa", 
      Location: "Pokhara", 
      aprrovalStatus: "Pending",
      description: "Relax by the lakeside in this beautiful homestay.",
      rating: 4.8,
      features: ["Lake View", "Private Garden"],
      images: [dumby, dumby, dumby, dumby],
      price: 3500,
      amenities: ["Kayaking", "Yoga Classes"]
    },
    { 
      id: 5, 
      ImgUrl: dumby, 
      name: "Chitwan Jungle Lodge", 
      PropertyType: "Hotel", 
      Owner: "Hari Gurung", 
      Location: "Chitwan", 
      aprrovalStatus: "Pending",
      description: "Explore the wildlife of Chitwan National Park from this lodge.",
      rating: 4.2,
      features: ["Safari Tours", "Nature Walks"],
      images: [dumby, dumby, dumby, dumby],
      price: 4000,
      amenities: ["Wildlife Tours", "Bird Watching"]
    },
    { 
      id: 6, 
      ImgUrl: dumby, 
      name: "Lumbini Heritage Hotel", 
      PropertyType: "Hotel", 
      Owner: "Gita Koirala", 
      Location: "Lumbini", 
      aprrovalStatus: "Pending",
      description: "Stay close to the birthplace of Buddha in this heritage hotel.",
      rating: 4.7,
      features: ["Cultural Tours", "Meditation Rooms"],
      images: [dumby, dumby, dumby, dumby],
      price: 5000,
      amenities: ["Spa Services", "Guided Tours"]
    },
  ];

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
  const [actionType, setActionType] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

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

      {/* Description Popup */}
      {showDescription && selectedProperty && (
  <div className="popup-overlay" onClick={closeDescriptionPopup}>
    <div className="description-popup-container" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close-button" onClick={closeDescriptionPopup}>
        <IoClose />
      </button>
      <SADescriptionPage 
        hotelInfo={mapToHotelInfo(selectedProperty)} 
        onClose={closeDescriptionPopup}
      />
    </div>
  </div>
)}
    </div>
  );
};

export default SAPendingLists;