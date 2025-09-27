import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          "https://data-visualization-app-production.up.railway.app/data"
        );
        if (!res.ok) throw new Error("Gagal fetch data");
        const result = await res.json();
        setData(result);
        toast.success("Data berhasil dimuat");

        // Hitung ringkasan
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .slice(0, 10);
        const thisMonth = new Date().toISOString().slice(0, 7);

        let todayRev = 0,
          yesterdayRev = 0,
          monthRev = 0;

        result.forEach((item) => {
          if (item.tanggal?.startsWith(today)) todayRev += item.total;
          if (item.tanggal?.startsWith(yesterday)) yesterdayRev += item.total;
          if (item.tanggal?.startsWith(thisMonth)) monthRev += item.total;
        });

        setTodayRevenue(todayRev);
        setYesterdayRevenue(yesterdayRev);
        setMonthRevenue(monthRev);
      } catch (err) {
        console.error("Gagal ambil data:", err);
        toast.error("Gagal ambil data dari server");
      }
    };

    loadData();
  }, []);

  // Hitung stats
  const totalProduk = new Set(data.map((d) => d.produk)).size;
  const totalCustomer = new Set(data.map((d) => d.customer)).size;
  const totalTransaksi = data.length;

  // Notifikasi tren
  const growth =
    yesterdayRevenue > 0
      ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100
      : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-500 tracking-wide">
        📊 Dashboard Overview
      </h1>

      {/* Alert */}
      <div
        className={`p-4 rounded-md ${
          growth >= 0
            ? "bg-green-900 text-green-300"
            : "bg-red-900 text-red-300"
        }`}
      >
        {growth >= 0
          ? `🚀 Penjualan naik ${growth.toFixed(1)}% dibanding kemarin`
          : `⚠️ Penjualan turun ${Math.abs(growth).toFixed(
              1
            )}% dibanding kemarin`}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">Produk</p>
          <p className="text-2xl font-bold">{totalProduk}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">Customer</p>
          <p className="text-2xl font-bold">{totalCustomer}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">Transaksi</p>
          <p className="text-2xl font-bold">{totalTransaksi}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">Revenue Bulan Ini</p>
          <p className="text-2xl font-bold">Rp {monthRevenue}</p>
        </div>
      </div>

      {/* Ringkasan Hari Ini */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ringkasan Hari Ini</h2>
        <p>Revenue Hari Ini: Rp {todayRevenue}</p>
        <p>Revenue Bulan Ini: Rp {monthRevenue}</p>
      </div>

      {/* Sparkline */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          Tren Penjualan 7 Hari Terakhir
        </h2>
        <Sparklines data={data.slice(-7).map((d) => d.total)}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>

      {/* Navigasi Cepat */}
      <div className="flex gap-4">
        <Link
          to="/data"
          className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
        >
          Kelola Data
        </Link>
        <Link
          to="/insights"
          className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600"
        >
          Lihat Insight
        </Link>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
