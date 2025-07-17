const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// GET semua event
router.get("/", async (req, res) => {
  const data = await Event.find().sort({ tanggal: 1 });
  res.json(data);
});

// POST event baru (opsional)
router.post("/", async (req, res) => {
  const eventBaru = new Event(req.body);
  const saved = await eventBaru.save();
  res.status(201).json(saved);
});

module.exports = router;
