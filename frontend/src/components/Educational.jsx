import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const Educational = () => {
  return (
    <section className="text-emerald-800 py-16 px-6">
     <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-green-900 mb-12">Daftar Artikel</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
                <div class="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                    
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-green-800 mb-2">Menjaga Air Adalah Amanah</h3>
                        <p class="text-gray-600 mb-4">
                        Rasulullah ﷺ bersabda: Jangan berlebihan dalam menggunakan air, meskipun kamu berada di sungai yang mengalir...
                        </p>
                        <a href="#" class="text-green-700 font-medium hover:text-green-900 transition">Read Article →</a>
                    </div>
                </div>
                
                
                <div class="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                    
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-green-800 mb-2">Green Mosque Guide</h3>
                        <p class="text-gray-600 mb-4">
                            Comprehensive manual for transforming your masjid into an eco-friendly worship space.
                        </p>
                        <a href="#" class="text-green-700 font-medium hover:text-green-900 transition">Download PDF →</a>
                    </div>
                </div>
                
                
                <div class="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
          
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-green-800 mb-2">Case Studies</h3>
                        <p class="text-gray-600 mb-4">
                            Success stories from mosques that implemented green initiatives and the impact achieved.
                        </p>
                        <a href="#" class="text-green-700 font-medium hover:text-green-900 transition">View Stories →</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Educational;
