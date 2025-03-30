import React, { useState } from "react";

const cabinClasses = ["Economy", "Premium Economy", "Business", "First Class"];
const fareTypes = ["Regular", "Armed Forces", "Student", "Senior Citizen", "Doctors & Nurses", "Double Seat"];

const FlightForm: React.FC = () => {
  const [travellers, setTravellers] = useState<{ adults: number; children: number; infants: number }>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [cabinClass, setCabinClass] = useState<string>("Economy");
  const [showTravellerDropdown, setShowTravellerDropdown] = useState<boolean>(false);
  const [fareType, setFareType] = useState<string>("Regular");

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Travellers & Cabin Class */}
      <div className="relative bg-gray-50 p-3 rounded-lg w-72 cursor-pointer" onClick={() => setShowTravellerDropdown(!showTravellerDropdown)}>
        <label className="text-xs text-gray-500 flex justify-between">
          Travellers & Class
          <span>▼</span>
        </label>
        <h3 className="text-lg font-bold">
          {travellers.adults + travellers.children + travellers.infants} Travellers
        </h3>
        <p className="text-xs text-gray-500 capitalize">{cabinClass}</p>

        {showTravellerDropdown && (
          <div className="absolute left-0 mt-2 w-80 bg-white border rounded-lg p-4 shadow-lg z-20">
            {/* Travellers Selection */}
            {["adults", "children", "infants"].map((type) => (
              <div key={type} className="flex justify-between items-center mb-2">
                <div className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div className="flex gap-2 items-center">
                  <button
                    className="px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => setTravellers((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))}
                  >
                    -
                  </button>
                  <span>{travellers[type as keyof typeof travellers]}</span>
                  <button
                    className="px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => setTravellers((prev) => ({ ...prev, [type]: prev[type] + 1 }))}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Cabin Class Selection */}
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Cabin Class:</p>
              <div className="flex flex-wrap gap-2">
                {cabinClasses.map((type) => (
                  <label key={type} className="flex items-center gap-1 border rounded-full px-3 py-1 cursor-pointer">
                    <input
                      type="radio"
                      name="cabinClass"
                      className="h-3 w-3"
                      checked={cabinClass === type}
                      onChange={() => setCabinClass(type)}
                    />
                    <span className="text-xs">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fare Type Selection */}
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Select a Fare Type:</p>
        <div className="flex flex-wrap gap-2">
          {fareTypes.map((type) => (
            <label key={type} className="flex items-center gap-1 border rounded-full px-3 py-1 cursor-pointer">
              <input
                type="radio"
                name="fareType"
                className="h-3 w-3"
                checked={fareType === type}
                onChange={() => setFareType(type)}
              />
              <span className="text-xs">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightForm;
