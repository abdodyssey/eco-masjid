const express = require("express");
const Masjid = require("../models/Masjid");
const router = express.Router();


router.get("/", async (req, res) => {
  const data = await Masjid.find().sort({ nama: 1 });
  res.json(data);
});


router.post("/", async (req, res) => {
  const masjidBaru = new Masjid(req.body);
  const saved = await masjidBaru.save();
  res.status(201).json(saved);
});

module.exports = router;
