import React, { useState, useEffect } from "react";
import ChartComponent from "./components/ChartComponent";
import DataForm from "./components/DataForm";
import DataList from "./components/DataList";
import StatsBox from "./components/StatsBox";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [data, setData] = useState([]);

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
      } catch (err) {
        console.error("Gagal ambil data:", err);
        toast.error("Gagal ambil data dari server");
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-inter p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-blue-400 tracking-wide">
          Visualisasi Data Penjualan
        </h1>

        <DataForm setData={setData} />
        <DataList data={data} setData={setData} />
        <ChartComponent data={data} />
        <StatsBox data={data} />
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; 2024 Visualisasi Data Penjualan. All rights reserved.
      </div>
      <div className="text-center text-gray-500 text-sm">
        Dibuat oleh{" "}
        <a
          href="https://github.com/iiksukira"
          className="text-blue-400 hover:underline"
        >
          iiksukira
        </a>
      </div>
    </div>
  );
}

export default App;
