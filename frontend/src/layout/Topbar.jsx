import React from "react";
export default function Topbar() {
  return (
    <div className="w-full h-14 bg-gray-800 flex items-center justify-between px-6 text-white">
      <h1 className="text-lg font-semibold">Visualisasi Data Penjualan</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">👤 iiksukira</span>
      </div>
    </div>
  );
}
