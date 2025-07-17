const express = require("express");
const router = express.Router();
const Pengajuan = require("../models/PengajuanMasjid");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname, "../uploads/lampiran");
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + file.originalname;
        cb(null, unique);
    },
});

const upload = multer({ storage });


router.post(
    "/",
    upload.fields([
        { name: "lampiranSuratKeterangan", maxCount: 1 },
        { name: "lampiranBuktiPengurus", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const { namaMasjid, provinsi, kabupaten, lokasiDetail, deskripsi, pengusul, kontak } = req.body;

            const newPengajuan = new Pengajuan({
                namaMasjid,
                provinsi,
                kabupaten,
                lokasiDetail,
                deskripsi,
                pengusul,
                kontak,
                lampiranSuratKeterangan: req.files?.lampiranSuratKeterangan?.[0]?.filename || "",
                lampiranBuktiPengurus: req.files?.lampiranBuktiPengurus?.[0]?.filename || "",
            });

            const saved = await newPengajuan.save();
            res.status(201).json(saved);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Gagal mengirim pengajuan", error: err });
        }
    }
);

// ========================
// GET: Semua pengajuan (admin)
// ========================
router.get("/", async (req, res) => {
    try {
        const data = await Pengajuan.find().sort({ tanggalPengajuan: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
});

// ========================
// GET: Pengajuan yang sudah diterima (untuk publik)
// ========================
router.get("/disetujui", async (req, res) => {
    try {
        const data = await Pengajuan.find({ status: "diterima" }).sort({ tanggalPengajuan: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data disetujui" });
    }
});

// ========================
// PUT: Update status pengajuan
// ========================
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        const update = await Pengajuan.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(update);
    } catch (err) {
        res.status(500).json({ message: "Gagal memperbarui status" });
    }
});

// ========================
// DELETE: Hapus pengajuan
// ========================
router.delete("/:id", async (req, res) => {
    try {
        const pengajuan = await Pengajuan.findById(req.params.id);
        if (!pengajuan) return res.status(404).json({ message: "Pengajuan tidak ditemukan" });

        // Hapus file lampiran jika ada
        const lampiranPath = path.join(__dirname, "../uploads/lampiran");
        if (pengajuan.lampiranSuratKeterangan)
            fs.unlinkSync(path.join(lampiranPath, pengajuan.lampiranSuratKeterangan));
        if (pengajuan.lampiranBuktiPengurus)
            fs.unlinkSync(path.join(lampiranPath, pengajuan.lampiranBuktiPengurus));

        await Pengajuan.findByIdAndDelete(req.params.id);
        res.json({ message: "Pengajuan berhasil dihapus" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal menghapus data" });
    }
});

module.exports = router;
