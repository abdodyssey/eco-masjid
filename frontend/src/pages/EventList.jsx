import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, Search } from "lucide-react";

function EventList() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/event").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const filteredEvents = events.filter((event) =>
    `${event.judul} ${event.lokasi}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4 text-center">
        Event & Aksi Sosial
      </h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        Kegiatan nyata yang dilakukan untuk menjaga lingkungan bersama komunitas masjid.
      </p>

      {/* 🔍 Input Pencarian */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Cari berdasarkan judul atau lokasi..."
          className="w-full pl-10 pr-4 py-2 border rounded shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-gray-500 text-center">Tidak ada event yang cocok dengan pencarian.</p>
      ) : (
        <div className="grid gap-6">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white border rounded-lg p-4 shadow hover:shadow-md">
              <h2 className="text-lg font-semibold text-emerald-800">{event.judul}</h2>
              <p className="text-gray-700 text-sm mb-2">{event.deskripsi}</p>
              <div className="flex items-center text-sm text-gray-600 gap-3">
                <Calendar className="w-4 h-4" />
                {new Date(event.tanggal).toLocaleDateString("id-ID")}
                <MapPin className="w-4 h-4 ml-4" />
                {event.lokasi}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EventList;
