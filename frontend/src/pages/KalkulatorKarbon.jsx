import { useState } from "react";

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
    <section id="tools" class="py-16 bg-gradient-to-br from-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-green-900 mb-12">Kalkulator Emisi Karbon Masjid</h2>
            
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md drop-shadow-lg overflow-hidden mt-6">
                <div class="md:flex">
                    <div class="md:w-1/2 bg-emerald-800 text-white p-8">
                        <h3 class="text-xl font-bold mb-4">Calculate Your Impact</h3>
                        <p class="mb-6">
                            adalah jumlah emisi karbon dioksida (CO₂) yang dihasilkan dari aktivitas sehari-hari. Masjid sebagai pusat kegiatan umat juga menyumbang jejak karbon melalui penggunaan{" "}
                        </p>
                        <img
                         src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1f689b75-829e-46c4-bdd6-e0aaa1294683.png" 
                         alt="Infographic showing mosque sustainability metrics like energy consumption, water usage, and waste production" class="rounded-lg"
                         />

                    </div>
                    <div class="md:w-1/2 p-8">
                        <form onSubmit={hitungKarbon} className="space-y-4 mb-6">
                              <input
                                type="number"
                                name="listrik"
                                placeholder="Penggunaan listrik (kWh/bulan)"
                                value={data.listrik}
                                onChange={handleChange}
                                className="w-full border border-gray-200 px-4 py-2 rounded bg-white shadow-sm mb-4"
                                min={0}
                              />
                              <input
                                type="number"
                                name="air"
                                placeholder="Penggunaan air (m³/bulan)"
                                value={data.air}
                                onChange={handleChange}
                                className="w-full border border-gray-200 px-4 py-2 rounded bg-white shadow-sm mb-4"
                                min={0}
                              />
                              <input
                                type="number"
                                name="plastik"
                                placeholder="Pemakaian plastik (kg/bulan)"
                                value={data.plastik}
                                onChange={handleChange}
                                className="w-full border border-gray-200 px-4 py-2 rounded bg-white shadow-sm mb-4"
                                min={0}
                              />
                              <br />
                              <br />
                              <div className="flex gap-4">
                                <button
                                  type="submit"
                                  className="bg-emerald-800 text-white px-6 py-2 rounded hover:bg-emerald-800"
                                >
                                  Hitung Jejak Karbon
                                </button>
                                <button
                                  type="button"
                                  onClick={handleReset}
                                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
                                >
                                  Reset
                                </button>
                              </div>
                            
                              
                            </form>

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
                      </div>
                  </div>
              </div>
          </div>
    </section>
  );
}

export default KalkulatorKarbon;
