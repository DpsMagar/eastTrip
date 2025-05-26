"use client"

import { useState } from "react"
import "./info.css"

export default function ProfileInfo({ profile }) {
  const [formData, setFormData] = useState({
    ProfileImage: profile.ProfileImage || "",
    Firstname: profile.Firstname,
    Lastname: profile.Lastname,
    Email: profile.Email,
    Phone: profile.Phone,
    Address: profile.Address,
    country: profile.country,
    district: profile.district,
    gender: profile.gender,
    martialStatus: profile.martialStatus,
    DateOfBirth: profile.DateOfBirth,
    "passport no": profile["passport no"],
    "Issuing place": profile["Issuing place"],
    "expiry date": profile["expiry date"],
  })

  const [previewImage, setPreviewImage] = useState(profile.ProfileImage || "/placeholder.svg?height=100&width=100")

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
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)

      // In a real app, you would upload the image to your server
      // and get back a URL to store in the profile
      setFormData({
        ...formData,
        ProfileImage: imageUrl, // In a real app, this would be the URL from your server
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    alert("Profile updated successfully!")
  }

  return (
    <div className="profile-info-container">
      <h2 className="section-title">Profile</h2>

      <form onSubmit={handleSubmit}>


        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Firstname">First Name</label>
            <input type="text" id="Firstname" name="Firstname" value={formData.Firstname} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="Lastname">Last Name</label>
            <input type="text" id="Lastname" name="Lastname" value={formData.Lastname} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="Phone">Phone</label>
            <input type="tel" id="Phone" name="Phone" value={formData.Phone} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="Address">Address</label>
          <input type="text" id="Address" name="Address" value={formData.Address} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="district">District</label>
            <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} />
          </div>
        </div>

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
                <span className="radio-text">Others</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="DateOfBirth">Date of Birth</label>
            <input
              type="text"
              id="DateOfBirth"
              name="DateOfBirth"
              placeholder="DD/MM/YYYY"
              value={formData.DateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>


      </form>
    </div>
  )
}

