import { useEffect, useState } from "react";
import axios from "axios";
import ArtikelCard from "../components/ArtikelCard";
import { LoaderCircle, Search } from "lucide-react";

function ArtikelList() {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/artikel")
      .then((res) => setArtikelList(res.data))
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat artikel. Coba lagi nanti.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredArtikel = artikelList.filter((artikel) =>
    artikel.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="max-w-4xl mx-auto py-8 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4 text-center">
        Artikel Edukasi Islam & Lingkungan
      </h1>

      <p className="text-center text-sm text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
        Bacaan singkat seputar ajaran Islam dalam menjaga bumi dan mengelola
        sumber daya dengan bijak. Dapatkan panduan langsung untuk diterapkan
        dalam kehidupan sehari-hari.
      </p>

      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Cari artikel berdasarkan judul..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {loading && (
        <div className="text-center text-gray-600 flex justify-center items-center gap-2">
          <LoaderCircle className="animate-spin" /> Memuat artikel...
        </div>
      )}

      {error && (
        <p className="text-center text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 mb-4">
          {error}
        </p>
      )}

      {!loading && !error && filteredArtikel.length === 0 && (
        <p className="text-center text-gray-500">
          {artikelList.length === 0
            ? "Belum ada artikel yang tersedia."
            : "Artikel tidak ditemukan."}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {filteredArtikel.map((artikel) => (
          <ArtikelCard key={artikel._id} artikel={artikel} />
        ))}
      </div>
    </section>
  );
}

export default ArtikelList;
