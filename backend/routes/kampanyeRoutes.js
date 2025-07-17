// routes/kampanyeRoutes.js
const express = require("express");
const router = express.Router();
const Kampanye = require("../models/Kampanye");

// GET - Ambil semua kampanye dengan populate data masjid
router.get("/", async (req, res) => {
  try {
    const kampanyeList = await Kampanye.find()
      .populate('masjid', 'namaMasjid kabupaten provinsi lokasiDetail')
      .sort({ tanggalPengajuan: -1 });
    res.json(kampanyeList);
  } catch (err) {
    console.error("Error fetching kampanye:", err);
    res.status(500).json({ message: "Gagal mengambil data kampanye" });
  }
});

// POST - Buat kampanye baru
router.post("/", async (req, res) => {
  try {
    const { namaPengusul, masjidId, ide } = req.body;
    
    // Validasi input
    if (!namaPengusul || !masjidId || !ide) {
      return res.status(400).json({ 
        message: "Semua field harus diisi" 
      });
    }

    const newKampanye = new Kampanye({
      namaPengusul,
      masjid: masjidId,
      ide
    });

    const savedKampanye = await newKampanye.save();
    
    // Populate sebelum mengirim response
    const populatedKampanye = await Kampanye.findById(savedKampanye._id)
      .populate('masjid', 'namaMasjid kabupaten provinsi lokasiDetail');

    res.status(201).json(populatedKampanye);
  } catch (err) {
    console.error("Error creating kampanye:", err);
    res.status(500).json({ message: "Gagal membuat kampanye" });
  }
});

// GET - Ambil kampanye berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const kampanye = await Kampanye.findById(req.params.id)
      .populate('masjid', 'namaMasjid kabupaten provinsi lokasiDetail deskripsi');
    
    if (!kampanye) {
      return res.status(404).json({ message: "Kampanye tidak ditemukan" });
    }
    
    res.json(kampanye);
  } catch (err) {
    console.error("Error fetching kampanye:", err);
    res.status(500).json({ message: "Gagal mengambil data kampanye" });
  }
});

// DELETE - Hapus kampanye (optional, untuk admin)
router.delete("/:id", async (req, res) => {
  try {
    const deletedKampanye = await Kampanye.findByIdAndDelete(req.params.id);
    
    if (!deletedKampanye) {
      return res.status(404).json({ message: "Kampanye tidak ditemukan" });
    }
    
    res.json({ message: "Kampanye berhasil dihapus" });
  } catch (err) {
    console.error("Error deleting kampanye:", err);
    res.status(500).json({ message: "Gagal menghapus kampanye" });
  }
});

module.exports = router;