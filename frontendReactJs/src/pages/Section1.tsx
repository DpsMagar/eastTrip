import React, { JSX, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className: string;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

interface TabsListProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className, ...props }) => (
  <div className={`flex space-x-2 ${className}`} {...props}>
    {children}
  </div>
);

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className: string;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  isActive,
  onClick,
  className,
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded-full ${
      isActive ? "bg-indigo-600 text-white" : "bg-gray-200"
    } ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const FlightForm = () => <div>Flight Booking Form</div>;
const HotelForm = () => <div>Hotel Booking Form</div>;
const HomestayForm = () => <div>Homestay Booking Form</div>;

export const Section1 = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Flights");

  const travelCategories: string[] = ["Flights", "Hotel", "Homestays"];

  const renderForm = () => {
    switch (selectedCategory) {
      case "Flights":
        return <FlightForm />;
      case "Hotel":
        return <HotelForm />;
      case "Homestays":
        return <HomestayForm />;
      default:
        return <FlightForm />;
    }
  };

  return (
    

      <main className="flex-1 px-4 pb-8">
        <Card className="mx-auto max-w-5xl mt-4 p-4">
          <TabsList className="mb-4">
            {travelCategories.map((category) => (
              <TabsTrigger
                key={category}
                isActive={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className=""
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {renderForm()}
        </Card>

        <div className="flex justify-center -mt-4">
          <Button className="px-12 py-6 rounded-full bg-gradient-to-r from-purple-700 to-red-500 text-white font-bold text-lg">
            SEARCH
          </Button>
        </div>
      </main>
  );
};
