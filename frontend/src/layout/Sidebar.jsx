import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "🏠 Home", path: "/" },
    { name: "📦 Data", path: "/data" },
    { name: "📈 Insights", path: "/insights" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Dashboard</h2>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-md ${
              location.pathname === item.path
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
