import React from 'react';

const BookingFormatCard = ({ booking, handleDelete }) => {
    return (
         <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-xl border border-gray-700 hover:scale-[1.02] transition duration-300">
      <h2 className="text-2xl font-bold mb-2 text-indigo-400">{booking.eventName}</h2>
      <p className="text-gray-300 mb-1">
        <span className="font-semibold">Date:</span>{" "}
        {new Date(booking.eventDate).toLocaleDateString()}
      </p>
      <p className="text-gray-300 mb-4">
        <span className="font-semibold">Location:</span> {booking.location}
      </p>

      <div className="flex justify-end">
        <button
          onClick={() => handleDelete(booking._id)}
          className="px-5 py-2 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-red-500 via-pink-500 to-red-700 
            hover:from-red-600 hover:via-pink-600 hover:to-red-800 
            transition duration-300 transform hover:scale-105 shadow-md"
        >
          Cancel
        </button>
      </div>
    </div>
    );
};

export default BookingFormatCard;