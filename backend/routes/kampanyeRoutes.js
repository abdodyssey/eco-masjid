const express = require("express");
const Kampanye = require("../models/Kampanye");
const router = express.Router();

// GET semua kampanye
router.get("/", async (req, res) => {
  const kampanye = await Kampanye.find().sort({ createdAt: -1 });
  res.json(kampanye);
});

// POST kampanye baru
router.post("/", async (req, res) => {
  const data = req.body;
  const kampanyeBaru = new Kampanye(data);
  const saved = await kampanyeBaru.save();
  res.status(201).json(saved);
});

module.exports = router;
