import { Link } from "react-router-dom";

function ArtikelCard({ artikel }) {
  return (
    <Link to={`/artikel/${artikel._id}`}>
      <div className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
        <p className="text-xs text-emerald-600 mb-1">{artikel.kategori}</p>
        <h3 className="text-lg font-semibold text-emerald-800">{artikel.judul}</h3>
        <p className="text-sm text-gray-600 mb-2">{artikel.ringkasan}</p>
        <p className="text-xs text-gray-400">
          {new Date(artikel.tanggal).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default ArtikelCard;
