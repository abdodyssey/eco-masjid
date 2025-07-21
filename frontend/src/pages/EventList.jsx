import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, X } from "lucide-react";

function EventList() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/event").then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <section className="max-w-5xl mx-auto py-10 px-4 min-h-screen relative">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6 text-center">
        Daftar Event
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada event tersedia.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="p-4 shadow rounded-xl bg-white cursor-pointer hover:shadow-md transition"
              onClick={() => setSelectedEvent(event)}
            >
              <h2 className="text-lg font-semibold text-emerald-800 mb-1">
                {event.namaEvent}
              </h2>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(event.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {event.lokasi?.namaMasjid} – {event.lokasi?.alamat}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-emerald-800 mb-3">
              {selectedEvent.namaEvent}
            </h2>

            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>
                  {new Date(selectedEvent.tanggal).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-700 mt-1" />
                <span>
                  {selectedEvent.lokasi?.namaMasjid} –{" "}
                  {selectedEvent.lokasi?.alamat}
                </span>
              </div>

              <div className="mt-3">
                <p className="font-medium mb-1 text-gray-800">Deskripsi:</p>
                <p className="text-gray-600 leading-relaxed">
                  {selectedEvent.deskripsi || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventList;
