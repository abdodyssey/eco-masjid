import { useState, useEffect } from "react";
import axios from "axios";
import KampanyeCard from "../components/KampanyeCard";
import { Search } from "lucide-react";

function KampanyeForm() {
  const [formData, setFormData] = useState({
    namaPengusul: "",
    namaMasjid: "",
    lokasi: "",
    ide: "",
  });

  const [kampanyeList, setKampanyeList] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchKampanye = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/kampanye");
      setKampanyeList(res.data);
    } catch (err) {
      console.error("Gagal fetch kampanye:", err);
    }
  };

  useEffect(() => {
    fetchKampanye();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleResetForm = () => {
    setFormData({ namaPengusul: "", namaMasjid: "", lokasi: "", ide: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.namaPengusul ||
      !formData.namaMasjid ||
      !formData.lokasi ||
      !formData.ide
    ) {
      setError("Mohon lengkapi semua isian sebelum mengirim.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/kampanye", formData);
      setFormData({ namaPengusul: "", namaMasjid: "", lokasi: "", ide: "" });
      fetchKampanye();
    } catch (err) {
      console.error("Gagal mengirim kampanye:", err);
      setError("Terjadi kesalahan saat mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  const filteredList = kampanyeList.filter((k) =>
    `${k.namaMasjid} ${k.lokasi}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-3xl mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4 text-center">
        Kampanye <span className="text-emerald-600">Hijaukan Masjidku</span>
      </h1>

      <p className="text-gray-700 text-sm mb-6 text-justify leading-relaxed">
        Kirimkan ide penghijauan untuk masjid di sekitarmu. Ide kamu bisa
        menginspirasi aksi nyata seperti taman, panel surya, atau bank sampah!
      </p>

      {error && (
        <p className="text-red-600 text-sm mb-2 bg-red-50 px-3 py-2 rounded border border-red-300">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="namaPengusul"
          placeholder="Nama Pengusul"
          value={formData.namaPengusul}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="namaMasjid"
          placeholder="Nama Masjid"
          value={formData.namaMasjid}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="lokasi"
          placeholder="Lokasi Masjid"
          value={formData.lokasi}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="ide"
          rows="4"
          placeholder="Tulis ide penghijauan yang ingin kamu wujudkan..."
          value={formData.ide}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        ></textarea>

        <div className="flex gap-3 items-center">
          <button
            type="submit"
            className={`bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Usulan"}
          </button>

          <button
            type="button"
            onClick={handleResetForm}
            className="text-sm text-gray-600 underline hover:text-gray-800"
          >
            Reset Form
          </button>
        </div>
      </form>

      {kampanyeList.length > 0 && (
        <>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama masjid atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded shadow-sm"
            />
          </div>

          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
            Usulan Penghijauan dari Umat
          </h2>
          {filteredList.length > 0 ? (
            <div className="grid gap-4">
              {filteredList.map((kampanye) => (
                <KampanyeCard key={kampanye._id} data={kampanye} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Tidak ditemukan hasil pencarian.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default KampanyeForm;
