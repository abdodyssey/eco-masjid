const mongoose = require("mongoose");

const masjidSchema = new mongoose.Schema(
  {
    nama: String,
    alamat: String,
    kota: String,
    isRamahLingkungan: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Masjid", masjidSchema);
