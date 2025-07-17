const express = require("express");
const router = express.Router();
const Artikel = require("../models/Artikel");


router.get("/", async (req, res) => {
    try {
        const data = await Artikel.find().sort({ tanggal: -1 });
        res.json(data);
    } catch (err) {
        console.error("Gagal mengambil artikel:", err);
        res.status(500).json({ message: "Gagal mengambil artikel" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const artikel = await Artikel.findById(req.params.id);
        if (!artikel) {
            return res.status(404).json({ message: "Artikel tidak ditemukan" });
        }
        res.json(artikel);
    } catch (err) {
        console.error("Gagal mengambil detail artikel:", err);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/", async (req, res) => {
    try {
        const { judul, isi, penulis } = req.body;

        if (!judul || !isi) {
            return res.status(400).json({ message: "Judul dan isi artikel wajib diisi." });
        }

        const artikelBaru = new Artikel({
            judul,
            isi,
            penulis: penulis || "Admin",
            tanggal: new Date(),
        });

        const saved = await artikelBaru.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error("Gagal menyimpan artikel:", err);
        res.status(500).json({ message: "Gagal menyimpan artikel" });
    }
});

module.exports = router;
