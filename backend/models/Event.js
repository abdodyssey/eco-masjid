const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  namaEvent: { type: String, required: true },
  deskripsi: String,
  tanggal: { type: Date, required: true },
  lokasi: {
    masjidId: { type: mongoose.Schema.Types.ObjectId, ref: "PengajuanMasjid", required: true },
    namaMasjid: String,
    alamat: String,
  },
  dibuatPada: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
