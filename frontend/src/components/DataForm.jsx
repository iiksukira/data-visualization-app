import React, { useState } from "react";
import toast from "react-hot-toast";

export default function DataForm({ setData }) {
  const [form, setForm] = useState({ name: "", value: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name.trim(),
        value: Number(form.value),
      };

      if (!payload.name) {
        toast.error("❌ Nama produk tidak boleh kosong!");
        return;
      }
      if (isNaN(payload.value)) {
        toast.error("❌ Jumlah harus berupa angka!");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal tambah data");
      const newData = await res.json();

      setData((prev) => [...prev, newData]);
      toast.success("✅ Data berhasil ditambahkan 🎉");
      setForm({ name: "", value: "" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Gagal menambahkan data");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 bg-gray-800 p-4 rounded shadow"
    >
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Nama produk"
        className="flex-1 p-2 rounded bg-gray-900 text-white"
        required
      />
      <input
        type="number"
        value={form.value}
        onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
        placeholder="Jumlah"
        className="w-full sm:w-32 p-2 rounded bg-gray-900 text-white"
        required
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Tambah
      </button>
    </form>
  );
}
