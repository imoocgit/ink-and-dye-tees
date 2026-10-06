/**
 * Ink & Dye Tees - Scalable Node.js / Express Backend Architecture
 * Ready for SQLite (via better-sqlite3 or sqlite3) integration.
 */
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const PUBLIC_DIR = path.join(__dirname, "..", "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "..", "public")));
// app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.static(PUBLIC_DIR));

// Data helper
const dataFilePath = path.join(__dirname, "..", "data", "products.json");
const getData = () => JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
const saveData = (data) =>
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

// API Routes
app.get("/api/products", (req, res) => {
  app.use("/assets", express.static(path.join(__dirname, "..", "/assets")));
  const data = getData();
  res.json(data.products);
});

app.get("/api/orders", (req, res) => {
  const data = getData();
  res.json(data.orders || []);
});

app.post("/api/orders", (req, res) => {
  const data = getData();
  const newOrder = { id: Date.now(), ...req.body, createdAt: new Date() };
  data.orders = data.orders || [];
  data.orders.push(newOrder);
  saveData(data);
  res.json({ success: true, order: newOrder });
});

// Explicit Page Routing for Multi-Page Setup
app.get("/", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "index.html")));
app.get("/shop", (req, res) =>
  res.sendFile(path.join(PUBLIC_DIR, "shop.html")),
);
app.get("/custom", (req, res) =>
  res.sendFile(path.join(PUBLIC_DIR, "custom.html")),
);
app.get("/about", (req, res) =>
  res.sendFile(path.join(PUBLIC_DIR, "about.html")),
);
app.get("/faq", (req, res) => res.sendFile(path.join(PUBLIC_DIR, "faq.html")));
app.get("/contact", (req, res) =>
  res.sendFile(path.join(PUBLIC_DIR, "contact.html")),
);

app.listen(PORT, () => {
  console.log(`⚡ Ink & Dye Tees server running at http://localhost:${PORT}`);
});
