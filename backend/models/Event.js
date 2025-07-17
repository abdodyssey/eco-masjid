const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    judul: String,
    deskripsi: String,
    tanggal: Date,
    lokasi: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
