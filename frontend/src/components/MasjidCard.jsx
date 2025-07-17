function MasjidCard({ masjid }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-green-800">{masjid.nama}</h2>
      <p className="text-gray-600">{masjid.kota}, {masjid.provinsi}</p>
      {masjid.alamat && (
        <p className="text-sm text-gray-500 mt-1">{masjid.alamat}</p>
      )}
      {masjid.deskripsi && (
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">{masjid.deskripsi}</p>
      )}
      
      <div className="mt-3 flex items-center justify-between">
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
          masjid.isRamahLingkungan 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {masjid.isRamahLingkungan ? "Ramah Lingkungan" : "Belum Ramah"}
        </span>
        
        {masjid.tanggalPengajuan && (
          <span className="text-xs text-gray-400">
            Disetujui: {new Date(masjid.tanggalPengajuan).toLocaleDateString('id-ID')}
          </span>
        )}
      </div>
      
      {masjid.pengusul && (
        <div className="mt-2 text-xs text-gray-500">
          Diusulkan oleh: {masjid.pengusul}
        </div>
      )}
    </div>
  );
}

export default MasjidCard;