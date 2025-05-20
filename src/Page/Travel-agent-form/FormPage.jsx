"use client"

import { useState } from "react"
import "./Form.css"
import BasicForm from "../../Components/T-BasicForm/BasicForm"
import AmenitiesForm from "../../Components/T-AmenitiesForm/AmenitiesForm"
import Location from "../../Components/T-LocationForm/Location"
import { useForm } from "../../context/FormContext"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

const FormPage = () => {
  const property = useSelector((state) => state.property);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Basic")
  const tabs = ["Basic", "Amenities", "Location"]
  const { formData, validateSection } = useForm()
  const userId = sessionStorage.getItem("userId")
  
  // State for popups
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab)

    // Skip validation for "Amenities" tab
    if (activeTab === "Amenities" && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
      return
    }

    const isValid = validateSection(activeTab.toLowerCase())
    if (isValid && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab)

    // Skip validation when going back from "Location" to "Amenities"
    if (activeTab === "Location" && tabs[currentIndex - 1] === "Amenities") {
      setActiveTab("Amenities")
      return
    }

    // Just go back (no validation needed when going back)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleSubmit = async () => {
    const isValid = validateSection(activeTab.toLowerCase());
    if (!isValid) return;

    const { typeOfProperty, generalInfo, features, locationDetails } = property;

    const payload = {
      name: generalInfo.name,
      location: locationDetails.location,
      attraction: locationDetails.attraction,
      price: locationDetails.price,
      rating: parseFloat(generalInfo.rating), // Ensure it's a number
      extraInfo: features.extraInfo,
      imageUrl: generalInfo.imageUrl,
      featureIds: features.featureIds || [],
      roomFeatureIds: features.roomFeatureIds || [],
      userId: userId,
    };

    let url = "";

    if (typeOfProperty === 1) {
      url = "https://easttrip.onrender.com/add/hotel";
    } else if (typeOfProperty === 2) {
      url = "https://easttrip.onrender.com/add/homestay";
    } else {
      setPopupMessage("Invalid property type.")
      setShowErrorPopup(true)
      setTimeout(() => setShowErrorPopup(false), 2000)
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Failed to submit: ${response.statusText}`);
      }

      const data = await response.json()
      console.log("form submitted successfully", payload);
      console.log(response);
      
      setPopupMessage("Property listed successfully")
      setShowSuccessPopup(true)
      setTimeout(() => {
        setShowSuccessPopup(false)
        navigate('/travelagent')
      }, 2000)
      
    } catch (error) {
      console.error("Submission error:", error);
      setPopupMessage(error.message || "Failed to submit form. Please try again.")
      setShowErrorPopup(true)
      setTimeout(() => setShowErrorPopup(false), 2000)
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Basic":
        return <BasicForm />
      case "Amenities":
        return <AmenitiesForm />
      case "Location":
        return <Location />
      default:
        return <BasicForm />
    }
  }

  return (
    <div className="form-page">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          {popupMessage}
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="failed-popup">
          {popupMessage}
        </div>
      )}

      <div className="form-header">
        <h1>Properties Form</h1>
        <p>Fill in the details below to add new Properties of yours in GhumGham</p>
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
                Submit
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
  )
}

export default FormPage