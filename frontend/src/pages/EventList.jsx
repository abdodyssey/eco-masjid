import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/event").then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <section className="max-w-5xl mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6 text-center">
        Daftar Event Masjid Ramah Lingkungan
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada event tersedia.</p>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event._id} className="p-4 shadow rounded-xl bg-white">
              <h2 className="text-xl font-semibold text-emerald-800">
                {event.namaEvent}
              </h2>
              <p className="text-sm text-gray-700 mb-1">
                <Calendar className="inline mr-1 w-4 h-4" />
                {new Date(event.tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                Lokasi: {event.lokasi.namaMasjid} ({event.lokasi.alamat})
              </p>
              <p className="text-gray-700 text-sm">{event.deskripsi}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EventList;
