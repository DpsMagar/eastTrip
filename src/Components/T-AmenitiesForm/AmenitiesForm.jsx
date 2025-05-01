// AmenitiesForm.js
import "./Armenities.css";
import { useForm } from "../../context/FormContext";

const amenitiesList = [
  { id: "airConditioning", label: "Air Conditioning" },
  { id: "laundry", label: "Laundry" },
  { id: "newspaper", label: "Newspaper" },
  { id: "parking", label: "Parking" },
  { id: "roomService", label: "Room Service" },
  { id: "lounge", label: "Lounge" },
  { id: "restaurant", label: "Restaurant" },
  { id: "fireExtinguishers", label: "Fire Extinguishers" },
  { id: "cctv", label: "CCTV" },
  { id: "childcareService", label: "Childcare Service" },
  { id: "petService", label: "Pet Service" },
  { id: "securityGuard", label: "Security Guard" },
  { id: "healthService", label: "Health Service" },
  { id: "swimmingPool", label: "Swimming Pool" },
  { id: "tv", label: "TV" },
  { id: "spa", label: "Spa" },
];

const AmenitiesForm = () => {
  const { formData, updateFormData, errors } = useForm();

  return (
    <div className="amenities-container">
      <h1>Amenities</h1>
      <p className="subtitle">
        Please select all the amenities available at your property
      </p>

      <div className="amenities-table">
        {amenitiesList.map((amenity) => (
          <div key={amenity.id} className="amenity-row">
            <div className="amenity-name">{amenity.label}</div>
            <div className="amenity-options">
              <label className="option-label">
                <input
                  type="radio"
                  name={amenity.id}
                  value="Yes"
                  checked={formData.amenities[amenity.id] === "Yes"}
                  onChange={(e) =>
                    updateFormData("amenities", amenity.id, e.target.value)
                  }
                />
                <span className="option-text">Yes</span>
              </label>
              <label className="option-label">
                <input
                  type="radio"
                  name={amenity.id}
                  value="No"
                  checked={formData.amenities[amenity.id] === "No"}
                  onChange={(e) =>
                    updateFormData("amenities", amenity.id, e.target.value)
                  }
                />
                <span className="option-text">No</span>
              </label>
            </div>
            {errors.amenities?.[amenity.id] && (
              <p className="error-message">{errors.amenities[amenity.id]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesForm;