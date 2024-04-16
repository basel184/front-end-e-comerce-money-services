'use client'
import React, { createContext, useState,useContext } from "react";

 export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Ttoken, setTtoken] = useState(null);
  const setDynamicTtoken = (payment_token) => {
    if (payment_token) {
      setTtoken(payment_token);
    }
  };

  return (
    <AuthContext.Provider value={{ Ttoken, setDynamicTtoken, setTtoken }}>
      {children}
    </AuthContext.Provider>
  );
 
};


