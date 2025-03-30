
const Section1ASS = () => {
  return (
    <div className="mt-5">

        <div className="bg-gray-50 rounded-2xl shadow-lg p-6 w-full max-w-4xl mx-auto border border-gray-200">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
            <div className="h-12 w-12 mr-4 bg-gray-300 flex items-center justify-center rounded-full">
                <span className="text-gray-500 text-sm">LOGO</span>
            </div>
            <div>
                <h2 className="text-xl font-semibold text-gray-800">Nepal Airlines</h2>
                <p className="text-sm text-gray-500">IX 1145</p>
            </div>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-all">
            View Prices
            </button>
        </div>

        <div className="flex justify-between items-center mb-4">
            <div>
            <p className="text-2xl font-bold text-gray-800">23:00</p>
            <p className="text-sm text-gray-500">Pokhara</p>
            </div>

            <div className="flex flex-col items-center">
            <div className="bg-green-400 h-1 w-24 rounded-full"></div>
            <p className="text-sm text-gray-500">01 h 00 m</p>
            <p className="text-sm text-gray-500">Non-stop</p>
            </div>

            <div>
            <p className="text-2xl font-bold text-gray-800">
                01:25 <span className="text-xs text-gray-500">+1 DAY</span>
            </p>
            <p className="text-sm text-gray-500">Kathmandu</p>
            </div>

            <div>
            <p className="text-2xl font-bold text-indigo-600">₹ 5,499</p>
            <p className="text-sm text-gray-500">per adult</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Section1ASS;
