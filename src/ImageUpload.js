import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setImageUrl } from "./features/slice/propertySlice";

const ImageUpload = ({ updateFormData }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrll] = useState(null);
  
    const dispatch= useDispatch();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "properties"); // Replace with your actual Cloudinary upload preset

      try {
        const response = await fetch(
         "https://api.cloudinary.com/v1_1/dqtdcyoym/image/upload", 
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        const uploadedImageUrl = data.secure_url;

        // Update the image URL in form data and state
        updateFormData("basic", "imageUrl", uploadedImageUrl);
        setImageUrll(uploadedImageUrl);
        dispatch(setImageUrl(uploadedImageUrl));
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <label htmlFor="image-upload">Upload Property Image</label>
      <br></br>
      <br></br>
      <input
        type="file"
        id="image-upload"
        name="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={loading}
      />
      {loading && <p>Uploading...</p>}
      {imageUrl && (
        <div className="image-preview">
          <img src={imageUrl} alt="Uploaded Property" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
