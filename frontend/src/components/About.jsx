import { Leaf } from "lucide-react";

const About = () => {
  return (
    <section className="bg-emerald-100 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="w-8 h-8 text-green animate-pulse" />
        </div>

        <h2 className="text-green-900 arabic-font text-2xl mb-4 text-3xl md:text-4xl font-bold mb-2">Apa itu EcoMasjid?</h2>
        <div className="w-20 h-1 bg-green-500 mx-auto mb-6 rounded-full"></div>

        <p className="text-lg md:text-xl leading-relaxed text-green/90 max-w-2xl mx-auto">
          <strong>EcoMasjid</strong> adalah platform digital yang mendorong masjid untuk menerapkan prinsip ramah lingkungan berdasarkan ajaran Islam. Kami percaya bahwa masjid bisa menjadi pusat edukasi dan aksi lingkungan yang berkelanjutan.
        </p>
      </div>
    </section>
  );
};

export default About;
