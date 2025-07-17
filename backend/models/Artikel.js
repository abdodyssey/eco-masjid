const mongoose = require("mongoose");

const ArtikelSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
    trim: true,
  },
  ringkasan: {
    type: String,
    trim: true,
  },
  isi: {
    type: String,
    required: true,
  },
  penulis: {
    type: String,
    default: "Admin",
    trim: true,
  },
  tanggal: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Artikel", ArtikelSchema);
