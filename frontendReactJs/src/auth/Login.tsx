import React from "react";
import { FaEye, FaGoogle, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Login: React.FC = () => {
  return (
    <div className="bg-[#FFF5F0] min-h-screen flex flex-col">
     
      <div className="flex items-center justify-center py-20">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-left">
          <h2 className="text-2xl font-bold mb-4">Login Now</h2>
          <form>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" placeholder="Enter email" className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-none" />

            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
              Password
            </label>
            <div className="relative">
              <input type="password" id="password" placeholder="Enter Password" className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-none" />
              <FaEye className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
            </div>

            <div className="text-right text-sm text-blue-500 mt-1 cursor-pointer">Forget Password?</div>
            <button type="submit" className="w-full bg-red-500 text-white p-2 rounded-md mt-4 hover:bg-red-600">
              CONTINUE
            </button>
          </form>
          <div className="text-center my-4 text-gray-500">Or Log in with</div>
          <button className="w-full bg-white border border-gray-300 text-black p-2 rounded-md hover:bg-gray-100 flex items-center justify-center">
            <FaGoogle className="mr-2 text-red-500" /> Continue With Google
          </button>
          <div className="mt-4 text-sm text-gray-600 text-center">
            New here? <a href="#" className="text-blue-500">Create an Account</a>
          </div>
        </div>
      </div>
      <footer className="bg-black text-gray-500 text-center text-sm p-4">
        <div className="bg-gray-200 p-4">
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-bold">Why GhumGham Nepal?</h3>
              <p>We provide travel services like hotels, flights, buses, and holiday packages.</p>
            </div>
            <div>
              <h3 className="font-bold">Booking Flights with GhumGham Nepal</h3>
              <p>Best deals on domestic and international flights with hassle-free bookings.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4 text-white">
          {[FaInstagram, FaTwitter, FaLinkedin].map((Icon, index) => (
            <a key={index} href="#" aria-label={Icon.name}>
              <Icon />
            </a>
          ))}
        </div>
        <div className="mt-4 text-white">© 2025 GhumGham Nepal Travel & Tourism LLC</div>
      </footer>
    </div>
  );
};

export {  Login };
