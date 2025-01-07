import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Admin from "./Admin.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
