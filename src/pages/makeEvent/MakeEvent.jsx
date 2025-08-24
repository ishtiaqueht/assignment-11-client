import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import useAxiosSecure from "../../api/useAxiosSecure";

const MakeEvent = () => {
  useDynamicTitle("Create Event | AthleticClub");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventDate: "",
    description: "",
    imageUrl: "",
    location: "",
    creatorEmail: user?.email || "",
    creatorName: user?.displayName || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // ✅ POST request using axiosSecure
    const res = await axiosSecure.post("/events", formData);

    console.log(res.data);
    toast.success("Event Created Successfully");

    navigate("/events");
  } catch (error) {
    console.error(error);
    toast.error("Failed to create event");
  }
};


  return (
    <div className="max-w-4xl mx-auto my-12 px-6 sm:px-10 py-10 bg-white shadow-2xl rounded-3xl">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Event Name
          </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            placeholder="Enter event name"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Event Type
          </label>
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
          <label className="block font-medium text-gray-700 mb-2">
            Event Date
          </label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition resize-none"
            rows="4"
            placeholder="Write a short description about the event"
          ></textarea>
        </div>

        {/* Picture */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Event Image (URL)
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            placeholder="https://example.com/event.jpg"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            placeholder="Enter event location"
          />
        </div>

        {/* Creator Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Creator Email
            </label>
            <input
              type="email"
              value={formData.creatorEmail}
              readOnly
              className="w-full px-4 py-3 border rounded-xl bg-gray-100 shadow-inner"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Creator Name
            </label>
            <input
              type="text"
              value={formData.creatorName}
              readOnly
              className="w-full px-4 py-3 border rounded-xl bg-gray-100 shadow-inner"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-bold rounded-xl shadow-md hover:scale-[1.02] transition transform duration-200"
        >
          🚀 Create Event
        </button>
      </form>
    </div>
  );
};

export default MakeEvent;
