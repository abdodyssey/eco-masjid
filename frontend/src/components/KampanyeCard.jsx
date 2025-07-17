// import { User, MapPin, Leaf } from "lucide-react";

// const KampanyeCard = ({ data }) => {
//   return (
//     <div className="border rounded p-4 bg-white shadow hover:shadow-md transition-all">
//       <h3 className="text-lg font-semibold text-emerald-800 mb-1">
//         {data.namaMasjid}
//       </h3>
//       <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
//         <MapPin className="w-4 h-4" /> {data.lokasi}
//       </p>
//       <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
//         <User className="w-4 h-4" /> {data.namaPengusul}
//       </p>
//       <p className="text-gray-800 text-sm leading-relaxed">
//         <Leaf className="inline w-4 h-4 mr-1 text-emerald-600" />
//         <span className="font-medium">Ide:</span> {data.ide}
//       </p>
//     </div>
//   );
// };

// export default KampanyeCard;

function KampanyeCard({ data }) {
  // Handle kedua format data (lama dan baru)
  const namaMasjid = data.masjid?.namaMasjid || data.namaMasjid || "Masjid tidak diketahui";
  const lokasi = data.masjid 
    ? `${data.masjid.kabupaten}, ${data.masjid.provinsi}`
    : data.lokasi || "Lokasi tidak diketahui";
  const lokasiDetail = data.masjid?.lokasiDetail;

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-emerald-800 text-lg">
            {namaMasjid}
          </h3>
          <p className="text-gray-600 text-sm">
            {lokasi}
          </p>
          {lokasiDetail && (
            <p className="text-gray-500 text-xs mt-1">
              {lokasiDetail}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            {new Date(data.tanggalPengajuan).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-gray-700 text-sm leading-relaxed">
          {data.ide}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-emerald-600 font-medium">
          Oleh: {data.namaPengusul}
        </span>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
          Ide Penghijauan
        </span>
      </div>
    </div>
  );
}

export default KampanyeCard;