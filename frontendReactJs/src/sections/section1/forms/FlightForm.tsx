import React, { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

interface RadioGroupProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ children, className, ...props }) => (
  <div className={`flex flex-wrap gap-2 ${className}`} {...props}>
    {children}
  </div>
);

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ id, className, ...props }) => (
  <input
    type="radio"
    id={id}
    className={`h-3 w-3 ${className}`}
    {...props}
  />
);

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className, ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`text-xs ${className}`}
    {...props}
  >
    {children}
  </label>
);

export const FlightForm: React.FC = () => {
  const fareTypes = [
    { id: "regular", label: "Regular" },
    { id: "armed", label: "Armed Forces" },
    { id: "student", label: "Student" },
    { id: "senior", label: "Senior Citizen" },
    { id: "doctor", label: "Doctors & Nurses" },
    { id: "double", label: "Double Seat" },
  ];

  const [selectedFareType, setSelectedFareType] = useState<string>("");

  return (
    <div>
      {/* Trip type selection */}
      <div className="flex space-x-4 mb-4">
        <Button className="rounded-full bg-indigo-50 text-indigo-600">
          One Way
        </Button>
        <Button className="rounded-full">Round Trip</Button>
        <Button className="rounded-full">Multi City</Button>
      </div>

      {/* Search form */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* From */}
        <div className="bg-gray-50 p-3 rounded-lg relative">
          <label className="text-xs text-gray-500">From</label>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Delhi</h3>
              <p className="text-xs text-gray-500">DEL, Indira Airport India</p>
            </div>
            <Button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md z-10 p-1">
              ⇄
            </Button>
          </div>
        </div>

        {/* To */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="text-xs text-gray-500">To</label>
          <div>
            <h3 className="text-lg font-bold">Mumbai</h3>
            <p className="text-xs text-gray-500">
              BOM, Chhatrapati Shivaji International
            </p>
          </div>
        </div>

        {/* Departure */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Departure
            <span>▼</span>
          </label>
          <div>
            <h3 className="text-lg font-bold">10 May'23</h3>
            <p className="text-xs text-gray-500">Wednesday</p>
          </div>
        </div>

        {/* Return */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Return
            <span>▼</span>
          </label>
          <div>
            <p className="text-xs text-gray-400">
              Tap to add a return date for discounts
            </p>
          </div>
        </div>

        {/* Travelers & Class */}
        <div className="bg-gray-50 p-3 rounded-lg md:col-span-1">
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Travellers & Class
            <span>▼</span>
          </label>
          <div>
            <h3 className="text-lg font-bold">1 Traveller</h3>
            <p className="text-xs text-gray-500">Economy/Premium Economy</p>
          </div>
        </div>
      </div>

      {/* Fare types */}
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Select a Fare Type:</p>
        <RadioGroup  className={""}>
          {fareTypes.map((type) => (
            <div
              key={type.id}
              className="flex items-center space-x-1 border rounded-full px-3 py-1"
            >
              <RadioGroupItem
                value={type.id}
                id={type.id}
                checked={selectedFareType === type.id}
                onChange={() => setSelectedFareType(type.id)}
              />
              <Label htmlFor={type.id}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};