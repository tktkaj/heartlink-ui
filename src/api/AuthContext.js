import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthAxios } from "./authAxios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("access", token);
    } else {
      localStorage.removeItem("access");
    }
  }, [token]);

  const authAxios = getAuthAxios(token);

  return (
    <AuthContext.Provider value={{ token, setToken, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
