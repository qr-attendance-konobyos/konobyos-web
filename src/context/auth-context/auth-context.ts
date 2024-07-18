import React from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (payload: string) => void;
  logout: () => void;
  token: string | null;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);
