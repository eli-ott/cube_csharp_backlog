import React, { createContext, useState, useContext, useEffect } from "react";
import { getTokenFromCookie } from "../services/authentification";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(getTokenFromCookie());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);

  useEffect(() => {
    const storedToken = getTokenFromCookie();
    setToken(storedToken);
    setIsLoggedIn(!!storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, setIsLoggedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
