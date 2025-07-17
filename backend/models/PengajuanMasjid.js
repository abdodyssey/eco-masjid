// models/PengajuanMasjid.js
const mongoose = require("mongoose");

const PengajuanSchema = new mongoose.Schema({
    namaMasjid: { type: String, required: true },
    provinsi: { type: String, required: true },
    kabupaten: { type: String, required: true },
    lokasiDetail: String,
    deskripsi: String,
    pengusul: { type: String, required: true },
    kontak: String,
    lampiranSuratKeterangan: String, // path file
    lampiranBuktiPengurus: String,   // path file
    status: {
        type: String,
        enum: ["menunggu", "diterima", "ditolak"],
        default: "menunggu",
    },
    tanggalPengajuan: { type: Date, default: Date.now },
    isRamahLingkungan: { type: Boolean, default: true }
});

module.exports = mongoose.model("PengajuanMasjid", PengajuanSchema);
