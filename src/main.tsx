import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Subpages from "./Subpages.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Subpages />
  </StrictMode>
);
