import React, { createContext, useEffect, useState } from "react";
import { api, setAuthToken } from "../hooks/apiService";

const demoUser = { name: "Demo User", email: "demouser@gmail.com" };
interface AuthContextType {
  user: User | undefined;
  isAuthenticated: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  signOut: () => void;
}
export interface User {
  name: string;
  email: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isAuthenticated: false,
  signIn: async (email: string, password: string) => {
    return { success: false };
  },
  signUp: async (email: string, password: string) => {
    return { success: false };
  },
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(demoUser);
      setAuthToken(JSON.parse(token));
    }
  }, []);

  const setUserToken = (token: string) => {
    localStorage.setItem("token", JSON.stringify(token));
    setAuthToken(token);
    setUser(demoUser);
  };
  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      setUserToken(JSON.stringify(response.data.token));
      return {
        success: true,
      };
    } catch (e: any) {
      console.log(e);
      return { success: false, message: e.response.data.error };
    }
  };
  const signUp = async (email: string, password: string) => {
    try {
      const response = await api.post("/register", {
        email,
        password,
      });
      setUserToken(JSON.stringify(response.data.token));
      return {
        success: true,
      };
    } catch (e: any) {
      console.log(e);
      return { success: false, message: e.response.data.error };
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
