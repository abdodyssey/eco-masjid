import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-white w-full px-4 text-center">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-5xl font-extrabold text-emerald-800 mb-4 leading-tight text-balance">
          EcoMasjid: Gerakan Masjid <br className="hidden md:block" /> Ramah Lingkungan
        </h1>

        <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed text-balance">
          Menginspirasi masjid untuk hidup berkelanjutan berdasarkan nilai-nilai Islam:
          kebersihan, amanah, dan tanggung jawab terhadap bumi 🌿
        </p>

        <div className="flex justify-center">
          <Link
            to="/masjid"
            className="bg-emerald-800 text-white px-6 py-2 rounded hover:bg-emerald-900 transition-all"
          >
            Lihat Masjid
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
