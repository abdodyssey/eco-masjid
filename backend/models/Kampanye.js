// const mongoose = require("mongoose");

// const kampanyeSchema = new mongoose.Schema(
//     {
//         namaPengusul: String,
//         namaMasjid: String,
//         lokasi: String,
//         ide: String,
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Kampanye", kampanyeSchema);


// models/Kampanye.js
const mongoose = require("mongoose");

const KampanyeSchema = new mongoose.Schema({
  namaPengusul: { type: String, required: true },
  masjid: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PengajuanMasjid', 
    required: true 
  },
  ide: { type: String, required: true },
  tanggalPengajuan: { type: Date, default: Date.now },
  // Field lama untuk backward compatibility (optional)
  namaMasjid: String,
  lokasi: String
});

module.exports = mongoose.model("Kampanye", KampanyeSchema);