import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="text-emerald-800 py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Megaphone className="w-10 h-10 text-emerald-800 animate-pulse" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Gabung dalam Event EcoMasjid
        </h2>

        <p className="mb-6 text-emerald-800/90 text-sm md:text-base">
           Menghadirkan serangkaian kegiatan edukatif dan inspiratif seputar lingkungan,
           energi, dan gaya hidup berkelanjutan dalam konteks keislaman. 
           Tempat yang tepat untuk belajar, terlibat, dan menginspirasi perubahan dari lingkungan masjid.
        </p>

        <Link
          to={"/event"}
          className="inline-block bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2 font-medium rounded"
        >
          Lihat Event
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
