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

        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .slice(0, 10);
        const thisMonth = new Date().toISOString().slice(0, 7);

        let todayRev = 0,
          yesterdayRev = 0,
          monthRev = 0;

        result.forEach((item) => {
          const tanggal = item.tanggal;
          if (!tanggal || typeof tanggal !== "string") return;

          if (tanggal.startsWith(today)) todayRev += item.total;
          if (tanggal.startsWith(yesterday)) yesterdayRev += item.total;

          const itemMonth = tanggal.slice(0, 7); // ambil "YYYY-MM"
          if (itemMonth === thisMonth) monthRev += item.total;
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
  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const totalProduk = new Set(data.map((d) => d.produk)).size;
  const totalCustomer = new Set(data.map((d) => d.customer)).size;
  const totalTransaksi = data.length;

  let growthText = "";
  if (yesterdayRevenue === 0 && todayRevenue > 0) {
    growthText = "🚀 Penjualan naik dari nol dibanding kemarin";
  } else if (yesterdayRevenue === 0 && todayRevenue === 0) {
    growthText = "⚠️ Tidak ada penjualan hari ini maupun kemarin";
  } else {
    const growth = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
    growthText =
      growth >= 0
        ? `🚀 Penjualan naik ${growth.toFixed(1)}% dibanding kemarin`
        : `⚠️ Penjualan turun ${Math.abs(growth).toFixed(
            1
          )}% dibanding kemarin`;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-500 tracking-wide">
        📊 Dashboard Overview
      </h1>

      <div
        className={`p-4 rounded-md ${
          todayRevenue >= yesterdayRevenue
            ? "bg-green-900 text-green-300"
            : "bg-red-900 text-red-300"
        }`}
      >
        {growthText}
      </div>

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
          <p className="text-2xl font-bold">{formatRupiah(monthRevenue)}</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ringkasan Hari Ini</h2>
        <p>Revenue Hari Ini: {formatRupiah(todayRevenue)}</p>
        <p>Revenue Bulan Ini: {formatRupiah(monthRevenue)}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          Tren Penjualan 7 Hari Terakhir
        </h2>
        <Sparklines data={data.slice(-7).map((d) => d.total)}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>

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
