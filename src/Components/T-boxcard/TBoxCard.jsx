import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import dumby from "../../Assest/hotelimage.png";
import "./TBoxCard.css";

const TBoxCard = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 2;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user-properties/user/5")
      .then((response) => {
        const formatted = response.data.map((item) => ({
          id: item.hotelId,
          ImgUrl: item.imageUrl || dumby,
          name: item.hotelName,
          PropertyType: item.propertyType === 1 ? "Hotel" : "Homestay",
          Rating: item.rating,
          Condition: "In review", // Default or replace with actual field if available
          Location: item.hotelLocation,
        }));
        setProperties(formatted);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const paginatedProperties = properties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const getConditionClass = (condition) => {
    const normalized = condition?.toLowerCase().trim();
    if (normalized.includes("hot")) return "condition-hot";
    if (normalized.includes("slow")) return "condition-slow";
    return "condition-in-review";
  };

  return (
    <div className="t-hotels">
      {paginatedProperties.map((property) => (
        <div key={property.id} className="t-hotels-card">
          <div className="t-hotels-card-left">
            <img src={property.ImgUrl || "/placeholder.svg"} alt="Hotel" />
          </div>
          <div className="t-hotels-card-middle">
            <h2 className="t-hotels-property-name">{property.name}</h2>
            <div className="property-details-grid">
              <div className="property-detail-column">
                <p className="detail-label">Type</p>
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
                      className={`star-icon ${i < property.Rating ? "filled" : "empty"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="property-detail-column">
                <p className="detail-label">Condition</p>
                <div className={`colorchange ${getConditionClass(property.Condition)}`}>
                  <p className="detail-value">{property.Condition}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`t-hotels-pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TBoxCard;
