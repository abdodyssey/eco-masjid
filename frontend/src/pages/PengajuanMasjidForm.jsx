import { useState, useEffect } from "react";
import axios from "axios";

function PengajuanMasjidForm() {
  const [form, setForm] = useState({
    namaMasjid: "",
    provinsi: "",
    kabupaten: "",
    lokasiDetail: "",
    deskripsi: "",
    pengusul: "",
    kontak: "",
  });
  const [lampiranSurat, setLampiranSurat] = useState(null);
  const [lampiranSK, setLampiranSK] = useState(null);

  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get provinsi
  useEffect(() => {
    axios.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then(res => setProvinsiList(res.data))
      .catch(() => setError("Gagal memuat daftar provinsi"));
  }, []);

  // Get kabupaten berdasarkan provinsi
  useEffect(() => {
    if (form.provinsi) {
      const selectedProv = provinsiList.find(p => p.name === form.provinsi);
      if (selectedProv) {
        axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProv.id}.json`)
          .then(res => setKabupatenList(res.data))
          .catch(() => setKabupatenList([]));
      }
    }
  }, [form.provinsi]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.namaMasjid || !form.provinsi || !form.kabupaten || !form.pengusul || !form.kontak || !lampiranSurat || !lampiranSK) {
      setError("Harap lengkapi semua field wajib termasuk unggahan file.");
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    formData.append("lampiranSuratKeterangan", lampiranSurat);
    formData.append("lampiranBuktiPengurus", lampiranSK);

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/pengajuan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Pengajuan berhasil dikirim! Menunggu verifikasi admin.");
      setForm({
        namaMasjid: "",
        provinsi: "",
        kabupaten: "",
        lokasiDetail: "",
        deskripsi: "",
        pengusul: "",
        kontak: "",
      });
      setLampiranSK(null);
      setLampiranSurat(null);
    } catch (err) {
      setError("Gagal mengirim pengajuan.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4 text-center">
        Formulir Pengajuan Masjid Ramah Lingkungan
      </h1>

      <p className="text-sm text-gray-700 mb-6 leading-relaxed text-justify">
        Isi form berikut untuk mengajukan masjid sebagai masjid ramah lingkungan. Lengkapi dengan surat keterangan dan SK pengurus sebagai bukti validasi.
      </p>

      {error && (
        <p className="text-red-600 bg-red-50 px-3 py-2 rounded mb-4 border border-red-200">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-600 bg-green-50 px-3 py-2 rounded mb-4 border border-green-200">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="namaMasjid" value={form.namaMasjid} onChange={handleChange} placeholder="Nama Masjid *" className="w-full border px-4 py-2 rounded" />
        
        <select name="provinsi" value={form.provinsi} onChange={handleChange} className="w-full border px-4 py-2 rounded">
          <option value="">Pilih Provinsi *</option>
          {provinsiList.map((prov) => (
            <option key={prov.id} value={prov.name}>{prov.name}</option>
          ))}
        </select>

        <select name="kabupaten" value={form.kabupaten} onChange={handleChange} className="w-full border px-4 py-2 rounded">
          <option value="">Pilih Kabupaten/Kota *</option>
          {kabupatenList.map((kab) => (
            <option key={kab.id} value={kab.name}>{kab.name}</option>
          ))}
        </select>

        <input name="lokasiDetail" value={form.lokasiDetail} onChange={handleChange} placeholder="Alamat lengkap" className="w-full border px-4 py-2 rounded" />

        <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} placeholder="Deskripsi Singkat (opsional)" rows={3} className="w-full border px-4 py-2 rounded"></textarea>

        <input name="pengusul" value={form.pengusul} onChange={handleChange} placeholder="Nama Pengusul (Marbot/Pengurus) *" className="w-full border px-4 py-2 rounded" />

        <input name="kontak" value={form.kontak} onChange={handleChange} placeholder="Kontak (WhatsApp / Email) *" className="w-full border px-4 py-2 rounded" />

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Lampiran Surat Keterangan Ramah Lingkungan (PDF) *</label>
          <input type="file" accept=".pdf" onChange={(e) => setLampiranSurat(e.target.files[0])} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Lampiran Bukti SK Pengurus Masjid (Sesuai nama pengusul) (PDF) *</label>
          <input type="file" accept=".pdf" onChange={(e) => setLampiranSK(e.target.files[0])} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800 ${loading && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? "Mengirim..." : "Kirim Pengajuan"}
        </button>
      </form>
    </section>
  );
}

export default PengajuanMasjidForm;
