import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/events")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Top 6 events
        setEvents(sorted.slice(0, 6));
      });
  }, []);

  return (
    <section className="py-12 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto text-center">
    {/* Section Title */}
    <h2 className="text-3xl font-extrabold text-indigo-600 mb-2">
      Featured Events
    </h2>
    <p className="text-gray-500 mb-10">
      Explore the upcoming athletic events happening around the country
    </p>

    {/* Events Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition transform duration-300"
        >
          {/* Event Image */}
          <img
            src={event.imageUrl}
            alt={event.eventName}
            className="h-48 w-full object-cover"
          />

          {/* Event Content */}
          <div className="p-5 text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {event.eventName}
            </h3>
            <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
              <FaCalendarAlt/> {new Date(event.eventDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2"><FaMapPin/> {event.location}</p>

            <Link
              to={`/events/${event._id}`}
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>

    {/* See All Button */}
    <div className="mt-12">
      <Link
        to="/events"
        className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-medium shadow hover:bg-gray-800 transition"
      >
        See All Events
      </Link>
    </div>
  </div>
</section>

  );
};

export default FeaturedEvents;
