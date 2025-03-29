import React, { useState, useEffect } from "react";

export const HotelForm = () => {
  // Set the current date and check-out date (current date + 2 days) as default values
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  useEffect(() => {
    // Get current date and format it as YYYY-MM-DD
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];

    // Get check-out date (current date + 2 days)
    const checkOutDate = new Date(currentDate);
    checkOutDate.setDate(currentDate.getDate() + 2);
    const checkOutDateString = checkOutDate.toISOString().split('T')[0];

    setCheckIn(currentDateString);
    setCheckOut(checkOutDateString);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
          <label className="text-xs text-gray-500">City, Area or Property</label>
          <div>
            <h3 className="text-lg font-bold">Mumbai</h3>
            <p className="text-xs text-gray-500">India</p>
          </div>
        </div>

        {/* Check-in with input type="date" */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="text-xs text-gray-500">Check-in</label>
          <input
            type="date"
            value={checkIn || ""}
            onChange={(e) => setCheckIn(e.target.value)}
            className="text-lg font-bold bg-transparent w-full outline-none"
          />
        </div>

        {/* Check-out with input type="date" */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="text-xs text-gray-500">Check-out</label>
          <input
            type="date"
            value={checkOut || ""}
            onChange={(e) => setCheckOut(e.target.value)}
            className="text-lg font-bold bg-transparent w-full outline-none"
          />
        </div>

        {/* Rooms & Guests */}
        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
          <label className="text-xs text-gray-500">Rooms & Guests</label>
          <div>
            <h3 className="text-lg font-bold">1 Room, 2 Adults</h3>
            <p className="text-xs text-gray-500">0 Children</p>
          </div>
        </div>
      </div>

      {/* Price per night */}
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Price per night</p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
            ₹0 - ₹1500
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
            ₹1500 - ₹2500
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
            ₹2500 - ₹5000
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
            ₹5000+
          </button>
        </div>
      </div>
    </div>
  );
};
