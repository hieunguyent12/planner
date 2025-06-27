import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { DesktopLayout } from "./components/layouts";
import { router } from "./router";

function App() {
  return (
    <DesktopLayout>
      <RouterProvider router={router} />
    </DesktopLayout>
  );
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
