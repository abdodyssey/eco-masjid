import { useState } from "react";
import KalkulatorForm from "../components/KalkulatorForm";

function KalkulatorKarbon() {
  const [data, setData] = useState({
    listrik: "",
    air: "",
    plastik: "",
  });
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleReset = () => {
    setData({ listrik: "", air: "", plastik: "" });
    setHasil(null);
    setError("");
  };

  const hitungKarbon = (e) => {
    e.preventDefault();

    const listrik = parseFloat(data.listrik);
    const air = parseFloat(data.air);
    const plastik = parseFloat(data.plastik);

    if (
      isNaN(listrik) ||
      isNaN(air) ||
      isNaN(plastik) ||
      listrik < 0 ||
      air < 0 ||
      plastik < 0
    ) {
      setError("Mohon masukkan angka yang valid dan tidak negatif.");
      return;
    }

    const total = listrik * 0.85 + air * 0.34 + plastik * 6.0;

    let kategori = "Rendah";
    if (total > 100) kategori = "Tinggi";
    else if (total > 50) kategori = "Sedang";

    setHasil({ total: total.toFixed(2), kategori });
  };

  const getKategoriWarna = (kategori) => {
    if (kategori === "Rendah") return "text-emerald-700";
    if (kategori === "Sedang") return "text-yellow-600";
    return "text-red-700";
  };

  return (
    <section className="max-w-2xl mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4 text-center">
        Kalkulator Jejak Karbon Masjid
      </h1>

      <p className="text-gray-700 text-sm mb-6 text-justify leading-relaxed">
        <strong>Jejak karbon</strong> adalah jumlah emisi karbon dioksida (CO₂)
        yang dihasilkan dari aktivitas sehari-hari. Masjid sebagai pusat
        kegiatan umat juga menyumbang jejak karbon melalui penggunaan{" "}
        <strong>listrik</strong>, <strong>air</strong>, dan{" "}
        <strong>plastik sekali pakai</strong>. Gunakan kalkulator ini untuk
        memperkirakan seberapa besar dampaknya dan mulai lakukan perbaikan demi
        lingkungan yang lebih baik.
      </p>

      {error && (
        <p className="bg-red-50 border border-red-300 text-red-700 text-sm px-4 py-2 rounded mb-4">
          {error}
        </p>
      )}

      <KalkulatorForm
        handleChange={handleChange}
        handleReset={handleReset}
        data={data}
        hitungKarbon={hitungKarbon}
      />

      {hasil && (
        <div className="bg-white border p-4 rounded shadow text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Total Emisi:
            <span className="text-emerald-700">
              {" "}
              {hasil.total} kg CO₂/bulan
            </span>
          </p>
          <p
            className={`text-sm font-medium ${getKategoriWarna(
              hasil.kategori
            )}`}
          >
            Kategori: {hasil.kategori}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Estimasi berdasarkan: listrik × 0.85 + air × 0.34 + plastik × 6.0
          </p>
        </div>
      )}
    </section>
  );
}

export default KalkulatorKarbon;
