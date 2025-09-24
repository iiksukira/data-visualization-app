import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartComponent({ data }) {
  if (!data || data.length === 0)
    return <p>Tidak ada data untuk ditampilkan.</p>;

  const chartData = {
    labels: data.map((item, i) => item.name || `Item ${i + 1}`),
    datasets: [
      {
        label: "Nilai",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow">
      <Bar data={chartData} />
    </div>
  );
}
