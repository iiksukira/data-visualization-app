const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let data = [];

app.get("/data", (req, res) => res.json(data));

app.post("/data", (req, res) => {
  const { name, value } = req.body;

  if (!name || value === undefined) {
    return res.status(400).json({ error: "Name dan Value wajib diisi" });
  }

  const newItem = { id: Date.now(), name, value };
  data.push(newItem);

  res.json(newItem);
});

app.delete("/data/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((item) => item.id !== id);
  res.json({ message: "Data dihapus" });
});

app.listen(3000, () => console.log("Server backend jalan di port 3000"));
