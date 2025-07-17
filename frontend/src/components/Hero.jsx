import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section class="relative bg-green-700 text-white py-20 overflow-hidden">
    <div class="absolute inset-0 leaf-pattern opacity-10"></div>
    <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div class="md:w-1/2 mb-4">
            <h2 class="text-3xl font-bold mb-4 leading-tight">
                EcoMasjid: Gerakan Masjid <span class="text-emerald-300">Ramah Lingkungan</span>
            </h2>
            <p class="text-lg">
              Menginspirasi masjid untuk hidup berkelanjutan berdasarkan nilai-nilai Islam:
              kebersihan, amanah, dan tanggung jawab terhadap Bumi
            </p>
            <div class="flex space-x-4 mt-4">
                <button class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition shadow-md">
                    Get Started
                </button>
            </div>
        </div>
        <div class="md:w-1/2">
            <img 
                src="src/images/1580216500-Sejumlah-pekerja-memasang-pane.jpeg" 
                alt="Modern eco-friendly mosque with solar panels on roof and lush greenery surrounding the building" 
                class="rounded-lg shadow-2xl max-w-full h-auto" 
            />
        </div>
    </div>
</section>

  );
};

export default Hero;
