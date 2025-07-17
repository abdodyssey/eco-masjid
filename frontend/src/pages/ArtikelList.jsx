import { useEffect, useState } from "react";
import axios from "axios";
import ArtikelCard from "../components/ArtikelCard";
import { LoaderCircle } from "lucide-react";

function ArtikelList() {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section className="max-w-4xl mx-auto py-8 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4 text-center">
        Artikel Edukasi Islam & Lingkungan
      </h1>

      <p className="text-center text-sm text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
        Bacaan singkat seputar ajaran Islam dalam menjaga bumi dan mengelola sumber daya
        dengan bijak. Dapatkan panduan langsung untuk diterapkan dalam kehidupan sehari-hari.
      </p>

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

      {!loading && !error && artikelList.length === 0 && (
        <p className="text-center text-gray-500">Belum ada artikel yang tersedia.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {artikelList.map((artikel) => (
          <ArtikelCard key={artikel._id} artikel={artikel} />
        ))}
      </div>
    </section>
  );
}

export default ArtikelList;
