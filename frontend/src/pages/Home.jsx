import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Produk</h1>
      <DataForm setData={setData} />
      <StatsBox data={data} />
      <DataTable data={data} setData={setData} />
    </div>
  );
}
