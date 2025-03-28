// CategoryBar.tsx
interface CategoryBarProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
  }
  
  const categories = [
    { label: "Flights", icon: "✈️" },
    { label: "Hotel", icon: "🏨" },
    { label: "Homestays", icon: "🏠" },
  ];
  
  const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, setSelectedCategory }) => {
    return (
      <div className="w-2/3 flex justify-center gap-6 p-4">
        {categories.map(({ label, icon }) => (
          <div
            key={label}
            className={`flex flex-col items-center cursor-pointer text-gray-700 ${
              selectedCategory === label ? "font-bold text-blue-600" : ""
            }`}
            onClick={() => setSelectedCategory(label)}
          >
            <div className="text-2xl">{icon}</div>
            <span className="mt-1 text-sm">{label}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default CategoryBar;