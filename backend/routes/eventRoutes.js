const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Pengajuan = require("../models/PengajuanMasjid");


router.post("/", async (req, res) => {
  try {
    const { namaEvent, deskripsi, tanggal, masjidId } = req.body;

    const masjid = await Pengajuan.findOne({ _id: masjidId, status: "diterima" });
    if (!masjid) return res.status(404).json({ message: "Masjid tidak ditemukan atau belum diterima" });

    const newEvent = new Event({
      namaEvent,
      deskripsi,
      tanggal,
      lokasi: {
        masjidId,
        namaMasjid: masjid.namaMasjid,
        alamat: masjid.lokasiDetail || `${masjid.kabupaten}, ${masjid.provinsi}`,
      },
    });

    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan event", error: err });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await Event.find().sort({ tanggal: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data event" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event tidak ditemukan" });

    res.json({ message: "Event berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus event", error: err });
  }
});

module.exports = router;
