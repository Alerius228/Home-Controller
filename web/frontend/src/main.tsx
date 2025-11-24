import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "bootstrap/dist/css/bootstrap.css";

createRoot(document.getElementById("root")!).render(
  <div id="rootBackground">
    <StrictMode>
      <App />
    </StrictMode>
  </div>
);
