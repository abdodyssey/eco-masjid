import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-white text-white py-20 overflow-hidden">
      <div className="absolute inset-0 leaf-pattern opacity-10"></div>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-4">
          <h2 className="text-2xl md:text-5xl font-extrabold text-emerald-800 mb-4 leading-tight text-balance">
            EcoMasjid: Gerakan Masjid Ramah Lingkungan
          </h2>
          <p className="ext-base md:text-lg text-gray-700 mb-6 leading-relaxed text-balance">
            Menginspirasi masjid untuk hidup berkelanjutan berdasarkan
            nilai-nilai Islam: kebersihan, amanah, dan tanggung jawab terhadap
            Bumi
          </p>
          <div className="flex space-x-4 mt-4">
            <Link
              to="/masjid"
              className="bg-emerald-800 text-white px-6 py-2 rounded hover:bg-emerald-900 transition-all"
            >
              Lihat Masjid
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="src/images/1580216500-Sejumlah-pekerja-memasang-pane.jpeg"
            alt="Modern eco-friendly mosque with solar panels on roof and lush greenery surrounding the building"
            className="rounded-lg shadow-2xl max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
