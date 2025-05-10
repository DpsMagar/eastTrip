"use client"

import { useState } from "react"
import "./Form.css"
import BasicForm from "../../Components/T-BasicForm/BasicForm"
import AmenitiesForm from "../../Components/T-AmenitiesForm/AmenitiesForm"
import Location from "../../Components/T-LocationForm/Location"
import { useForm } from "../../context/FormContext"
import { useSelector } from 'react-redux'


const FormPage = () => {
  const property = useSelector((state) => state.property);

  const [activeTab, setActiveTab] = useState("Basic")
  const tabs = ["Basic", "Amenities", "Location"]
  const { formData, validateSection } = useForm()
  const userId= sessionStorage.getItem("userId")

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
    userId:userId,

  };

  let url = "";

  if (typeOfProperty === 1) {
    url = "http://localhost:8080/add/hotel";
  } else if (typeOfProperty === 2) {
    url = "http://localhost:8080/add/homestay";
  } else {
    alert("Invalid property type.");
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
      throw new Error(`Failed to submit: ${response.statusText}`);
    }

   console.log("form submitted successfully",payload);
   console.log(response);
   
   
  } catch (error) {
    console.error("Submission error:", error);
    alert("Failed to submit form. Please try again.");
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