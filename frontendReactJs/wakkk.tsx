interface CategoryItem {
    label: string;
    icon: string;
  }
  
  interface wakkkProps {
    categories: CategoryItem[];
    onCategoryClick: (category: string) => void;
  }
  
  const wakkk: React.FC<wakkkProps> = ({ categories, onCategoryClick }) => (
    <div className="flex justify-center gap-6 p-4 bg-gray-100">
      {categories.map(({ label, icon }) => (
        <div
          key={label}
          className="flex flex-col items-center cursor-pointer hover:text-blue-600"
          onClick={() => onCategoryClick(label)}
        >
          <div className="text-2xl">{icon}</div>
          <span className="mt-1 text-sm">{label}</span>
        </div>
      ))}
    </div>
  );
  
  const App: React.FC = () => {
    const categories: CategoryItem[] = [
      { label: "Flights", icon: "✈️" },
      { label: "Hotel", icon: "🏨" },
      { label: "HomeStays", icon: "🏠" },
      { label: "Holiday Packages", icon: "🎁" },
      { label: "Trains", icon: "🚂" },
      { label: "Buses", icon: "🚌" },
      { label: "Cabs", icon: "🚕" },
      { label: "Activities", icon: "🎉" },
    ];
  
    return <wakkk categories={categories} onCategoryClick={(category) => console.log(`Category clicked: ${category}`)} />;
  };
  
  export default App;
  