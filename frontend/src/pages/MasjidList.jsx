import { useEffect, useState } from "react";
import {
  LoaderCircle,
  PlusCircle,
  Search,
  X,
  MapPin,
  Phone,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

function MasjidCard({ masjid, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow p-4 hover:shadow-md transition cursor-pointer flex flex-col justify-between h-full"
      onClick={() => onClick(masjid)}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-emerald-800 leading-snug">
          {masjid.nama}
        </h3>

        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1.5" />
          <span className="capitalize">
            {masjid.kota}, {masjid.provinsi}
          </span>
        </div>

        <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
          {masjid.deskripsi || "Belum ada deskripsi"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
          Ramah Lingkungan
        </span>
        <span className="text-xs text-gray-500">
          {new Date(masjid.tanggalPengajuan).toLocaleDateString("id-ID")}
        </span>
      </div>
    </div>
  );
}

function MasjidDetailPopup({ masjid, onClose }) {
  if (!masjid) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-emerald-800">{masjid.nama}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800">Lokasi</p>
              <p className="text-sm text-gray-600">{masjid.alamat}</p>
              <p className="text-sm text-gray-500">
                {masjid.kota}, {masjid.provinsi}
              </p>
            </div>
          </div>

          {masjid.deskripsi && (
            <div>
              <p className="text-sm font-medium text-gray-800 mb-1">
                Deskripsi
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {masjid.deskripsi}
              </p>
            </div>
          )}

          {masjid.kontak && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Kontak</p>
                <p className="text-sm text-gray-600">{masjid.kontak}</p>
              </div>
            </div>
          )}

          <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-emerald-800">
              Masjid Ramah Lingkungan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MasjidList() {
  const [masjidData, setMasjidData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMasjid, setSelectedMasjid] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pengajuan/")
      .then((res) => setMasjidData(res.data))
      .catch(() => setError("Gagal memuat data masjid. Silakan coba lagi."))
      .finally(() => setLoading(false));
  }, []);

  const mappedMasjid = masjidData.map((item) => ({
    _id: item._id,
    nama: item.namaMasjid,
    kota: item.kabupaten,
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
    return matchNama || matchKota || matchProvinsi;
  });

  const handleCardClick = (masjid) => {
    setSelectedMasjid(masjid);
  };

  const handleClosePopup = () => {
    setSelectedMasjid(null);
  };

  return (
    <>
      <section className="max-w-5xl mx-auto py-8 px-4 min-h-screen">
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

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredMasjid.map((masjid) => (
            <MasjidCard
              key={masjid._id}
              masjid={masjid}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </section>

      <MasjidDetailPopup masjid={selectedMasjid} onClose={handleClosePopup} />
    </>
  );
}

export default MasjidList;
