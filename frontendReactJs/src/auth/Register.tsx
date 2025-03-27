import React, { useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useLoginMutation, useRegisterMutation } from "../redux/api/apiSlice";
import { offRegisterButton } from "../redux/slices/ToggleRegisterSlice";

const Register: React.FC = () => {
  const isRegisterToggled = useSelector((state: RootState) => state.toggleRegister.isRegisterToggled);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setUsername] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const dispatchRegister: AppDispatch = useDispatch();

  const [Register, {isLoading, error, isError}] = useRegisterMutation();

  const handleLogin= async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await Register({email, password, fullName , confirmPassword}).unwrap();
      console.log("User registered Successfully!!", result);
      dispatchRegister(offRegisterButton());
    } catch (error) {
      console.log("Error Logging!!", error);
      console.log(email, password, fullName, confirmPassword);
      
      
    }
  }

  const registerByGoogle= () =>{
    window.location.href="http://localhost:8080/login/oauth2/authorization/google";
  }



  return (
    <div className={`z-10 absolute transition-all duration-300 ease-in-out border-2 min-h-screen flex justify-center items-center ${isRegisterToggled ? 'block opacity-100' : 'hidden opacity-0'} mx-auto w-full overflow-hidden`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-left"> {/* Reduced padding and width */}
        <h2 className="text-xl font-semibold mb-4">Register Now</h2> {/* Reduced font size */}
        <form onSubmit={handleLogin}> 
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input type="name" id="name" placeholder="Enter your full name"
          onChange={(e)=> setUsername(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-none" />

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2">
            Email
          </label>
          <input type="email" id="email" placeholder="Enter email" 
            onChange={(e)=> setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-none" />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <div className="relative">
            <input type="password" id="password" placeholder="Enter Password"
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-none" />
            <FaEye className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
          </div>

          <label htmlFor="Confirm Password" className="block text-sm font-medium text-gray-700 mt-4">
            Confirm Password
          </label>
          <div className="relative">
            <input type="password" id="password" placeholder="Enter Confirm Password"
            onChange={(e)=> setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-none" />
            <FaEye className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
          </div>

          <div className="text-right text-sm text-blue-500 mt-1 cursor-pointer">Forget Password?</div>
          <button type="submit" className="w-full bg-red-500 text-white p-2 rounded-md mt-4 hover:bg-red-600">
            {isLoading ? "Logging in..": "Continue"}
          </button>
          {isError&&
          <p>Error: {error && 'status' in error ? `Status ${error.status}` : error?.message}</p>}
        </form>
        <div className="text-center my-4 text-gray-500">Or Log in with</div>
        <button className="w-full bg-white border border-gray-300 text-black p-2 rounded-md hover:bg-gray-100 flex items-center justify-center" onClick={registerByGoogle}>
          <FaGoogle className="mr-2 text-red-500" /> Continue With Google
        </button>
        <div className="mt-4 text-sm text-gray-600 text-center">
          New here? <a href="#" className="text-blue-500">Create an Account</a>
        </div>
      </div>
    </div>
  );
};

export { Register };
