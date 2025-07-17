function MasjidCard({ masjid }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-green-800">{masjid.nama}</h2>
      <p className="text-gray-600">{masjid.kota} – {masjid.alamat}</p>
      <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${masjid.isRamahLingkungan ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
        {masjid.isRamahLingkungan ? "Ramah Lingkungan" : "Belum Ramah"}
      </span>
    </div>
  );
}

export default MasjidCard;
