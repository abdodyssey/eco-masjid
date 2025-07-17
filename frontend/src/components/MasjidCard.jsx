function MasjidCard({ masjid }) {
  return (
    <div className="rounded-xl p-4 shadow hover:shadow-md transition bg-white">
      <h2 className="text-xl font-semibold text-emerald-800 mb-1">{masjid.nama}</h2>
      <p className="text-sm text-gray-600 mb-2">
        {masjid.kota}, {masjid.provinsi}
      </p>
      <p className="text-sm text-gray-700 mb-3 line-clamp-3">
        {masjid.alamat}
      </p>
      <span
        className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
          masjid.isRamahLingkungan
            ? "bg-green-100 text-emerald-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {masjid.isRamahLingkungan ? "Ramah Lingkungan" : "Belum Ramah"}
      </span>
    </div>
  );
}

export default MasjidCard;
