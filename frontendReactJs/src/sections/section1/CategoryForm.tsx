// CategoryForm.tsx
// import FlightForm from "./forms/FlightForm";
import { FlightForm } from "./forms/FlightForm";
import { HomestayForm } from "./forms/HomestayForm";
// import { HomestayForm } from "./forms/HomeStayForm";
import {HotelForm} from "./forms/HotelForm";


interface CategoryFormProps {
  selectedCategory: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ selectedCategory }) => {
  return (
    <div className=" h-96 w-3/4 p-4 bg-[#FFF7D3] shadow-lg rounded-md">
      {selectedCategory === "Flights" && <FlightForm />}
      {selectedCategory === "Hotel" && <HotelForm />}
      {selectedCategory === "Homestays" && <HomestayForm />}
    </div>
  );
};

export default CategoryForm;