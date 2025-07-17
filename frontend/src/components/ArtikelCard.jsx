import { Calendar } from "lucide-react";

function ArtikelCard({ artikel }) {
  const { judul, ringkasan, isi, penulis, tanggal } = artikel;

  return (
    <div className="border border-gray-200 p-4 rounded-lg hover:border-emerald-700 transition">
      <h2 className="text-lg font-semibold text-emerald-800 mb-1">{judul}</h2>

      {penulis && (
        <p className="text-xs text-gray-500 mb-1">
          Ditulis oleh <span className="font-medium">{penulis}</span>
        </p>
      )}

      {tanggal && (
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          <Calendar className="w-4 h-4" />{" "}
          {new Date(tanggal).toLocaleDateString("id-ID")}
        </p>
      )}

      <p className="text-sm text-gray-700 mb-2 line-clamp-3">
        {ringkasan || isi.slice(0, 300) + "..."}
      </p>

      <a
        href={`/artikel/${artikel._id}`}
        className="text-sm text-emerald-700 font-medium hover:underline"
      >
        Baca Selengkapnya →
      </a>
    </div>
  );
}

export default ArtikelCard;
