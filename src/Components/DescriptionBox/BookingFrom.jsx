"use client";

import { useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import "./booking-form.css";

const BookingForm = ({ hotelInfo }) => {
  // ❗ Always call hooks at the top level
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  // If hotelInfo is not ready, show loading
  if (!hotelInfo || hotelInfo.price === undefined) {
    return <div>Loading hotel information...</div>;
  }

  const basePrice = hotelInfo.price;
  const RewardPoint = hotelInfo.rewardPoints ?? 0;
  const taxesAndFees = Math.round(basePrice * 0.16);
  const totalPrice = basePrice + taxesAndFees;
  const perNightPrice = Math.round(totalPrice / 3); // assuming 3 nights

  const handleIncrement = (setter, value, max = 10) => {
    if (value < max) setter(value + 1);
  };

  const handleDecrement = (setter, value, min = 0) => {
    if (value > min) setter(value - 1);
  };

  const getGuestSummary = () => {
    let summary = `${adults} Adult${adults !== 1 ? "s" : ""}`;
    if (children > 0) {
      summary += `, ${children} Child${children !== 1 ? "ren" : ""}`;
    }
    summary += ` · ${rooms} Room${rooms !== 1 ? "s" : ""}`;
    return summary;
  };

  return (
    <div className="booking-form">
      {/* Your existing JSX remains the same here */}
      {/* ... */}
    </div>
  );
};

export default BookingForm;
