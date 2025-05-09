import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setExtraInfo, setSelectedHotelFeatures, setSelectedRoomFeatures } from '../../features/slice/propertySlice';

const hotelFeatures = [
  { id: 28, label: 'Traditional Nepali Meals' },
  { id: 4, label: 'Local Cultural Experiences' },
  { id: 5, label: 'Guided Village Tours' },
  { id: 6, label: 'Hiking & Trekking Assistance' },
  { id: 10, label: 'Eco-friendly Accommodation' },
  { id: 9, label: 'Organic Farm-to-Table Meals' },
  { id: 12, label: 'Yoga & Meditation Retreats' },
  { id: 15, label: 'Mountain View Rooms' },
  { id: 20, label: 'Nepali Folk Music & Dance Shows' },
  { id: 24, label: 'Sunrise & Sunset Viewing Points' },
  { id: 28, label: 'Traditional Thakali & Newari Cuisine' },
  { id: 34, label: 'Homestay Cooking Classes' },
  { id: 11, label: 'River Rafting Packages' },
  { id: 23, label: 'Ayurvedic Spa & Wellness' },
  { id: 35, label: 'Tibetan & Buddhist Cultural Stay' },
];

const roomFeatures = [
  { id: 3, label: 'Mountain View Suite' },
  { id: 1, label: 'Traditional Wooden Cottage' },
  { id: 11, label: 'Treehouse Stay' },
  { id: 8, label: 'Eco-Friendly Mud House' },
  { id: 13, label: 'Riverfront Bungalow' },
  { id: 14, label: 'Newari Heritage Room' },
  { id: 15, label: 'Hilltop Panoramic Room' },
  { id: 16, label: 'Stone Cottage with Fireplace' },
  { id: 18, label: 'Private Suite with Hot Tub' },
  { id: 21, label: 'Himalayan Panorama Room' },
  { id: 19, label: 'Glamping Tent' },
  { id: 12, label: 'Traditional Tharu Hut' },
  { id: 10, label: 'Luxury Tent with Balcony' },
  { id: 32, label: 'Glass-Walled Sky Room' },
  { id: 29, label: 'Bamboo & Clay Cottage' },
];

const AmenitiesForm = () => {
  const dispatch = useDispatch();

  const [selectedHotelFeatures, setSelectedHotelFeaturesState] = useState([]);
  const [selectedRoomFeatures, setSelectedRoomFeaturesState] = useState([]);
  const [extraInfo, setExtraInfoState] = useState('');

  const handleHotelFeatureChange = (feature) => {
    const newSelection = selectedHotelFeatures.includes(feature)
      ? selectedHotelFeatures.filter((f) => f !== feature)
      : [...selectedHotelFeatures, feature];

    setSelectedHotelFeaturesState(newSelection);
    dispatch(setSelectedHotelFeatures(newSelection));
  };

  const handleRoomFeatureChange = (feature) => {
    const newSelection = selectedRoomFeatures.includes(feature)
      ? selectedRoomFeatures.filter((f) => f !== feature)
      : [...selectedRoomFeatures, feature];

    setSelectedRoomFeaturesState(newSelection);
    dispatch(setSelectedRoomFeatures(newSelection));
  };

  const handleExtraInfoChange = (e) => {
    const value = e.target.value;
    setExtraInfoState(value);
    dispatch(setExtraInfo(value));
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '960px',
        margin: '2rem auto',
        backgroundColor: '#ffffff',
        boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
        borderRadius: '16px',
        fontFamily: "'Segoe UI', sans-serif",
        lineHeight: 1.6,
        color: '#1f2937',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Amenities & Features</h2>

      <AmenitiesSection
        title="Hotel Features"
        options={hotelFeatures}
        selected={selectedHotelFeatures}
        onChange={handleHotelFeatureChange}
      />

      <AmenitiesSection
        title="Room Features"
        options={roomFeatures}
        selected={selectedRoomFeatures}
        onChange={handleRoomFeatureChange}
      />

      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="extraInfo" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Extra Information
        </label>
        <textarea
          id="extraInfo"
          value={extraInfo}
          onChange={handleExtraInfoChange}
          rows="4"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '1rem',
          }}
        />
      </div>
    </div>
  );
};

const AmenitiesSection = ({ title, options, selected, onChange }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.75rem' }}>{title}</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      {options.map((option) => (
        <label
          key={option.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: selected.includes(option.label) ? '#dbeafe' : '#f9fafb',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            fontWeight: selected.includes(option.label) ? '600' : '400',
          }}
        >
          <input
            type="checkbox"
            checked={selected.includes(option.label)}
            onChange={() => onChange(option.label)}
            style={{ marginRight: '0.5rem' }}
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

export default AmenitiesForm;
