const express = require("express");
const Artikel = require("../models/Artikel");
const router = express.Router();

// GET semua artikel
router.get("/", async (req, res) => {
    const data = await Artikel.find().sort({ tanggal: -1 });
    res.json(data);
});

// POST artikel baru (opsional untuk admin/editor)
router.post("/", async (req, res) => {
    const artikelBaru = new Artikel(req.body);
    const saved = await artikelBaru.save();
    res.status(201).json(saved);
});

// GET detail artikel by ID
router.get("/:id", async (req, res) => {
    try {
        const artikel = await Artikel.findById(req.params.id);
        if (!artikel) return res.status(404).json({ message: "Artikel tidak ditemukan" });
        res.json(artikel);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
