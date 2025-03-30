import React, { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick, ...props }) => (
  <button
    className={`px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-indigo-200 ${className}`}
    onClick={onClick}
    {...props}
  >
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
  <input type="radio" id={id} className={`h-3 w-3 ${className}`} {...props} />
);

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className, ...props }) => (
  <label htmlFor={htmlFor} className={`text-xs ${className}`} {...props}>
    {children}
  </label>
);

interface Location {
  city: string;
  code: string;
  airport: string;
}

interface LocationInputProps {
  label: string;
  locations: Location[];
  selectedLocation: Location;
  onSelect: (location: Location) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  locations,
  selectedLocation,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = locations.filter((location) =>
    `${location.city} ${location.code} ${location.airport}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-3 rounded-lg relative transition duration-200 ease-in-out hover:bg-gray-100">
      <label className="text-xs text-gray-500">{label}</label>
      <div
        className="cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{selectedLocation.city}</h3>
            <p className="text-xs text-gray-500">
              {selectedLocation.code}, {selectedLocation.airport}
            </p>
          </div>
          <span className="text-gray-500">▼</span>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search city or airport"
              className="w-full p-2 mb-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredLocations.map((location) => (
              <div
                key={location.code}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                onClick={() => {
                  onSelect(location);
                  setIsDropdownOpen(false);
                }}
              >
                <div className="font-medium">{location.city}</div>
                <div className="text-xs text-gray-500">
                  {location.code} - {location.airport}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const FlightForm: React.FC = () => {
  const fareTypes = [
    { id: "regular", label: "Regular" },
    { id: "armed", label: "Armed Forces" },
    { id: "student", label: "Student" },
    { id: "senior", label: "Senior Citizen" },
    { id: "doctor", label: "Doctors & Nurses" },
    { id: "double", label: "Double Seat" },
  ];

  const locations: Location[] = [
    {
      city: "Delhi",
      code: "DEL",
      airport: "Indira Gandhi International Airport",
    },
    {
      city: "Mumbai",
      code: "BOM",
      airport: "Chhatrapati Shivaji Maharaj International Airport",
    },
    {
      city: "Bangalore",
      code: "BLR",
      airport: "Kempegowda International Airport",
    },
    {
      city: "Chennai",
      code: "MAA",
      airport: "Chennai International Airport",
    },
    {
      city: "Kolkata",
      code: "CCU",
      airport: "Netaji Subhas Chandra Bose International Airport",
    },
    {
      city: "Hyderabad",
      code: "HYD",
      airport: "Rajiv Gandhi International Airport",
    },
  ];

  const [selectedFareType, setSelectedFareType] = useState<string>("");
  const [selectedTripType, setSelectedTripType] = useState<string>("one-way");
  const [departureDate, setDepartureDate] = useState<string>("2023-05-10");
  const [isTravellerDropdownOpen, setIsTravellerDropdownOpen] = useState(false);
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState<string>("economy");
  const [fromLocation, setFromLocation] = useState<Location>(locations[0]);
  const [toLocation, setToLocation] = useState<Location>(locations[1]);

  const handleTripTypeChange = (type: string) => {
    setSelectedTripType(type);
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const totalTravellers = travellers.adults + travellers.children + travellers.infants;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Trip type selection */}
      <div className="flex space-x-4 mb-4">
        <Button
          className={`rounded-full ${
            selectedTripType === "one-way" ? "bg-gray-300 text-indigo-600" : "bg-indigo-50"
          }`}
          onClick={() => handleTripTypeChange("one-way")}
        >
          One Way
        </Button>
        <Button
          className={`rounded-full ${
            selectedTripType === "round-trip" ? "bg-gray-300 text-indigo-600" : "bg-indigo-50"
          }`}
          onClick={() => handleTripTypeChange("round-trip")}
        >
          Round Trip
        </Button>
      </div>

      {/* Search form */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* From/To container */}
        <div className="col-span-2 relative">
          <div className="grid grid-cols-2 gap-2">
            <LocationInput
              label="From"
              locations={locations}
              selectedLocation={fromLocation}
              onSelect={setFromLocation}
            />
            <LocationInput
              label="To"
              locations={locations}
              selectedLocation={toLocation}
              onSelect={setToLocation}
            />
          </div>
          
          {/* Swap button positioned correctly */}
          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      rounded-full bg-white shadow-md z-10 p-2 transition duration-200
                      ease-in-out hover:bg-gray-200 hover:scale-105"
            onClick={swapLocations}
          >
            ⇄
          </button>
        </div>

        {/* Departure */}
        <div className="bg-gray-50 p-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-100">
          <label className="text-xs text-gray-500">Departure</label>
          <input
            type="date"
            className="w-full bg-transparent focus:outline-none font-bold"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            {new Date(departureDate).toLocaleDateString('en-US', { weekday: 'long' })}
          </p>
        </div>

        {/* Return */}
        <div className="bg-gray-50 p-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-100">
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Return
            <span>▼</span>
          </label>
          <div>
            <p className="text-xs text-gray-400">Tap to add a return date for discounts</p>
          </div>
        </div>

        {/* Travellers & Class */}
        <div 
          className="bg-gray-50 p-3 rounded-lg md:col-span-1 transition duration-200 ease-in-out hover:bg-gray-100 cursor-pointer relative"
          onClick={() => setIsTravellerDropdownOpen(!isTravellerDropdownOpen)}
        >
          <label className="text-xs text-gray-500 flex items-center justify-between">
            Travellers & Class
            <span>▼</span>
          </label>
          <div>
            <h3 className="text-lg font-bold">
              {totalTravellers} Traveller{totalTravellers !== 1 ? 's' : ''}
            </h3>
            <p className="text-xs text-gray-500 capitalize">
              {cabinClass.replace('-', ' ')}
            </p>
          </div>

          {isTravellerDropdownOpen && (
            <div 
              className="absolute left-0 right-0 mt-2 bg-white border rounded-lg p-4 shadow-lg z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 space-y-3">
                {/* Travellers counter controls */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Adults</div>
                    <div className="text-xs text-gray-500">12+ years</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTravellers(prev => ({ ...prev, adults: Math.max(0, prev.adults - 1) }));
                      }}
                      className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-4 text-center">{travellers.adults}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTravellers(prev => ({ ...prev, adults: prev.adults + 1 }));
                      }}
                      className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Children</div>
                    <div className="text-xs text-gray-500">2-11 years</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTravellers(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }));
                      }}
                      className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-4 text-center">{travellers.children}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTravellers(prev => ({ ...prev, children: prev.children + 1 }));
                      }}
                      className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Infants</div>
                    <div className="text-xs text-gray-500">0-1 years</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTravellers(prev => ({ ...prev, infants: Math.max(0, prev.infants - 1) }));
                      }}
                      className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-4 text-center">{travellers.infants}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTravellers(prev => ({ ...prev, infants: prev.infants + 1 }));
                      }}
                      className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cabin Class</label>
                <select
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="economy">Economy</option>
                  <option value="premium-economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first-class">First Class</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fare types */}
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Select a Fare Type:</p>
        <RadioGroup className="">
          {fareTypes.map((type) => (
            <div
              key={type.id}
              className="flex items-center space-x-1 border rounded-full px-3 py-1 transition duration-200 ease-in-out hover:bg-gray-100"
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