import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  LogOut,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import AddEvent from "./AddEvent"; // Pastikan path sesuai

function AdminDashboard() {
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showAddEvent, setShowAddEvent] = useState(false);

  const fetchPengajuan = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/pengajuan/all");
      const menunggu = res.data.filter((item) => item.status === "menunggu");
      setPengajuan(menunggu);
    } catch (err) {
      console.error(err);
      setMessage("Gagal mengambil data pengajuan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPengajuan();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/api/pengajuan/${id}/status`, {
        status,
      });
      setMessage(
        `Pengajuan berhasil di${status === "diterima" ? "terima" : "tolak"}.`
      );
      fetchPengajuan();
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan saat memperbarui status.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-800 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin EcoMasjid</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setShowAddEvent(false)}
            className="flex items-center gap-2 text-white hover:text-emerald-200"
          >
            <LayoutDashboard size={18} />
            Verifikasi Masjid
          </button>

          <button
            onClick={() => setShowAddEvent(true)}
            className="flex items-center gap-2 text-white hover:text-emerald-200"
          >
            <Plus size={18} />
            Tambah Event
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-emerald-200"
          >
            <LogOut size={18} />
            Kembali ke Home
          </Link>
        </nav>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 px-4 md:px-10 py-8">
        {!showAddEvent ? (
          <>
            <h1 className="text-2xl font-bold text-emerald-800 mb-4">
              Verifikasi Pengajuan Masjid
            </h1>

            {message && (
              <p className="text-emerald-800 text-sm mb-4">{message}</p>
            )}

            {loading ? (
              <p className="text-gray-500">Memuat data...</p>
            ) : pengajuan.length === 0 ? (
              <p className="text-gray-500">Tidak ada pengajuan menunggu.</p>
            ) : (
              <div className="space-y-6">
                {pengajuan.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-xl p-4 shadow hover:shadow-md transition bg-white"
                  >
                    <h2 className="text-lg font-semibold text-emerald-800 mb-1">
                      {item.namaMasjid}
                    </h2>
                    <p className="text-sm text-gray-700 mb-1">
                      {item.lokasiDetail}, {item.kabupaten}, {item.provinsi}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Pengusul: {item.pengusul}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Kontak: {item.kontak}
                    </p>

                    <div className="flex gap-3">
                      <a
                        href={`http://localhost:3000/uploads/${item.lampiranSuratKeterangan}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-700 underline"
                      >
                        Lihat Surat Keterangan
                      </a>
                      <a
                        href={`http://localhost:3000/uploads/${item.lampiranBuktiPengurus}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-700 underline"
                      >
                        Lihat Bukti Pengurus
                      </a>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleAction(item._id, "diterima")}
                        className="flex items-center gap-1 px-4 py-2 text-white bg-emerald-700 hover:bg-emerald-800 rounded"
                      >
                        <CheckCircle size={16} />
                        Terima
                      </button>
                      <button
                        onClick={() => handleAction(item._id, "ditolak")}
                        className="flex items-center gap-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                      >
                        <XCircle size={16} />
                        Tolak
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <AddEvent onClose={() => setShowAddEvent(false)} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
