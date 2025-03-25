import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/primaryLogo.png"
import { AppDispatch } from '../redux/Store';
import { useDispatch } from 'react-redux';
import { offLoginButton, toggleLoginButton } from '../redux/slices/ToggleLoginSlice';
import { offRegisterButton, toggleRegisterButton } from '../redux/slices/ToggleRegisterSlice';


const Navbar: React.FC = () => {

  const dispatchLogin: AppDispatch= useDispatch();
  const dispatchRegister: AppDispatch= useDispatch();


  return (
    <nav className="bg-[#FFF7D3] border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <a href="#" className="flex items-center space-x-3">
          <img src={logo} className="h-20 " alt="Logo" />
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-black rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-[#FFF7D3] md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#FFF7D3]">
            <li>
              <a href="#" className="block py-2 px-3 text-black hover:bg-gray-700 rounded-sm md:hover:bg-transparent md:hover:text-gray-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-black hover:bg-gray-700 rounded-sm md:hover:bg-transparent md:hover:text-gray-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-black hover:bg-gray-700 rounded-sm md:hover:bg-transparent md:hover:text-gray-500">
                Services
              </a>
            </li>
            <li>
              <Link  className="block py-2 px-3 text-black hover:bg-gray-700 rounded-sm md:hover:bg-transparent md:hover:text-gray-500" 
              onClick={() => {dispatchLogin(toggleLoginButton()), dispatchLogin(offRegisterButton())}}>
                Login
              </Link>
            </li>
            <li>
              <Link  className="block py-2 px-3 text-black hover:bg-gray-700 rounded-sm md:hover:bg-transparent md:hover:text-gray-500" 
              onClick={() => {dispatchRegister(toggleRegisterButton()), dispatchRegister(offLoginButton())}}>
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
