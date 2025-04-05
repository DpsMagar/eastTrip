"use client"

import { createContext, useState, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const signIn = async (email, password) => {
    // Simulate authentication logic
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({ email }) // In a real app, fetch user data
        resolve()
      }, 500)
    })
  }

  const signOut = async () => {
    // Simulate sign-out logic
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null)
        resolve()
      }, 500)
    })
  }

  const value = {
    currentUser,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

