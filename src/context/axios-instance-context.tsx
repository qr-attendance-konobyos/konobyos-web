import axios, { AxiosInstance } from "axios";
import React from "react";
import { useAuth } from "./auth-context";

const axiosInstanceContext = React.createContext<AxiosInstance | null>(null);

export const AxiosInstanceProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { token, logout } = useAuth();

  const axiosInstance = React.useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    instance.interceptors.response.use(null, (error) => {
      if (error.response?.status === 401) logout();
      console.error(error);
      throw error;
    });
    return instance;
  }, [logout, token]);

  return (
    <axiosInstanceContext.Provider value={axiosInstance}>
      {children}
    </axiosInstanceContext.Provider>
  );
};

export const useAxiosInstance = () => {
  const axiosInstance = React.useContext(axiosInstanceContext);
  if (!axiosInstance) {
    throw new Error(
      "useAxiosInstance must be used within a AxiosInstanceProvider"
    );
  }
  return axiosInstance;
};
