import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const PropertyAmenities = () => {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState({});

  const toggleAmenity = (name, value) => {
    setAmenities(prev => ({ ...prev, [name]: value }));
  };

  const goToBasic = () => { 
    navigate("/propertyform")
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
              <button className="bg-[#fde7d5] px-4 py-2 rounded-md text-sm font-semibold" onClick={goToBasic}>Basic</button>
              <button className="bg-[#fde7d5] text-[#f47e5f] px-4 py-2 rounded-md text-sm font-semibold">Amenities</button>
              <button className="bg-[#fde7d5] text-[#f47e5f] px-4 py-2 rounded-md text-sm font-semibold">Photos and Videos</button>
            </div>

            <h2 className="text-xl font-semibold mb-2">Amenities</h2>

            <div className="bg-[#fff8f6] p-4 rounded-md">
              <h3 className="font-semibold text-md mb-3">Property Amenities</h3>
              <p className="text-sm text-gray-600 mb-4">Please select all the amenities available at your property</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Air Conditioning', 'Laundry', 'Newspaper', 'Parking', 'Room Service', 'Lounge', 'Restaurant', 'Fire Extinguishers',
                  'CCTV', 'Childcare Service', 'Pet Service', 'Security Guard', 'Health Service', 'Swimming Pool', 'TV', 'Spa'
                ].map((amenity) => (
                  <div key={amenity} className="flex justify-between items-center border-b py-2">
                    <span className="text-sm font-medium">{amenity}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => toggleAmenity(amenity, 'Yes')}
                        className={`px-3 py-1 rounded-md border ${amenities[amenity] === 'Yes' ? 'bg-[#f47e5f] text-white' : 'bg-white'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => toggleAmenity(amenity, 'No')}
                        className={`px-3 py-1 rounded-md border ${amenities[amenity] === 'No' ? 'bg-[#f47e5f] text-white' : 'bg-white'}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button className="bg-white border border-black px-6 py-2 rounded-md font-semibold">Back</button>
                <button className="bg-[#e76f51] text-white px-6 py-2 rounded-md font-semibold">Save and Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAmenities;