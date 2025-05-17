import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import dumby from "../../Assest/hotelimage.png";
import "./TBoxCard.css";
import SADescriptionPage from "../../Page/SA-DescriptionPage/SADescriptionPage";
import { IoClose } from "react-icons/io5";
import EditFormPage from "../../Page/Travel-agent-formEdit/EditFormPage";
import { FormProvider } from "../../context/FormContext";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

const TBoxCard = () => {
  const initialProperties = [
  ];

  const [properties, setProperties] = useState(initialProperties);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [fadeOutId, setFadeOutId] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);

  const handleEditClick = (property) => {
    setPropertyToEdit(property);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setPropertyToEdit(null);
  };

  const propertiesPerPage = 3;
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

  const confirmDelete = (id) => {
    setShowConfirm(true);
    setDeleteId(id);
  };

  const handleDeleteProperty = () => {
  setFadeOutId(deleteId); // Trigger fade-out animation for the item
  setShowConfirm(false);   // Close the confirmation popup

  setTimeout(() => {
    // Send the DELETE request to the backend
    axios
      .delete(`http://localhost:8080/api/user-properties/${deleteId}`)
      .then(() => {
        // After successful deletion, remove the property from the list in the state
        const updatedProperties = properties.filter(property => property.id !== deleteId);
        setProperties(updatedProperties);

        // Adjust the page number if necessary
        const totalPagesAfterDelete = Math.ceil(updatedProperties.length / propertiesPerPage);
        if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
          setCurrentPage(totalPagesAfterDelete);
        } else if (paginatedProperties.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        setDeleteSuccess(true); // Show success message
        setTimeout(() => {
          setDeleteSuccess(false); // Hide success message after a brief period
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting property:", error);
      });

    setFadeOutId(null); // Reset fade-out ID
  }, 300);
};

   useEffect(() => {
    axios
      .get("http://localhost:8080/api/user-properties/user/5")
      
      .then((response) => {
        console.log(response);
        
        const formatted = response.data.map((item) => ({
          id: item.hotelId,
          ImgUrl: item.imageUrl || dumby,
          name: item.hotelName,
          PropertyType: item.propertyType === 1 ? "Hotel" : "Homestay",
          Rating: item.rating,
          Condition: "In review",
          Location: item.hotelLocation,
          type:item.propertyType,

        }));
        setProperties(formatted);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

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

  return (
    <div className="t-hotels">
      {paginatedProperties.length > 0 ? (
        paginatedProperties.map((property) => (
          <div
            key={property.id}
            className={`t-hotels-card ${fadeOutId === property.id ? "fade-out" : ""}`}
          >
            <div className="t-hotels-card-left">
              <img src={property.ImgUrl || "/placeholder.svg"} alt="Hotel" />
            </div>
            <div className="t-hotels-card-middle">
              <h2 className="t-hotels-property-name">{property.name}</h2>
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
                  <p className="detail-label">Rating</p>
                  <div className="stars-row">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`star-icon ${i < property.Rating ? 'filled' : 'empty'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p 
                className="view-details-link" 
                onClick={() => handleDetailClick(property)}
              >
                View Details
              </p>
            </div>
            <div className="t-hotels-card-right">
              <div className="top-button">
                <button
                  className="t-hotels-delete-btn"
                  onClick={() => confirmDelete(property.id)}
                >
                  <FaTrash className="t-hotels-delete-icon" />
                </button>
              </div>
              <div className="bottom-button">
                <button 
                  className="t-hotels-edit-btn"
                  onClick={() => handleEditClick(property)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">No properties found</div>
      )}

      <div className="bottom-section">
        <div>
          Showing {properties.length > 0 ? `${showingFrom} to ${showingTo}` : 0} of {properties.length} Results
        </div>
        <div className="pagination">
          <button
            className="t-hotels-pagination-btn"
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
                className={`t-hotels-pagination-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="t-hotels-pagination-btn"
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
            <p className="popup-text">Are you sure you want to remove this property?</p>
            <div className="popup-buttons">
              <button className="popup-btn no" onClick={() => setShowConfirm(false)}>No</button>
              <button className="popup-btn yes" onClick={handleDeleteProperty}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {deleteSuccess && (
        <div className="success-popup">Property deleted successfully!</div>
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

      {showEditForm && propertyToEdit && (
        <div className="popup-overlay" onClick={closeEditForm}>
          <div className="edit-popup-container" onClick={(e) => e.stopPropagation()}>
            <FormProvider>
              <EditFormPage 
                propertyData={propertyToEdit} 
                onClose={closeEditForm}
                onSave={(updatedData) => {
                  const updatedProperties = properties.map(p => 
                    p.id === propertyToEdit.id ? { 
                      ...p, 
                      name: updatedData.basic.propertyName,
                      PropertyType: updatedData.basic.stayType,
                      Rating: parseInt(updatedData.basic.rating),
                    } : p
                  );
                  setProperties(updatedProperties);
                  closeEditForm();
                }}
              />
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default TBoxCard;