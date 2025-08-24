import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import useAxiosSecure from "../../api/useAxiosSecure";
import { toast } from "react-toastify";
const EventDetails = () => {
  useDynamicTitle("Event(details) | AthleticClub");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get(`https://assignment-11-server-self-psi.vercel.app/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => )
      .finally(() => setLoading(false));
  }, [id]);

const handleBooking = async () => {
  if (!user) {
    alert("Please login to book this event!");
    return;
  }

  try {
    const bookingData = {
      eventId: event._id,
      eventName: event.eventName || event.name,
      eventDate: event.eventDate || event.date,
      location: event.location || event.place,
      description: event.description,
      userEmail: user.email,
    };

    // ✅ POST request now using axiosSecure
    const res = await axiosSecure.post("/bookings", bookingData);

    if (res.data.insertedId) {
      setSuccess("✅ Booking successful!");
      toast.success("event booked successfully!");
    }
  } catch (error) {
    // console.error(error);
    setSuccess("❌ Something went wrong!");
    toast.error("Event is already booked!");
  }
};



  if (loading) return <p className="text-center mt-10">Loading event details...</p>;

  if (!event) return <p className="text-center mt-10">❌ Event not found!</p>;

  return (
   <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl mt-8 border border-gray-700 text-white">
  {/* Event Image */}
  <div className="overflow-hidden rounded-2xl mb-6 shadow-lg">
    <img
      src={ event.imageUrl || "https://via.placeholder.com/600x300"}
      alt={event.eventName || event.name}
      className="w-full h-72 object-cover transform hover:scale-105 transition duration-500"
    />
  </div>

  {/* Event Info */}
  <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
    {event.eventName || event.name}
  </h1>
  <p className="text-gray-300 mb-3 flex items-center gap-2">
    📅{" "}
    {event.eventDate || event.date
      ? new Date(event.eventDate || event.date).toLocaleDateString()
      : "Not available"}
  </p>
  <p className="text-gray-300 mb-3 flex items-center gap-2">
    📍 {event.location || event.place || "Unknown"}
  </p>
  <p className="text-gray-400 leading-relaxed mb-6">
    {event.description || "No description available."}
  </p>

  {/* Participant Info */}
  {user && (
    <div className="backdrop-blur-md bg-white/5 border border-gray-700 rounded-xl p-5 mb-6 shadow-inner">
      <h2 className="text-lg font-semibold mb-2 text-cyan-400">👤 Participant Details</h2>
      <p className="text-gray-300"><strong className="text-white">Name:</strong> {user.displayName || "Unknown User"}</p>
      <p className="text-gray-300"><strong className="text-white">Email:</strong> {user.email}</p>
    </div>
  )}

  {/* Book Now Button */}
  <button
    onClick={handleBooking}
    className="w-full py-3 rounded-xl text-lg font-semibold 
               bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 
               hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700 
               transition duration-300 transform hover:scale-[1.02] shadow-lg"
  >
    🚀 Book Now
  </button>

  {success && (
    <p className="text-center mt-5 font-semibold text-green-400 animate-pulse">
      {success}
    </p>
  )}
</div>

  );
};

export default EventDetails;
