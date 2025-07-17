import { useEffect, useState } from "react";
import axios from "axios";
import MasjidCard from "../components/MasjidCard";
import { LoaderCircle, XCircle } from "lucide-react";

function MasjidList() {
  const [masjidData, setMasjidData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyGreen, setOnlyGreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/masjid")
      .then((res) => setMasjidData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data masjid. Silakan coba lagi.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredMasjid = masjidData.filter((masjid) => {
    const matchNama = masjid.nama
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchKota = masjid.kota
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchSearch = matchNama || matchKota;
    const matchFilter = onlyGreen ? masjid.isRamahLingkungan : true;
    return matchSearch && matchFilter;
  });

  const resetFilter = () => {
    setSearchTerm("");
    setOnlyGreen(false);
  };

  return (
    <section className="max-w-5xl mx-auto py-8 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">
        Daftar Masjid
      </h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari nama atau kota masjid..."
          className="w-full border px-4 py-2 rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="flex items-center gap-2 text-sm text-green-700">
          <input
            type="checkbox"
            checked={onlyGreen}
            onChange={(e) => setOnlyGreen(e.target.checked)}
            className="accent-green-700"
          />
          Tampilkan hanya masjid ramah lingkungan
        </label>
        {(searchTerm || onlyGreen) && (
          <button
            onClick={resetFilter}
            className="text-sm text-red-600 flex items-center hover:underline"
          >
            <XCircle className="w-4 h-4 mr-1" /> Reset Filter
          </button>
        )}
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
          Tidak ada masjid yang cocok.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredMasjid.map((masjid) => (
          <MasjidCard key={masjid._id} masjid={masjid} />
        ))}
      </div>
    </section>
  );
}

export default MasjidList;
