import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />{" "}
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      expand={false}
      visibleToasts={5}
      theme="dark" // or "light" or "system"
    />
  </StrictMode>
);
