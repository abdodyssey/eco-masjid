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
import AddEvent from "./AddEvent";

function AdminDashboard() {
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [activeTab, setActiveTab] = useState("verifikasi");
  const [eventList, setEventList] = useState([]);

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

  const fetchEventList = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/event");
      setEventList(res.data);
    } catch (err) {
      console.error("Gagal mengambil event", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Yakin ingin menghapus event ini?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/event/${id}`);
      setMessage("Event berhasil dihapus.");
      fetchEventList();
    } catch (err) {
      console.error("Gagal menghapus event", err);
    }
  };

  useEffect(() => {
    fetchPengajuan();
    fetchEventList();
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
      <aside className="w-64 bg-emerald-800 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin EcoMasjid</h2>
        <nav className="space-y-4">
          <button
            onClick={() => {
              setShowAddEvent(false);
              setActiveTab("verifikasi");
            }}
            className={`flex items-center gap-2 text-white hover:text-emerald-200 ${
              activeTab === "verifikasi" ? "font-semibold" : ""
            }`}
          >
            <LayoutDashboard size={18} />
            Verifikasi Masjid
          </button>

          <button
            onClick={() => {
              setShowAddEvent(false);
              setActiveTab("eventList");
            }}
            className={`flex items-center gap-2 text-white hover:text-emerald-200 ${
              activeTab === "eventList" ? "font-semibold" : ""
            }`}
          >
            <LayoutDashboard size={18} />
            Daftar Event
          </button>

          <button
            onClick={() => {
              setShowAddEvent(true);
              setActiveTab("tambahEvent");
            }}
            className={`flex items-center gap-2 text-white hover:text-emerald-200 ${
              activeTab === "tambahEvent" ? "font-semibold" : ""
            }`}
          >
            <Plus size={18} />
            Tambah Event
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-emerald-200"
          >
            <LogOut size={18} />
            Logout
          </Link>
        </nav>
      </aside>

      <main className="flex-1 px-4 md:px-10 py-8">
        {activeTab === "verifikasi" && !showAddEvent && (
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
        )}

        {activeTab === "eventList" && (
          <>
            <h1 className="text-2xl font-bold text-emerald-800 mb-4">
              Daftar Event
            </h1>
            {eventList.length === 0 ? (
              <p className="text-gray-500">Belum ada event.</p>
            ) : (
              <div className="space-y-4">
                {eventList.map((event) => (
                  <div
                    key={event._id}
                    className="rounded-xl p-4 bg-white shadow flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-emerald-800">
                        {event.namaEvent}
                      </h2>
                      <p className="text-sm text-gray-700">
                        {event.lokasi.namaMasjid} - {event.lokasi.alamat}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tanggal:{" "}
                        {new Date(event.tanggal).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {showAddEvent && <AddEvent onClose={() => setShowAddEvent(false)} />}
      </main>
    </div>
  );
}

export default AdminDashboard;
