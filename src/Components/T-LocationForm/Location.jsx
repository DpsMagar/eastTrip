// Location.js
import React from "react";
import "./Location.css";

import { useForm } from "../../context/FormContext";
const Location = () => {
  const { formData, updateFormData, errors } = useForm();

  return (
    <div className="location-box">
      <h3 className="section-title">Location</h3>
      <div className="location-form">
        <div className="form-row">
          <label>Province</label>
          <input
            type="text"
            placeholder="e.g Gandaki"
            value={formData.location.province}
            onChange={(e) =>
              updateFormData("location", "province", e.target.value)
            }
          />
          {errors.location?.province && (
            <p className="error-message">{errors.location.province}</p>
          )}
        </div>
        <div className="form-row">
          <label>District</label>
          <input
            type="text"
            placeholder="e.g kaski"
            value={formData.location.district}
            onChange={(e) =>
              updateFormData("location", "district", e.target.value)
            }
          />
          {errors.location?.district && (
            <p className="error-message">{errors.location.district}</p>
          )}
        </div>
        <div className="form-row">
          <label>Attraction</label>
          <input
            type="text"
            placeholder="e.g phewa lake"
            value={formData.location.attraction}
            onChange={(e) =>
              updateFormData("location", "attraction", e.target.value)
            }
          />
          {errors.location?.attraction && (
            <p className="error-message">{errors.location.attraction}</p>
          )}
        </div>
        <div className="form-row">
          <label>Postal code</label>
          <input
            type="text"
            placeholder="e.g 44600"
            value={formData.location.postalCode}
            onChange={(e) =>
              updateFormData("location", "postalCode", e.target.value)
            }
          />
          {errors.location?.postalCode && (
            <p className="error-message">{errors.location.postalCode}</p>
          )}
        </div>
        <div className="form-row">
          <label>Area Name</label>
          <input
            type="text"
            placeholder="e.g lakeside"
            value={formData.location.areaName}
            onChange={(e) =>
              updateFormData("location", "areaName", e.target.value)
            }
          />
          {errors.location?.areaName && (
            <p className="error-message">{errors.location.areaName}</p>
          )}
        </div>
        <div className="form-row">
          <label>Building number</label>
          <input
            type="text"
            placeholder="e.g 999"
            value={formData.location.buildingNumber}
            onChange={(e) =>
              updateFormData("location", "buildingNumber", e.target.value)
            }
          />
          {errors.location?.buildingNumber && (
            <p className="error-message">{errors.location.buildingNumber}</p>
          )}
        </div>
        <div className="form-row">
          <label>Total Room</label>
          <input
            type="number"
            placeholder="100"
            value={formData.location.totalRooms}
            onChange={(e) =>
              updateFormData("location", "totalRooms", e.target.value)
            }
          />
          {errors.location?.totalRooms && (
            <p className="error-message">{errors.location.totalRooms}</p>
          )}
        </div>

        <div className="form-row">
          <label>Pricing start from</label>
          <input
            type="text"
            placeholder="$100"
            value={formData.location.pricingStart}
            onChange={(e) =>
              updateFormData("location", "pricingStart", e.target.value)
            }
          />
          {errors.location?.pricingStart && (
            <p className="error-message">{errors.location.pricingStart}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;