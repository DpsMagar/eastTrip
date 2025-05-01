import React, { useState } from 'react';
import './Photo.css';

const PhotoForm = () => {
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [tags, setTags] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    setPreviewImage(files[0]);
  };

  return (
    <div className="photo-section">
      <h3 className="section-title">Property Photos</h3>
      <p className="section-subtitle">Please Upload the photos of your property showing rooms facilities, building etc</p>
      
      <div className="upload-area">
        <h4>Upload Photos</h4>

        {images.length === 0 ? (
          <div className="drop-box">
            <label htmlFor="photo-upload" className="upload-label">
              <div className="upload-icon">☁️</div>
              <p>Drag and drop the photos<br />Or <span className="click-text">Click here</span> to upload</p>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              hidden
            />
          </div>
        ) : (
          <div className="uploaded-container">
            <div className="uploaded-thumbnails">
              <h5>Uploaded images ({images.length})</h5>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt={`upload-${i}`}
                  className="thumbnail"
                  onClick={() => setPreviewImage(img)}
                />
              ))}
            </div>

            <div className="preview-section">
              <div className="preview-header">
                <h5>Image Preview</h5>
                <label htmlFor="photo-upload" className="upload-more">Upload More</label>
              </div>
              {previewImage && (
                <div className="preview-box">
                  <img src={URL.createObjectURL(previewImage)} alt="Preview" className="preview-img" />
                  <p className="tag-instruction">Write up to 2 tags to each photo</p>
                  <input
                    type="text"
                    className="tag-input"
                    placeholder="Write here..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoForm;
