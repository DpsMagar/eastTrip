import React from "react";

export const HotelForm = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* City, Area or Property */}
        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
          <label className="text-xs text-gray-500">City, Area or Property</label>
          <div>
            <h3 className="text-lg font-bold">Mumbai</h3>
            <p className="text-xs text-gray-500">India</p>
          </div>
        </div>

        {/* Check-in */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Check-in
            <span>▼</span>
          </label>
          <div>
            <h3 className="text-lg font-bold">10 May'23</h3>
            <p className="text-xs text-gray-500">Wednesday</p>
          </div>
        </div>

        {/* Check-out */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Check-out
            <span>▼</span>
          </label>
          <div>
            <h3 className="text-lg font-bold">11 May'23</h3>
            <p className="text-xs text-gray-500">Thursday</p>
          </div>
        </div>

        {/* Rooms & Guests */}
        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Rooms & Guests
            <span>▼</span>
          </label>
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
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">₹0 - ₹1500</button>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">₹1500 - ₹2500</button>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">₹2500 - ₹5000</button>
          <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">₹5000+</button>
        </div>
      </div>
    </div>
  );
};
