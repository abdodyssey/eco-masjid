import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MasjidCard from "../components/MasjidCard";
import { LoaderCircle, PlusCircle, Search } from "lucide-react";

function MasjidList() {
  const [masjidData, setMasjidData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pengajuan/")
      .then((res) => setMasjidData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data masjid. Silakan coba lagi.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Mapping data dari PengajuanMasjid ke format yang dibutuhkan MasjidCard
  const mappedMasjid = masjidData.map((item) => ({
    _id: item._id,
    nama: item.namaMasjid,
    kota: item.kabupaten, // Menggunakan kabupaten sebagai kota
    alamat: item.lokasiDetail || `${item.kabupaten}, ${item.provinsi}`,
    provinsi: item.provinsi,
    deskripsi: item.deskripsi,
    pengusul: item.pengusul,
    kontak: item.kontak,
    tanggalPengajuan: item.tanggalPengajuan,
    isRamahLingkungan: true,
  }));

  const filteredMasjid = mappedMasjid.filter((masjid) => {
    const matchNama = masjid.nama
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchKota = masjid.kota
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchProvinsi = masjid.provinsi
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchSearch = matchNama || matchKota || matchProvinsi;
    return matchSearch;
  });

  return (
    <section className="max-w-5xl mx-auto py-8 px-4 min-h-screen">
      {/* Header & Tombol Ajukan */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold text-emerald-800 text-center md:text-left">
          Daftar Masjid Ramah Lingkungan
        </h1>
        <Link
          to="/pengajuan"
          className="bg-emerald-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-emerald-800 w-fit mx-auto md:mx-0"
        >
          <PlusCircle className="w-5 h-5" />
          Daftarkan masjid
        </Link>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama masjid, kota, atau provinsi..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white shadow placeholder:text-sm text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Status */}
      {loading && (
        <div className="text-center text-gray-600 flex justify-center items-center gap-2">
          <LoaderCircle className="animate-spin" /> Memuat data masjid...
        </div>
      )}
      {error && (
        <p className="text-red-600 text-center bg-red-50 py-2 px-3 rounded border border-red-200 mb-4">
          {error}
        </p>
      )}
      {!loading && !error && filteredMasjid.length === 0 && (
        <p className="text-center text-gray-500">
          Tidak ada masjid yang cocok dengan pencarian.
        </p>
      )}

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredMasjid.map((masjid) => (
          <MasjidCard key={masjid._id} masjid={masjid} />
        ))}
      </div>
    </section>
  );
}

export default MasjidList;
