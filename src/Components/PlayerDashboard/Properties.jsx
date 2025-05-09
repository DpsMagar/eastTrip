import React from 'react';
import "./Properties.css";

const Properties = ({ initialProperties = [] }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filteredProperties, setFilteredProperties] = React.useState(initialProperties);
  const [fadeOutId, setFadeOutId] = React.useState(null);
  const propertiesPerPage = 5;
  
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

  const handleDetailClick = (property) => {
    console.log("View details:", property);
  };

  const confirmDelete = (id) => {
    console.log("Delete property with id:", id);
    setFadeOutId(id);
  };

  return (
    <div className="properties-box">
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
            </div>
          </div>
        ))
      ) : (
        <div>No properties found</div>
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
    </div>
  );
}

export default Properties;