import React from "react";
import { Routes, Route } from "react-router";
import { HomePage, Dashboard, PageNotFound404 } from "./pages";

export default function AppRouter(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="dashboard/" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound404 />} />
    </Routes>
  );
}
