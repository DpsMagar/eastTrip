import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const PropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    builtYear: '',
    bookingSince: '',
    email: '',
    mobile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const goToAmenities = () => {
    navigate("/PropertyAmenities") 
  }

  return (
    <div className="min-h-screen bg-[#fcf6f4] font-sans p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <div className="flex">
          <div className="w-1/6 bg-[#ece7e2] p-4 text-center">
            <div className="text-2xl">🏨</div>
            <p className="text-sm font-medium mt-2">My Properties</p>
          </div>
          <div className="w-5/6 p-6">
            <div className="flex mb-4 gap-2">
              <button className="bg-[#fde7d5] px-4 py-2 rounded-md text-sm font-semibold">Basic</button>
              <button className="bg-[#f47e5f] text-white px-4 py-2 rounded-md text-sm font-semibold" onClick={goToAmenities}>Amenities</button>
              <button className="bg-[#f47e5f] text-white px-4 py-2 rounded-md text-sm font-semibold">Photos and Videos</button>
            </div>

            <h2 className="text-xl font-semibold mb-2">Basic Info</h2>

            <div className="bg-[#fff8f6] p-4 rounded-md">
              <h3 className="font-semibold text-md mb-3">Property details</h3>
              <p className="text-sm text-gray-600 mb-4">Update Your Property details here</p>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name of the Property</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Property name"
                  className="w-full border p-2 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Hotel Star Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                >
                  <option>Select rating here</option>
                  <option>1 Star</option>
                  <option>2 Stars</option>
                  <option>3 Stars</option>
                  <option>4 Stars</option>
                  <option>5 Stars</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">When was the Property built</label>
                <select
                  name="builtYear"
                  value={formData.builtYear}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                >
                  <option>Select a year</option>
                  {Array.from({ length: 50 }, (_, i) => 2025 - i).map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Accepting Booking Since</label>
                <select
                  name="bookingSince"
                  value={formData.bookingSince}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                >
                  <option>Select a year</option>
                  {Array.from({ length: 50 }, (_, i) => 2025 - i).map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>

              <h3 className="font-semibold text-md mb-2">Contact details</h3>
              <p className="text-sm text-gray-600 mb-4">These details will be shared with the guests</p>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full border p-2 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Mobile Number</label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md">+977</span>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-r-md"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button className="bg-white border border-black px-6 py-2 rounded-md font-semibold">Back</button>
                <button className="bg-[#e76f51] text-white px-6 py-2 rounded-md font-semibold">Continue</button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;