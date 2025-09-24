import React from "react";

export default function StatsBox({ data }) {
  if (!data || data.length === 0) return null;

  // Pastikan semua value angka valid
  const numericData = data.map((item) => Number(item.value) || 0);

  const total = numericData.reduce((sum, val) => sum + val, 0);
  const avg =
    numericData.length > 0 ? (total / numericData.length).toFixed(2) : "0";
  const max = numericData.length > 0 ? Math.max(...numericData) : 0;
  const min = numericData.length > 0 ? Math.min(...numericData) : 0;

  // Array stats dengan fallback aman
  const stats = [
    { label: "Total", value: isNaN(total) ? "0" : total },
    { label: "Rata-rata", value: isNaN(avg) ? "0" : avg },
    { label: "Tertinggi", value: isNaN(max) ? "0" : max },
    { label: "Terendah", value: isNaN(min) ? "0" : min },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700 transition"
        >
          <h3 className="text-sm text-gray-400">{label}</h3>
          <p className="text-xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}
