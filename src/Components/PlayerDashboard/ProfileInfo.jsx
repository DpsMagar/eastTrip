"use client"

import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./info.css"

export default function ProfileInfo({ profile }) {
  const [userData, setUserData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    gender: "",
    dateOfBirth: null,
    profileImage: "/placeholder.svg"
  })
  const [loading, setLoading] = useState(true)
  const userId= sessionStorage.getItem('userId');
 useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/id/${userId}`)
        if (!response.ok) throw new Error("Failed to fetch user data")
        const data = await response.json()
      console.log(data);
      
        
        setUserData(data)
        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          country: data.country || "",
          gender: data.gender || "",
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          profileImage: data.profileImage || "/placeholder.svg"
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
        showNotification("Failed to load user data", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])
  const [errors, setErrors] = useState({})
  const [previewImage, setPreviewImage] = useState(profile.ProfileImage || "/placeholder.svg?height=100&width=100")
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })

  const minDate = new Date()
  minDate.setFullYear(minDate.getFullYear() - 16)

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "radio") {
      if (checked) {
        setFormData({
          ...formData,
          [name]: value,
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.match('image.*')) {
        setErrors(prev => ({
          ...prev,
          ProfileImage: "Please select an image file"
        }))
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          ProfileImage: "Image size should be less than 2MB"
        }))
        return
      }

      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setFormData({
        ...formData,
        ProfileImage: imageUrl,
      })
    }
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      DateOfBirth: date,
    })

    if (errors.DateOfBirth) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.DateOfBirth
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const requiredFields = [
      'Firstname', 'Lastname', 'Email', 'Phone', 
      'Address', 'country', 'gender'
    ]

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${field} is required`
      }
    })

    if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "Please enter a valid email address"
    }

    if (formData.Phone && !/^[0-9]{10,15}$/.test(formData.Phone)) {
      newErrors.Phone = "Please enter a valid phone number"
    }

    if (!formData.DateOfBirth) {
      newErrors.DateOfBirth = "Date of Birth is required"
    } else if (formData.DateOfBirth > minDate) {
      newErrors.DateOfBirth = "You must be at least 16 years old"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        showNotification("Profile updated successfully!", "success")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      showNotification(error.message || "Failed to update profile", "error")
    }
  }

  return (
    <div className="profile-info-container">
  {notification.show && (
    <div className={`${notification.type}-popup`}>
      {notification.message}
    </div>
  )}

  <h2 className="section-title">Profile</h2>

  <form onSubmit={handleSubmit}>
    {/* Profile Image Upload */}
    <div className="profile-image-upload">
      <div className="image-preview">
        <img src={previewImage || "/placeholder.svg"} alt="Profile Preview" className="preview-img" />
      </div>
      <div className="image-upload-controls">
        <label htmlFor="profile-image" className="upload-btn">
          Change Profile Picture
        </label>
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
        {errors.ProfileImage && <span className="error-message">{errors.ProfileImage}</span>}
        <p className="upload-hint">Recommended size: 200x200 pixels (max 2MB)</p>
      </div>
    </div>

    {/* Full Name */}
    <div className="form-group full-width">
      <label htmlFor="fullname">Full Name</label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        className={errors.fullname ? "error" : ""}
      />
      {errors.fullname && <span className="error-message">{errors.fullname}</span>}
    </div>

    {/* Email and Phone */}
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="Email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className={errors.Email ? "error" : ""}
        />
        {errors.Email && <span className="error-message">{errors.Email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="Phone">Phone</label>
        <input
          type="tel"
          id="Phone"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          className={errors.Phone ? "error" : ""}
        />
        {errors.Phone && <span className="error-message">{errors.Phone}</span>}
      </div>
    </div>

    {/* Address */}
    <div className="form-group full-width">
      <label htmlFor="Address">Address</label>
      <input
        type="text"
        id="Address"
        name="Address"
        value={formData.Address}
        onChange={handleChange}
        className={errors.Address ? "error" : ""}
      />
      {errors.Address && <span className="error-message">{errors.Address}</span>}
    </div>

    {/* Country */}
    <div className="form-group full-width">
      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className={errors.country ? "error" : ""}
      />
      {errors.country && <span className="error-message">{errors.country}</span>}
    </div>

    {/* Gender and DOB */}
    <div className="form-row">
      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <span className="radio-text">Male</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            <span className="radio-text">Female</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
            />
            <span className="radio-text">Other</span>
          </label>
        </div>
        {errors.gender && <span className="error-message">{errors.gender}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="DateOfBirth">Date of Birth</label>
        <DatePicker
          id="DateOfBirth"
          selected={formData.DateOfBirth}
          onChange={handleDateChange}
          maxDate={minDate}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          dropdownMode="select"
          placeholderText="DD/MM/YYYY"
          className={errors.DateOfBirth ? "error" : ""}
        />
        {errors.DateOfBirth && <span className="error-message">{errors.DateOfBirth}</span>}
      </div>
    </div>

    {/* Actions */}
    <div className="form-actions">
      <button type="button" className="btn-cancel">
        Cancel
      </button>
      <button type="submit" className="btn-save">
        Save
      </button>
    </div>
  </form>
</div>

  )
}