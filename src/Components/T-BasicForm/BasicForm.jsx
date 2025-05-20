// BasicForm.js
import React, { useEffect } from "react";
import "./Basic.css";
import HotelImage from "../../Assest/Hotel.png";
import HomestayImage from "../../Assest/homestay.png";
import { useForm } from "../../context/FormContext";
import { useDispatch } from "react-redux";
import { setName, setRating, setImageUrl, setTypeOfProperty } from "../../features/slice/propertySlice";
import ImageUpload from "../../ImageUpload";

    
const BasicForm = () => {
  const dispatch = useDispatch();

  const { formData, updateFormData, errors } = useForm();
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 1980; year <= currentYear; year++) {
    years.push(year);
  }

  const validateBasicForm = (basicData) => {
  const newErrors = {};

  if (!basicData.stayType) {
    newErrors.stayType = "Please select a property type.";
  }

  if (!basicData.propertyName.trim()) {
    newErrors.propertyName = "Property name is required.";
  }

  if (!basicData.rating || isNaN(basicData.rating) || basicData.rating < 1 || basicData.rating > 5) {
    newErrors.rating = "Enter a valid star rating between 1 and 5.";
  }

  if (!basicData.builtYear) {
    newErrors.builtYear = "Select the built year.";
  }

  if (!basicData.startedYear) {
    newErrors.startedYear = "Select the year bookings started.";
  }

  if (!basicData.email || !/^\S+@\S+\.\S+$/.test(basicData.email)) {
    newErrors.email = "Enter a valid email.";
  }

  if (!basicData.mobile || !/^[0-9]{10}$/.test(basicData.mobile)) {
    newErrors.mobile = "Enter a valid 10-digit mobile number.";
  }

  return newErrors;
};

  
  
 useEffect(() => {
  dispatch(setName(formData.basic.propertyName));
  dispatch(setRating(formData.basic.rating));
  // dispatch(setImageUrl(formData.basic.imageUrl));
}, [formData.basic.propertyName, formData.basic.rating, dispatch]);

  return (

    <div className="basic-form-box">
      <h3 className="section-title">Basic Information</h3>


      <div className="hotel-homestay">
        <label
          className={`option-box ${
            formData.basic.stayType === "Hotel" ? "selected" : ""
          }`}
        >
          <img src={HotelImage || "/placeholder.svg"} alt="Hotel Icon" />
          <input
            type="radio"
            name="stayType"
            value="Hotel"
            checked={formData.basic.stayType === "Hotel"}
            onChange={(e) => {updateFormData("basic", "stayType", e.target.value);
            dispatch(setTypeOfProperty(1))}}
          />
        </label>

        <label
          className={`option-box ${
            formData.basic.stayType === "Homestay" ? "selected" : ""
          }`}
        >
          <img src={HomestayImage || "/placeholder.svg"} alt="Homestay Icon" />
          <input
            type="radio"
            name="stayType"
            value="Homestay"
            checked={formData.basic.stayType === "Homestay"}
            onChange={(e) => {updateFormData("basic", "stayType", e.target.value);
            dispatch(setTypeOfProperty(2))}}
          />
        </label>
      </div>
      {errors.basic?.stayType && (
        <p className="error-message">{errors.basic.stayType}</p>
      )}

      <div className="property-form">
        <div className="form-group">
          <label>Name of the Property</label>
          <input
            type="text"
            placeholder="Enter Property name"
            value={formData.basic.propertyName}
            onChange={(e) =>
              updateFormData("basic", "propertyName", e.target.value)
            }
          />
          {errors.basic?.propertyName && (
            <p className="error-message">{errors.basic.propertyName}</p>
          )}
        </div>

        <div className="form-group">
          <label>Hotel Star Rating</label>
          <input
            type="text"
            placeholder="Enter rating here"
            value={formData.basic.rating}
            onChange={(e) => updateFormData("basic", "rating", e.target.value)}
          />
          {errors.basic?.rating && (
            <p className="error-message">{errors.basic.rating}</p>
          )}
        </div>

        <div className="form-group">
          <label>When was the Property built</label>
          <div className="select-wrapper">
            <select
              value={formData.basic.builtYear}
              onChange={(e) =>
                updateFormData("basic", "builtYear", e.target.value)
              }
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {errors.basic?.builtYear && (
            <p className="error-message">{errors.basic.builtYear}</p>
          )}
        </div>

        <div className="form-group">
          <label>book Started form</label>
          <div className="select-wrapper">
            <select
              value={formData.basic.startedYear}
              onChange={(e) =>
                updateFormData("basic", "startedYear", e.target.value)
              }
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {errors.basic?.startedYear && (
            <p className="error-message">{errors.basic.startedYear}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={formData.basic.email}
            onChange={(e) => updateFormData("basic", "email", e.target.value)}
          />
          {errors.basic?.email && (
            <p className="error-message">{errors.basic.email}</p>
          )}
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="+977 9784237478"
            value={formData.basic.mobile}
            onChange={(e) => updateFormData("basic", "mobile", e.target.value)}
          />
          {errors.basic?.mobile && (
            <p className="error-message">{errors.basic.mobile}</p>
          )}
        </div>

        <ImageUpload updateFormData={updateFormData}/>
      </div>
    </div>
  );
};

export default BasicForm;