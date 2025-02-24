import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { AlertProvider } from "./context/AlertContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ThemeProvider>
  </React.StrictMode>
);
