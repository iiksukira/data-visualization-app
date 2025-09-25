import React from "react";
import toast from "react-hot-toast";

function DataList({ data, setData }) {
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/data/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal hapus data");

      const updated = await fetch(`${import.meta.env.VITE_API_URL}/data`).then(
        (r) => r.json()
      );

      setData(updated);
      toast.success("✅ Data berhasil dihapus 🗑️");
    } catch (err) {
      console.error(err);
      toast.error("❌ Gagal menghapus data");
    }
  };

  return (
    <ul className="space-y-3">
      {data.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center bg-gray-800 p-4 rounded shadow hover:bg-gray-700 transition"
        >
          <span className="font-medium">
            {item.name}: {item.value}
          </span>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-400 hover:text-red-600 font-semibold"
          >
            Hapus
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DataList;
