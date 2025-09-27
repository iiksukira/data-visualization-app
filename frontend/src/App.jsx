import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import Data from "./pages/Data";
import Insights from "./pages/Insights";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="data" element={<Data />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
