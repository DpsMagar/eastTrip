"use client"

import { useState } from "react"
import "./Form.css"
import BasicForm from "../../Components/T-BasicForm/BasicForm"
import AmenitiesForm from "../../Components/T-AmenitiesForm/AmenitiesForm"
import Location from "../../Components/T-LocationForm/Location"
import { useForm } from "../../context/FormContext"

const FormPage = () => {
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
    <div className="form-page-container">
      <div className="form-tabs">
        <div className={`tab-indicator ${activeTab === "Basic" ? "active" : ""}`}>
          Basic
        </div>
        <div className={`tab-indicator ${activeTab === "Amenities" ? "active" : ""}`}>
          Amenities
        </div>
        <div className={`tab-indicator ${activeTab === "Location" ? "active" : ""}`}>
          Location and Pricing
        </div>
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
  )
}

export default FormPage