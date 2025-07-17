import { useEffect, useState } from "react";
import axios from "axios";

function AddEvent() {
  const [masjidList, setMasjidList] = useState([]);
  const [form, setForm] = useState({
    namaEvent: "",
    deskripsi: "",
    tanggal: "",
    masjidId: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pengajuan")
      .then((res) => {
        const disetujui = res.data.filter((m) => m.status === "diterima");
        setMasjidList(disetujui);
      })
      .catch(() => setMasjidList([]));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/event", form);
      setMessage("Event berhasil ditambahkan.");
      setForm({ namaEvent: "", deskripsi: "", tanggal: "", masjidId: "" });
    } catch (err) {
      setMessage("Gagal menambahkan event.", err);
    }
  };

  return (
    <section className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-emerald-800 mb-4">
        Tambah Event Baru
      </h1>

      {message && <p className="mb-4 text-sm text-gray-700">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="namaEvent"
          value={form.namaEvent}
          onChange={handleChange}
          placeholder="Nama Event"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi (optional)"
          rows={3}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="tanggal"
          type="date"
          value={form.tanggal}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="masjidId"
          value={form.masjidId}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Pilih Masjid</option>
          {masjidList.map((masjid) => (
            <option key={masjid._id} value={masjid._id}>
              {masjid.namaMasjid} - {masjid.kabupaten}, {masjid.provinsi}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
        >
          Simpan Event
        </button>
      </form>
    </section>
  );
}

export default AddEvent;
