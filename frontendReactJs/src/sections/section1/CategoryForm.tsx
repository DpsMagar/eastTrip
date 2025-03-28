// CategoryForm.tsx
import {FlightForm} from "./forms/FlightForm";
import {HotelForm} from "./forms/HotelForm";
import { HomestayForm } from "./HomestayForm";


interface CategoryFormProps {
  selectedCategory: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ selectedCategory }) => {
  return (
    <div className="border-2 h-96 w-3/4 p-4 bg-white shadow-lg rounded-md">
      {selectedCategory === "Flights" && <FlightForm />}
      {selectedCategory === "Hotel" && <HotelForm />}
      {selectedCategory === "Homestays" && <HomestayForm />}
    </div>
  );
};

export default CategoryForm;