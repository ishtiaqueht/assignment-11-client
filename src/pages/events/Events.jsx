import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { MdOutlineDateRange } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const EventsPage = () => {
  useDynamicTitle("Events | AthleticClub");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://assignment-11-server-self-psi.vercel.app/events");
      setEvents(res.data);
    } catch (err) {
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    (event.eventName || "").toLowerCase().includes(search.toLowerCase()) ||
    (event.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
  {/* Title */}
  <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center 
                 text-transparent bg-clip-text 
                 bg-gradient-to-r from-blue-500 to-indigo-600">
     All Events
  </h1>

  {/* Search Box */}
  <div className="mb-10 flex justify-center">
    <input
      type="text"
      placeholder="🔍 Search events by name or location..."
      className="border border-gray-200 rounded-full px-5 py-3 w-full md:w-2/3 
                 shadow-sm focus:outline-none focus:ring-2 
                 focus:ring-blue-400 focus:border-blue-300 
                 transition duration-300"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {loading && <p className="text-center text-gray-500 animate-pulse">Loading events...</p>}

  {/* Event Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredEvents.map(event => (
      <div
        key={event._id}
        className="bg-white border border-gray-100 rounded-2xl 
                   shadow-md hover:shadow-2xl overflow-hidden 
                   transform hover:-translate-y-2 
                   transition duration-300"
      >
        {/* Image */}
        <div className="relative">
          <img
            src={event.imageUrl || "https://via.placeholder.com/400x200"}
            alt={event.eventName || "Event"}
            className="h-52 w-full object-cover"
          />
          <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-600 
                           text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            {event.eventType || "General"}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {event.eventName || "Untitled Event"}
          </h2>

          <p className="text-gray-600 flex items-center gap-2 mb-2 text-sm">
            <MdOutlineDateRange className="text-blue-500" />
            {event.eventDate
              ? new Date(event.eventDate).toLocaleDateString()
              : "Date not available"}
          </p>

          <p className="text-gray-600 flex items-center gap-2 mb-4 text-sm">
            <FaMapPin className="text-red-500" />
            {event.location || "Location not available"}
          </p>

          <Link
            to={`/events/${event._id}`}
            className="block w-full text-center font-medium 
                       bg-gradient-to-r from-blue-500 to-indigo-600 
                       text-white px-4 py-2.5 rounded-xl 
                       hover:from-indigo-600 hover:to-blue-700 
                       transition duration-300 shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    ))}
  </div>

  {/* No Events */}
  {!loading && filteredEvents.length === 0 && (
    <p className="text-center mt-12 text-gray-400 text-lg">
      🚫 No events found. Try another search.
    </p>
  )}
</div>

  );
};

export default EventsPage;
