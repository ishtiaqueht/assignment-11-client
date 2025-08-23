import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import BookingFormatCard from "./BookingFormatCard";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table"); // 👈 toggle state

  // Fetch bookings
  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/myBookings?email=${user.email}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/bookings/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setBookings(bookings.filter((b) => b._id !== _id));
              Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading your bookings...</p>;
  if (bookings.length === 0) return <p className="text-center mt-10">No bookings found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-6 sm:mt-10 
  bg-gradient-to-br from-gray-900 via-gray-800 to-black 
  rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700">
  
  {/* 🔘 Title */}
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 text-center 
    bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
    My Bookings
  </h1>

  {/* 🔘 View Toggle */}
  <div className="flex flex-wrap justify-center mb-4 sm:mb-6 gap-3 sm:gap-4">
    <button
      onClick={() => setView("table")}
      className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
        view === "table"
          ? "bg-indigo-600 text-white shadow-md"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      Table View
    </button>
    <button
      onClick={() => setView("card")}
      className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
        view === "card"
          ? "bg-indigo-600 text-white shadow-md"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      Card View
    </button>
  </div>

  {/* 👇 Conditional Render */}
  {view === "table" ? (
    <div className="overflow-x-auto rounded-lg sm:rounded-2xl shadow-lg">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
            <th className="p-3 sm:p-4 text-left">Event Name</th>
            <th className="p-3 sm:p-4 text-left">Date</th>
            <th className="p-3 sm:p-4 text-left">Location</th>
            <th className="p-3 sm:p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr
              key={booking._id}
              className={`transition duration-300 ${
                index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-900/40"
              } hover:bg-gray-800/70`}
            >
              <td className="p-3 sm:p-4 font-semibold text-indigo-300">
                {booking.eventName}
              </td>
              <td className="p-3 sm:p-4 text-gray-300">
                {new Date(booking.eventDate).toLocaleDateString()}
              </td>
              <td className="p-3 sm:p-4 text-gray-300">{booking.location}</td>
              <td className="p-3 sm:p-4 text-center">
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl 
                    font-semibold text-white text-sm sm:text-base
                    bg-gradient-to-r from-red-500 via-pink-500 to-red-700 
                    hover:from-red-600 hover:via-pink-600 hover:to-red-800 
                    transition duration-300 transform hover:scale-105 shadow-md"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <BookingFormatCard
          key={booking._id}
          booking={booking}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )}
</div>

  );
};

export default MyBookings;
