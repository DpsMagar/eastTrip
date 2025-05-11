import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import dumby from "../../Assest/hotelimage.png";
import "./SAHotels.css";
import SADescriptionPage from "../../Page/SA-DescriptionPage/SADescriptionPage";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const SAHotels = () => {
  const initialProperties = [
    { 
      id: 1, 
      ImgUrl: dumby, 
      name: "Hotel Everest", 
      PropertyType: "Hotel", 
      Owner: "John Doe", 
      Location: "Kathmandu",
      description: "Luxury hotel with views of the Himalayas",
      rating: 4.5,
      features: ["Free WiFi", "Swimming Pool", "Spa"],
      price: 5000,
      amenities: ["Restaurant", "24/7 Room Service", "Conference Room"],
      images: [dumby, dumby, dumby, dumby]
    }

   
  ];

  const [properties, setProperties] = useState(initialProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [fadeOutId, setFadeOutId] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  const cities = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Lumbini", "Nagarkot", "Bandipur", "Gosaikunda", "Rara"];
  const PropertyTypes = ["Hotel", "Homestay"];

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (cityFilter ? property.Location === cityFilter : true) &&
    (typeFilter ? property.PropertyType === typeFilter : true)
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

  const confirmDelete = (id) => {
    setShowConfirm(true);
    setDeleteId(id);
  };

  const handleDeleteProperty = () => {
    axios
          .delete(`http://localhost:8080/api/user-properties/${deleteId}`)
    setFadeOutId(deleteId);
    setShowConfirm(false);

    setTimeout(() => {

      const updatedProperties = properties.filter(property => property.id !== deleteId);
      setProperties(updatedProperties);

      const filteredAfterDelete = updatedProperties.filter((property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (cityFilter ? property.Location === cityFilter : true) &&
        (typeFilter ? property.PropertyType === typeFilter : true)
      );

      const totalPagesAfterDelete = Math.ceil(filteredAfterDelete.length / propertiesPerPage);

      if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setCurrentPage(totalPagesAfterDelete);
      } else if (paginatedProperties.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      setFadeOutId(null);
      setDeleteSuccess(true);

      setTimeout(() => {
        setDeleteSuccess(false);
      }, 2000);
    }, 300);
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

  const handleDetailClick = (property) => {
    setSelectedProperty(property);
    setShowDescription(true);
  };

  const closeDescriptionPopup = () => {
    setShowDescription(false);
    setSelectedProperty(null);
  };

   useEffect(() => {
      axios
        .get("http://localhost:8080/api/user-properties/all")
        .then((response) => {
          const formatted = response.data.map((item) => ({
            id: item.hotelId,
            ImgUrl: item.imageUrl || dumby,
            name: item.hotelName,
            PropertyType: item.propertyType === 1 ? "Hotel" : "Homestay",
            Rating: item.rating,
            Condition: "In review", // Default or replace with actual field if available
            Location: item.hotelLocation,
            type:item.propertyType,
  
          }));
          setProperties(formatted);
        })
        .catch((error) => {
          console.error("Error fetching properties:", error);
        });
    }, []);

  return (
    <div className="sa-hotels">
      <div className="sa-hotels-header">
        <h1>Properties</h1>
        <p>Review and manage property listings</p>
      </div>

      <div className="sa-hotels-search">
        <div className="sa-hotels-search-section">
          <CiSearch className="sa-hotels-search-icon" />
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

        <select className="sa-hotels-search-select" value={typeFilter} onChange={(e) => {
          setTypeFilter(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="">All Types</option>
          {PropertyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select className="sa-hotels-search-select" value={cityFilter} onChange={(e) => {
          setCityFilter(e.target.value);
          setCurrentPage(1);
        }}>
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
            className={`sa-hotels-card ${fadeOutId === property.id ? "fade-out" : ""}`}
          >
            <div className="sa-hotels-card-left">
              <img src={property.ImgUrl || "/placeholder.svg"} alt="Hotel" />
            </div>
            <div className="sa-hotels-card-middle">
              <h2 className="sa-hotels-property-name">{property.name}</h2>
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
            <div className="sa-hotels-card-right">
              <button
                className="sa-hotels-delete-btn"
                onClick={() => confirmDelete(property.id)}
              >
                <FaTrash className="sa-hotels-delete-icon" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">No properties found matching your criteria</div>
      )}

      <div className="bottom-section">
        <div>
          Showing {filteredProperties.length > 0 ? `${showingFrom} to ${showingTo}` : 0} of {filteredProperties.length} Results
        </div>
        <div className="pagination">
          <button
            className="sa-hotels-pagination-btn"
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
                className={`sa-hotels-pagination-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="sa-hotels-pagination-btn"
            onClick={() => {
              if (groupEnd < totalPages) setCurrentPage(groupEnd + 1);
            }}
            disabled={groupEnd === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirm Delete Popup */}
      {showConfirm && (
        <div className="popup-overlay" onClick={() => setShowConfirm(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowConfirm(false)}>×</button>
            <p className="popup-text">Are you sure you want to remove this property?</p>
            <div className="popup-buttons">
              <button className="popup-btn no" onClick={() => setShowConfirm(false)}>No</button>
              <button className="popup-btn yes" onClick={handleDeleteProperty}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {deleteSuccess && (
        <div className="success-popup">Property deleted successfully!</div>
      )}

      {/* Description Popup */}
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

export default SAHotels;