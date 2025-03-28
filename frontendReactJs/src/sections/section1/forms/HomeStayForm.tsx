
export const  HomeStayForm = () => {
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
          <button className="px-4 py-2 border rounded-full text-sm">Apartment</button>
          <button className="px-4 py-2 border rounded-full text-sm">Villa</button>
          <button className="px-4 py-2 border rounded-full text-sm">Cottage</button>
          <button className="px-4 py-2 border rounded-full text-sm">Bungalow</button>
        </div>
      </div>
    </div>
  );
};
