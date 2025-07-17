import { MapPin, BookOpenText, Gauge } from "lucide-react";

const Features = () => {
  return (
    <section className="py-12 px-4 flex flex-col items-center justify-center  pt-30">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
        Fitur apa saja?
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center">
          <MapPin className="w-8 h-8 text-emerald-700 mb-3" />
          <h3 className="font-semibold text-emerald-800 mb-2">
            Peta Masjid Hijau
          </h3>
          <p className="text-gray-700 text-sm">
            Lihat daftar masjid yang sudah menerapkan prinsip ramah lingkungan.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center">
          <BookOpenText className="w-8 h-8 text-emerald-700 mb-3" />
          <h3 className="font-semibold text-emerald-800 mb-2">
            Edukasi Islami
          </h3>
          <p className="text-gray-700 text-sm">
            Artikel tentang Islam dan pelestarian lingkungan.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center">
          <Gauge className="w-8 h-8 text-emerald-700 mb-3" />
          <h3 className="font-semibold text-emerald-800 mb-2">
            Kalkulator Karbon
          </h3>
          <p className="text-gray-700 text-sm">
            Hitung jejak karbon masjid dari penggunaan listrik, air, dan
            plastik.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
