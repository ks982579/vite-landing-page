import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function PageNotFound404(): React.JSX.Element {
  // Check and Reroute to home screen
  return (
    <div>
      <h1>404 Page Not Found</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Probably move to App? */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
