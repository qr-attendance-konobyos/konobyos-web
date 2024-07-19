import { jwtDecode } from "jwt-decode";
import React from "react";
import { AuthContext } from "./auth-context";

function isTokenExpired(token: string | null) {
  if (!token) return true;
  try {
    const payload = jwtDecode(token);
    if (payload && typeof payload === "object") {
      if (Date.now() / 1000 > (payload?.exp ?? 0)) {
        return true;
      }
    }
  } catch (e) {
    console.error(`invalid token ${token} ${e}`);
  }
  return false;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) return null;
    return token;
  });

  const isAuthenticated = React.useMemo(() => !!token, [token]);

  async function login(token: string) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        get token() {
          if (token && isTokenExpired(token)) {
            logout();
            return null;
          }
          return token;
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
