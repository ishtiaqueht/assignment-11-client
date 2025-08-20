import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { MdOutlineDateRange } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Search Filter
  const filteredEvents = events.filter(event =>
    (event.eventName || event.name)?.toLowerCase().includes(search.toLowerCase()) ||
    (event.location || event.place)?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>

      {/* Search Box */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by name or location..."
          className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading && <p className="text-center">Loading events...</p>}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div
            key={event._id}
            className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Event Image with fallback */}
            <img
              src={event.picture || event.image || "https://via.placeholder.com/400x200"}
              alt={event.eventName || event.name || "Event"}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {event.eventName || event.name || "Untitled Event"}
              </h2>

              {/* Event Date with fallback */}
              <p className="text-gray-600 flex items-center gap-2 mb-1">
                <MdOutlineDateRange className="text-blue-500" />
                {event.eventDate || event.date
                  ? new Date(event.eventDate || event.date).toLocaleDateString()
                  : "Date not available"}
              </p>

              {/* Event Location with fallback */}
              <p className="text-gray-600 flex items-center gap-2 mb-3">
                <FaMapPin className="text-red-500" />
                {event.location || event.place || "Location not available"}
              </p>

              <Link
                to={`/events/${event._id}`}
                className="inline-block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filteredEvents.length === 0 && (
        <p className="text-center mt-10 text-gray-500 text-lg">🚫 No events found.</p>
      )}
    </div>
  );
};

export default EventsPage;
