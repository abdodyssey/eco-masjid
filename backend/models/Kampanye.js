const mongoose = require("mongoose");

const kampanyeSchema = new mongoose.Schema(
    {
        namaPengusul: String,
        namaMasjid: String,
        lokasi: String,
        ide: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Kampanye", kampanyeSchema);
