import React, { useState } from "react";
import CategoryBar from "../sections/section1/CategoryBar";
import CategoryForm from "../sections/section1/CategoryForm";

const Section1: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Flights");

  return (
    <div className="flex flex-col items-center pt-5">
      <CategoryBar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <CategoryForm selectedCategory={selectedCategory} />
    </div>
  );
};

export default Section1;
