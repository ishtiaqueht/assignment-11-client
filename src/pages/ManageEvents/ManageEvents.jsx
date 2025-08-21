import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const ManageEvents = () => {
  const { user } = useContext(AuthContext); 
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch user created events
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/manageEvents?email=${user.email}`)
        .then((res) => setEvents(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Delete event with SweetAlert
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/events/${_id}`)
          .then((res) => {
            // Remove deleted event from UI
            setEvents(events.filter((event) => event._id !== _id));

            Swal.fire({
              title: "Deleted!",
              text: "Your event has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // Update event
  const handleUpdate = (id) => {
    navigate(`/updateEvent/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
  <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
    My Created Events
  </h1>

  {events.length === 0 ? (
    <p className="text-gray-500 text-center mt-10 text-lg">No events created yet.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <tr>
            <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Event Name</th>
            <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Date</th>
            <th className="py-4 px-6 text-left font-medium uppercase tracking-wide">Type</th>
            <th className="py-4 px-6 text-center font-medium uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              key={event._id}
              className="border-b last:border-b-0 hover:bg-indigo-50 transition duration-300"
            >
              <td className="py-4 px-6 font-semibold text-gray-800">{event.eventName}</td>
              <td className="py-4 px-6 text-gray-600">
                {new Date(event.eventDate).toLocaleDateString()}
              </td>
              <td className="py-4 px-6 text-gray-600">{event.eventType}</td>
              <td className="py-4 px-6 flex gap-3 justify-center">
                <button
                  onClick={() => handleUpdate(event._id)}
                  className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md transform hover:scale-105 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transform hover:scale-105 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default ManageEvents;
