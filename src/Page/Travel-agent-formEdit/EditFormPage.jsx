"use client"

import { useState, useEffect } from "react"
import "./Form.css"
import BasicForm from "../../Components/T-BasicForm/BasicForm"
import AmenitiesForm from "../../Components/T-AmenitiesForm/AmenitiesForm"
import Location from "../../Components/T-LocationForm/Location"
import { useForm } from "../../context/FormContext"

const SAMPLE_FORM_DATA = {
  basic: {
    stayType: "Hotel",
    propertyName: "Grand Mountain View",
    rating: "4",
    builtYear: "2010",
    startedYear: "2011",
    email: "contact@grandmountain.com",
    mobile: "9876543210",
    imageUrl: "https://example.com/hotel.jpg",
  },
  amenities: {
    airConditioning: "true",
    laundry: "true",
    newspaper: "false",
    parking: "true",
    roomService: "true",
    lounge: "true",
    restaurant: "true",
    fireExtinguishers: "true",
    cctv: "true",
    childcareService: "false",
    petService: "false",
    securityGuard: "true",
    healthService: "false",
    swimmingPool: "true",
    tv: "true",
    spa: "true",
  },
  location: {
    province: "Province 3",
    district: "Kathmandu",
    attraction: "Near Thamel",
    postalCode: "44600",
    areaName: "Thamel",
    buildingNumber: "25",
    totalRooms: "50",
    pricingStart: "100",
  },
}

const EditFormPage = ({ propertyData, onClose, onSave }) => {
  const [showSuccess, setShowSuccess] = useState(false);
const [showError, setShowError] = useState(false);
  const [activeTab, setActiveTab] = useState("Basic");
  const tabs = ["Basic", "Amenities", "Location"];
  const [isInitialized, setIsInitialized] = useState(false);
  
  const context = useForm();
  const formData = context?.formData || {};
  const updateFormData = context?.updateFormData || ((section, field, value) => {
    console.log("No form context - using local update:", section, field, value);
  });
  const validateSection = context?.validateSection || (() => true);

  // Load data automatically on component mount
  useEffect(() => {
    if (!isInitialized && context) {  // Added context check
      console.log("Initializing form data...");
      
      if (!propertyData) {
        console.log("Loading sample data");
        // Load sample data for new property
        Object.entries(SAMPLE_FORM_DATA).forEach(([section, fields]) => {
          Object.entries(fields).forEach(([field, value]) => {
            console.log(`Setting ${section}.${field} =`, value);
            updateFormData(section, field, value);
          });
        });
      } else {
        console.log("Loading property data");
        // Initialize with property data if provided
        updateFormData("basic", "propertyName", propertyData.name || "");
        updateFormData("basic", "stayType", propertyData.PropertyType || "");
        updateFormData("basic", "rating", propertyData.Rating?.toString() || "");
        // Add more mappings as needed for other fields
      }
      setIsInitialized(true);
    }
  }, [isInitialized, propertyData, updateFormData, context]); // Added context to dependencies

  // Debug: Log current form data
  useEffect(() => {
    console.log("Current form data:", formData);
  }, [formData]);

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    const isValid = validateSection(activeTab.toLowerCase());
    
    if (isValid && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    const isValid = validateSection(activeTab.toLowerCase());
    
    if (isValid) {
      if (onSave) {
        // If we have an onSave prop, use that
        onSave(formData);
        setShowSuccess(true);
      } else {
        // Otherwise use the default behavior
        console.log("Form data to be submitted:", formData);
        alert('Form submitted successfully with data: ' + JSON.stringify(formData, null, 2));
      }
      if (onClose) onClose();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Basic":
        return <BasicForm />;
      case "Amenities":
        return <AmenitiesForm />;
      case "Location":
        return <Location />;
      default:
        return <BasicForm />;
    }
  };

  return (
    <div className="T-form-page">
      <div className="form-header">
        <h1>{propertyData ? "Edit Property" : "Properties Form"}</h1>
        <p>Fill in the details below to {propertyData ? "edit" : "add new"} properties</p>
        {onClose && (
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      <div className="form-page-container">
        <div className="form-tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab-indicator ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Location" ? "Location & Pricing" : tab}
            </div>
          ))}
        </div>

        <div className="form-content">
          {renderTabContent()}

          <div className="form-navigation">
            <button
              className="nav-button back-button"
              onClick={handleBack}
              disabled={activeTab === "Basic"}
            >
              Back
            </button>
            {activeTab === "Location" ? (
              <button
                className="nav-button submit-button"
                onClick={handleSubmit}
              >
                {propertyData ? "Save Changes" : "Submit"}
              </button>
            ) : (
              <button
                className="nav-button next-button"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFormPage;