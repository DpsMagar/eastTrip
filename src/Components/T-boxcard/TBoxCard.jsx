import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import dumby from "../../Assest/hotelimage.png";
import "./TBoxCard.css";
import SADescriptionPage from "../../Page/SA-DescriptionPage/SADescriptionPage";
import { IoClose } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import EditFormPage from "../../Page/Travel-agent-formEdit/EditFormPage";
import { FormProvider } from "../../context/FormContext"

const TBoxCard = () => {
  const initialProperties = [
    { 
      id: 1, 
      ImgUrl: dumby, 
      name: "Hotel Everest", 
      PropertyType: "Hotel", 
      Rating: 4,
      Location: "Kathmandu"
    },
    { 
      id: 2, 
      ImgUrl: dumby, 
      name: "Hotel Annapurna", 
      PropertyType: "Hotel", 
      Rating: 5,
      Location: "Lalitpur"
    },
    { 
      id: 3, 
      ImgUrl: dumby, 
      name: "Hotel Pokhara", 
      PropertyType: "Homestay", 
      Rating: 3,
      Location: "Pokhara"
    },
    { 
      id: 4, 
      ImgUrl: dumby, 
      name: "Hotel Chitwan", 
      PropertyType: "Homestay", 
      Rating: 4,
      Location: "Chitwan"
    },
    { 
      id: 5, 
      ImgUrl: dumby, 
      name: "Hotel Lumbini", 
      PropertyType: "Hotel", 
      Rating: 5,
      Location: "Lumbini"
    },
    { 
      id: 6, 
      ImgUrl: dumby, 
      name: "Hotel Nagarkot", 
      PropertyType: "Homestay", 
      Rating: 3,
      Location: "Nagarkot"
    },
    { 
      id: 7, 
      ImgUrl: dumby, 
      name: "Hotel Bandipur", 
      PropertyType: "Hotel", 
      Rating: 4,
      Location: "Bandipur"
    },
    { 
      id: 8, 
      ImgUrl: dumby, 
      name: "Hotel Gosaikunda", 
      PropertyType: "Homestay", 
      Rating: 5,
      Location: "Gosaikunda"
    },
    { 
      id: 9, 
      ImgUrl: dumby, 
      name: "Hotel Rara", 
      PropertyType: "Hotel", 
      Rating: 3,
      Location: "Rara"
    },
    { 
      id: 10, 
      ImgUrl: dumby, 
      name: "Hotel Bhaktapur", 
      PropertyType: "Homestay", 
      Rating: 4,
      Location: "Bhaktapur"
    },
  

   
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

  return (
    <div className="t-hotels">


      <div className="t-hotels-search">
        <div className="t-hotels-search-section">
          <CiSearch className="t-hotels-search-icon" />
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

        <select className="t-hotels-search-select" value={typeFilter} onChange={(e) => {
          setTypeFilter(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="">All Types</option>
          {PropertyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select className="t-hotels-search-select" value={cityFilter} onChange={(e) => {
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
    <button className="t-hotels-edit-btn"
    onClick={() => handleEditClick(property)}
    >
      Edit
    </button>
  </div>
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
              hotelInfo={mapToHotelInfo(selectedProperty)} 
              onClose={closeDescriptionPopup}
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
            // Handle the updated data
            const updatedProperties = properties.map(p => 
              p.id === propertyToEdit.id ? { 
                ...p, 
                name: updatedData.basic.propertyName,
                PropertyType: updatedData.basic.stayType,
                Rating: parseInt(updatedData.basic.rating),
                // Update other fields as needed
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