const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let data = [];

app.get("/data", (req, res) => res.json(data));

app.post("/data", (req, res) => {
  const { produk, customer, total } = req.body;

  if (!produk || !customer || total === undefined) {
    return res
      .status(400)
      .json({ error: "Produk, Customer, dan Total wajib diisi" });
  }

  const newItem = {
    id: Date.now(),
    produk,
    customer,
    total,
    tanggal: new Date().toISOString().split("T")[0],
  };
  data.push(newItem);

  res.json(newItem);
});

app.delete("/data/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((item) => item.id !== id);
  res.json({ message: "Data dihapus" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
