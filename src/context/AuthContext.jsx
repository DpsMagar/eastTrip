"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user)); // Persist user
        resolve();
      }, 500);
    });
  };

  const signOut = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser"); // Clear storage
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
