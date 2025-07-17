import { Leaf } from "lucide-react";

const About = () => {
  return (
    <section className="bg-emerald-800 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="w-8 h-8 text-white animate-pulse" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-2">Apa itu EcoMasjid?</h2>
        <div className="w-20 h-1 bg-white mx-auto mb-6 rounded-full"></div>

        <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-2xl mx-auto">
          <strong>EcoMasjid</strong> adalah platform digital yang mendorong masjid untuk menerapkan prinsip ramah lingkungan berdasarkan ajaran Islam. Kami percaya bahwa masjid bisa menjadi pusat edukasi dan aksi lingkungan yang berkelanjutan.
        </p>
      </div>
    </section>
  );
};

export default About;
