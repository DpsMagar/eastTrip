import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

export const HomestayForm = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* Location */}
        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
          <label className="text-xs text-gray-500">Location</label>
          <div>
            <h3 className="text-lg font-bold">Goa</h3>
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

        {/* Guests */}
        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Guests
            <span>▼</span>
          </label>
          <div>
            <h3 className="text-lg font-bold">2 Adults</h3>
            <p className="text-xs text-gray-500">0 Children</p>
          </div>
        </div>
      </div>

      {/* Property type */}
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Property type</p>
        <div className="flex space-x-2">
          <Button className="rounded-full">Apartment</Button>
          <Button className="rounded-full">Villa</Button>
          <Button className="rounded-full">Cottage</Button>
          <Button className="rounded-full">Bungalow</Button>
        </div>
      </div>
    </div>
  );
};
