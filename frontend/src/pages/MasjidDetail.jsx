import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MasjidDetail() {
  const { id } = useParams();
  const [masjid, setMasjid] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/pengajuan/${id}`)
      .then((res) => setMasjid(res.data))
      .catch(() => setError("Gagal memuat data masjid"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-10">Memuat...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!masjid) return null;

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-emerald-800 mb-2">{masjid.namaMasjid}</h1>
      <p className="text-gray-700 mb-4">
        {masjid.lokasiDetail}, {masjid.kabupaten}, {masjid.provinsi}
      </p>
      <p className="text-gray-600 mb-2">Pengusul: {masjid.pengusul}</p>
      <p className="text-gray-600 mb-2">Kontak: {masjid.kontak}</p>
      {masjid.deskripsi && (
        <p className="text-sm text-gray-700 mt-4 leading-relaxed">{masjid.deskripsi}</p>
      )}

      <div className="mt-6 space-y-2">
        <a
          href={`http://localhost:3000/uploads/${masjid.lampiranSuratKeterangan}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Lihat Surat Keterangan
        </a>
        <br />
        <a
          href={`http://localhost:3000/uploads/${masjid.lampiranBuktiPengurus}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Lihat Bukti Pengurus
        </a>
      </div>
    </section>
  );
}

export default MasjidDetail;
