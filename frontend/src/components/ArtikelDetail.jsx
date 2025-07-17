import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ArtikelDetail() {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/artikel/${id}`).then((res) => {
      setArtikel(res.data);
    });
  }, [id]);

  if (!artikel) return <p className="text-center py-10">Memuat artikel...</p>;

  return (
    <section className="max-w-3xl mx-auto py-10 px-4 min-h-screen">
      <Link to="/artikel" className="text-emerald-600 text-sm underline mb-4 block">
        ← Kembali ke daftar artikel
      </Link>

      <p className="text-xs text-emerald-600 mb-1">{artikel.kategori}</p>
      <h1 className="text-3xl font-bold text-emerald-800 mb-4">{artikel.judul}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(artikel.tanggal).toLocaleDateString()}
      </p>

      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {artikel.isi}
      </div>
    </section>
  );
}

export default ArtikelDetail;
