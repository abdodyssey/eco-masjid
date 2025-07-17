import { User, MapPin, Leaf } from "lucide-react";

const KampanyeCard = ({ data }) => {
  return (
    <div className="border rounded p-4 bg-white shadow hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold text-emerald-800 mb-1">
        {data.namaMasjid}
      </h3>
      <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
        <MapPin className="w-4 h-4" /> {data.lokasi}
      </p>
      <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
        <User className="w-4 h-4" /> {data.namaPengusul}
      </p>
      <p className="text-gray-800 text-sm leading-relaxed">
        <Leaf className="inline w-4 h-4 mr-1 text-emerald-600" />
        <span className="font-medium">Ide:</span> {data.ide}
      </p>
    </div>
  );
};

export default KampanyeCard;
