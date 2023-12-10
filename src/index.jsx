import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CombinedProvider } from "./contexts/CombinedContext";

import "./styles/style.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CombinedProvider>
      <App />
    </CombinedProvider>
  </BrowserRouter>
);
