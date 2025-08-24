import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import useAxiosSecure from "../../api/useAxiosSecure";

const UpdateEvent = () => {
  useDynamicTitle("Update Event | AthleticClub");
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventDate: "",
    description: "",
    imageUrl: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axiosSecure.get(`/events/${id}`);
        const event = res.data;
        setFormData({
          eventName: event.eventName || "",
          eventType: event.eventType || "",
          eventDate: event.eventDate ? event.eventDate.split("T")[0] : "",
          description: event.description || "",
          imageUrl: event.imageUrl  || "",
          location: event.location || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/events/${id}`, formData);
      toast.success("Event updated successfully!");
      navigate("/manageEvents");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading event details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-3xl mt-10">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
        Update Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Event Type</label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          >
            <option value="">-- Select Event Type --</option>
            <option value="Swimming">🏊 Swimming</option>
            <option value="Sprinting">🏃 Sprinting</option>
            <option value="Long Jump">🤸 Long Jump</option>
            <option value="High Jump">🦘 High Jump</option>
            <option value="Hurdle Race">🏅 Hurdle Race</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Event Date */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter event location"
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition resize-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Event Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://example.com/event.jpg"
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-bold rounded-xl shadow-md hover:scale-[1.02] transition transform duration-200"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
