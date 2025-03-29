import React, { useState } from "react";

export const HotelForm = () => {
  const [checkIn, setCheckIn] = useState("10 May'23");
  const [checkOut, setCheckOut] = useState("11 May'23");
  const [guests, setGuests] = useState("1 Room, 2 Adults");
  const [showCheckInDropdown, setShowCheckInDropdown] = useState(false);
  const [showCheckOutDropdown, setShowCheckOutDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const checkInOptions = ["10 May'23", "11 May'23", "12 May'23"];
  const checkOutOptions = ["11 May'23", "12 May'23", "13 May'23"];
  const guestOptions = [
    "1 Room, 2 Adults",
    "2 Rooms, 4 Adults",
    "3 Rooms, 6 Adults",
  ];

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

        {/* Check-in */}
        <div className="relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => setShowCheckInDropdown(!showCheckInDropdown)}>
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Check-in <span>▼</span>
          </label>
          <h3 className="text-lg font-bold">{checkIn}</h3>
          {showCheckInDropdown && (
            <div className="absolute bg-white shadow-lg p-2 rounded-md mt-1">
              {checkInOptions.map((date) => (
                <p key={date} className="cursor-pointer p-1 hover:bg-gray-200" onClick={() => {setCheckIn(date); setShowCheckInDropdown(false);}}>
                  {date}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Check-out */}
        <div className="relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => setShowCheckOutDropdown(!showCheckOutDropdown)}>
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Check-out <span>▼</span>
          </label>
          <h3 className="text-lg font-bold">{checkOut}</h3>
          {showCheckOutDropdown && (
            <div className="absolute bg-white shadow-lg p-2 rounded-md mt-1">
              {checkOutOptions.map((date) => (
                <p key={date} className="cursor-pointer p-1 hover:bg-gray-200" onClick={() => {setCheckOut(date); setShowCheckOutDropdown(false);}}>
                  {date}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Rooms & Guests */}
        <div className="relative bg-gray-50 p-3 rounded-lg md:col-span-2 cursor-pointer" onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}>
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Rooms & Guests <span>▼</span>
          </label>
          <h3 className="text-lg font-bold">{guests}</h3>
          {showGuestsDropdown && (
            <div className="absolute bg-white shadow-lg p-2 rounded-md mt-1">
              {guestOptions.map((option) => (
                <p key={option} className="cursor-pointer p-1 hover:bg-gray-200" onClick={() => {setGuests(option); setShowGuestsDropdown(false);}}>
                  {option}
                </p>
              ))}
            </div>
          )}
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
