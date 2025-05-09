"use client"

import { useState } from "react"
import "./Form.css"
import BasicForm from "../../Components/T-BasicForm/BasicForm"
import AmenitiesForm from "../../Components/T-AmenitiesForm/AmenitiesForm"
import Location from "../../Components/T-LocationForm/Location"
import { useForm } from "../../context/FormContext"

const EditFormPage = () => {
  const [activeTab, setActiveTab] = useState("Basic")
  const tabs = ["Basic", "Amenities", "Location"]
  const { formData, validateSection } = useForm()

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab)
    const isValid = validateSection(activeTab.toLowerCase())
    
    if (isValid && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleSubmit = async () => {
    // Validate the current tab first
    const isValid = validateSection(activeTab.toLowerCase())
    
    if (isValid) {
      try {
        console.log("Submitting form data:", formData)       
        alert('Form submitted successfully!')
      } catch (error) {
        console.error('Submission error:', error)
        alert('Failed to submit form. Please try again.')
      }
    }
  }

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

export default EditFormPage