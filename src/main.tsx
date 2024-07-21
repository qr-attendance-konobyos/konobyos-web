import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { AuthProvider, AxiosInstanceProvider } from "./context";
import "./index.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AxiosInstanceProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AxiosInstanceProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);