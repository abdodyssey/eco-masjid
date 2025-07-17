const mongoose = require("mongoose");

const artikelSchema = new mongoose.Schema(
  {
    judul: String,
    ringkasan: String,
    isi: String,
    kategori: String,
    tanggal: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artikel", artikelSchema);
