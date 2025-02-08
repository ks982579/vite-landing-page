import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";

function Dashboard(): React.JSX.Element {
  // Check and Reroute to home screen
  return (
    <div>
      <h1>This is Dashboard</h1>
    </div>
  );
}

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
