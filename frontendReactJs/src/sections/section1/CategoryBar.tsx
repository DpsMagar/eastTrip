interface CategoryItem{
    label: string;
    icon: string;
}
const CategoryBar: React.FC = () =>{
    const categories: CategoryItem[] =[
        { label: "Flights", icon: "✈️" },
        { label: "Hotel", icon: "🏨" },
        { label: "HomeStays", icon: "🏠" },
        { label: "Holiday Packages", icon: "🎁" },
        { label: "Buses", icon: "🚌" },
        { label: "Cabs", icon: "🚕" },
        { label: "Activities", icon: "🎉" },
    ];
    return (
        <div className="w-2/3 flex justify-center gap-6 p-4 bg-gray-100    ">
        {categories.map(({ label, icon }) => (
          <div
            key={label}
            className="flex flex-col items-center cursor-pointer hover:text-blue-600 ">
            <div className="text-2xl ">{icon}</div>
            <span className="mt-1 text-sm text-black  ">{label}</span>
          </div>
        ))}
      </div>
  
    )
}
export default CategoryBar;