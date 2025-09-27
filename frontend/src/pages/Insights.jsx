import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";

export default function Insights() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch(
        "https://data-visualization-app-production.up.railway.app/data"
      );
      if (!res.ok) throw new Error("Gagal fetch data");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Gagal ambil data");
    }
  };

  // 📊 Transformasi data
  const salesByDate = data.reduce((acc, d) => {
    const date = d.tanggal?.split("T")[0] || "Unknown";
    acc[date] = (acc[date] || 0) + Number(d.total);
    return acc;
  }, {});

  const salesByProduct = data.reduce((acc, d) => {
    acc[d.produk] = (acc[d.produk] || 0) + Number(d.total);
    return acc;
  }, {});

  const salesByCustomer = data.reduce((acc, d) => {
    acc[d.customer] = (acc[d.customer] || 0) + 1;
    return acc;
  }, {});

  const lineData = Object.entries(salesByDate).map(([date, total]) => ({
    date,
    total,
  }));

  const pieData = Object.entries(salesByProduct).map(([produk, total]) => ({
    name: produk,
    value: total,
  }));

  const barData = Object.entries(salesByCustomer).map(([cust, count]) => ({
    name: cust,
    transaksi: count,
  }));

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#FF4444"];

  // 🧠 Auto Insight
  let autoInsight = "Tidak ada cukup data untuk insight.";
  if (data.length > 0) {
    const topProduct = pieData.sort((a, b) => b.value - a.value)[0];
    const topCustomer = barData.sort((a, b) => b.transaksi - a.transaksi)[0];
    autoInsight = `Produk terlaris adalah "${topProduct?.name}" dengan total penjualan Rp ${topProduct?.value}. 
    Customer paling aktif adalah "${topCustomer?.name}" dengan ${topCustomer?.transaksi} transaksi.`;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-blue-500">📈 Insights</h1>

      {/* Line Chart */}
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Tren Penjualan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#00C49F" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Produk Terlaris</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Customer Teraktif</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="transaksi" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Auto Insight */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">🧠 Insight Otomatis</h2>
        <p className="text-gray-300 whitespace-pre-line">{autoInsight}</p>
      </div>
    </div>
  );
}
