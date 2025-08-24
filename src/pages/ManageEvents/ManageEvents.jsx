import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import useAxiosSecure from "../../api/useAxiosSecure";

const ManageEvents = () => {
  useDynamicTitle("Manage Events | AthleticClub");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); 
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch user created events
  useEffect(() => {
    if (user?.email) {
      const fetchEvents = async () => {
        try {
          const res = await axiosSecure.get(`/manageEvents?email=${user.email}`);
          setEvents(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchEvents();
    }
  }, [user, axiosSecure]);

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/events/${_id}`);
          // Remove deleted event from UI
          setEvents(events.filter((event) => event._id !== _id));

          Swal.fire({
            title: "Deleted!",
            text: "Your event has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete event.", "error");
        }
      }
    });
  };

  // Update event
  const handleUpdate = (id) => {
    navigate(`/updateEvent/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-700">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
        My Created Events
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-400 text-center mt-10 text-base sm:text-lg">
          No events created yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
                <th className="p-3 sm:p-4 text-left">Event Name</th>
                <th className="p-3 sm:p-4 text-left">Date</th>
                <th className="p-3 sm:p-4 text-left">Type</th>
                <th className="p-3 sm:p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr
                  key={event._id}
                  className={`transition duration-300 ${
                    index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-900/40"
                  } hover:bg-gray-800/70`}
                >
                  <td className="p-3 sm:p-4 font-semibold text-indigo-300">
                    {event.eventName}
                  </td>
                  <td className="p-3 sm:p-4 text-gray-300">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 sm:p-4 text-gray-300">{event.eventType}</td>
                  <td className="p-3 sm:p-4 flex gap-2 sm:gap-3 justify-center flex-wrap">
                    <button
                      onClick={() => handleUpdate(event._id)}
                      className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg font-semibold text-white 
                        bg-gradient-to-r from-green-500 to-green-700 
                        hover:from-green-600 hover:to-green-800 
                        transition duration-300 transform hover:scale-105 shadow-md"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg font-semibold text-white 
                        bg-gradient-to-r from-red-500 via-pink-500 to-red-700 
                        hover:from-red-600 hover:via-pink-600 hover:to-red-800 
                        transition duration-300 transform hover:scale-105 shadow-md"
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
