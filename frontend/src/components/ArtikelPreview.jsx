import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ArtikelPreview = () => {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/artikel")
      .then((res) => {
        setArtikelList(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Gagal memuat artikel:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="text-emerald-800 py-16 px-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">
          Daftar Artikel
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Memuat artikel...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artikelList.map((artikel) => (
              <div
                key={artikel._id}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {artikel.judul}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {artikel.ringkasan || artikel.isi.slice(0, 100) + "..."}
                  </p>
                  <Link
                    to={`/artikel/${artikel._id}`}
                    className="text-green-700 font-medium hover:text-green-900 transition"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtikelPreview;
