import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "outline" | "solid"; 
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = "solid", ...props }) => {
  const baseStyle = "px-4 py-2 rounded";
  const variantStyle =
    variant === "outline"
      ? "border-2 border-gray-500 text-gray-500 bg-white"
      : "bg-indigo-600 text-white"; 

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const HotelForm: React.FC = () => {
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
          <Button variant="outline" className="rounded-full">₹0 - ₹1500</Button>
          <Button variant="outline" className="rounded-full">₹1500 - ₹2500</Button>
          <Button variant="outline" className="rounded-full">₹2500 - ₹5000</Button>
          <Button variant="outline" className="rounded-full">₹5000+</Button>
        </div>
      </div>
    </div>
  );
};
