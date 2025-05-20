"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from sessionStorage on initial render
  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

const signIn = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = user.email;
      let username = email.substring(0, email.indexOf('@')); // get before '@'
      
      // Capitalize first letter
      username = username.charAt(0).toUpperCase() + username.slice(1);

      setCurrentUser(username);
      sessionStorage.setItem("currentUser", JSON.stringify(username));
      
      resolve();
    }, 500);
  });
};



  const signOut = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        sessionStorage.removeItem("currentUser"); // Clear storage
        resolve();
      }, 500);
    });
  };

  const value = {
    currentUser,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



export const useAuth = () => {
  return useContext(AuthContext);
};
