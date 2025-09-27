import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";

export default function Data() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ produk: "", customer: "", total: "" });
  const [loading, setLoading] = useState(false);

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
      toast.error(`Gagal ambil data: ${err.message}`);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 handleSubmit terpanggil!", form);

    setLoading(true);
    try {
      const payload = {
        produk: form.produk,
        customer: form.customer,
        total: Number(form.total),
      };

      const res = await fetch(
        "https://data-visualization-app-production.up.railway.app/data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Gagal simpan data");
      }

      const result = await res.json();

      setData((prev) => [...prev, result]);
      toast.success("Data berhasil ditambahkan");
      setModalOpen(false);
      setForm({ produk: "", customer: "", total: "" });
      setEditItem(null);
    } catch (err) {
      console.error("❌ Error handleSubmit:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hapus data
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus data ini?")) return;
    try {
      const res = await fetch(
        `https://data-visualization-app-production.up.railway.app/data/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Gagal hapus data");
      toast.success("Data berhasil dihapus");
      loadData();
    } catch (err) {
      toast.error(`Gagal hapus data: ${err.message}`);
    }
  };

  // Export CSV
  const exportCSV = () => {
    const header = ["ID", "Produk", "Customer", "Total", "Tanggal"];
    const rows = data.map((d) => [
      d.id,
      d.produk,
      d.customer,
      d.total,
      d.tanggal,
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data_penjualan.csv");
  };

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-500">📊 Data Penjualan</h1>

      {/* Tombol Aksi */}
      <div className="flex gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
        >
          ➕ Tambah Data
        </button>
        <button
          onClick={exportCSV}
          className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600"
        >
          ⬇️ Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 border-b border-gray-600">
              <th className="px-4 py-2">Produk</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{d.produk}</td>
                <td className="px-4 py-2">{d.customer}</td>
                <td className="px-4 py-2 text-center">
                  {formatRupiah(d.total)}
                </td>
                <td className="px-4 py-2 text-center">{d.tanggal}</td>
                <td className="px-4 py-2 space-x-2 text-center">
                  <button
                    onClick={() => {
                      setEditItem(d);
                      setForm({
                        produk: d.produk,
                        customer: d.customer,
                        total: d.total,
                      });
                      setModalOpen(true);
                    }}
                    className="bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editItem ? "Edit Data" : "Tambah Data"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="produk"
                value={form.produk}
                onChange={handleChange}
                placeholder="Nama Produk"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                required
              />
              <input
                type="text"
                name="customer"
                value={form.customer}
                onChange={handleChange}
                placeholder="Nama Customer"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                required
              />
              <input
                type="number"
                name="total"
                value={form.total}
                onChange={handleChange}
                placeholder="Total Penjualan"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditItem(null);
                    setForm({ produk: "", customer: "", total: "" });
                  }}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
